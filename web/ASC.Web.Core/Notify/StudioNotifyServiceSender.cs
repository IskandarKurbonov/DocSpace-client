/*
 *
 * (c) Copyright Ascensio System Limited 2010-2018
 *
 * This program is freeware. You can redistribute it and/or modify it under the terms of the GNU 
 * General Public License (GPL) version 3 as published by the Free Software Foundation (https://www.gnu.org/copyleft/gpl.html). 
 * In accordance with Section 7(a) of the GNU GPL its Section 15 shall be amended to the effect that 
 * Ascensio System SIA expressly excludes the warranty of non-infringement of any third-party rights.
 *
 * THIS PROGRAM IS DISTRIBUTED WITHOUT ANY WARRANTY; WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR
 * FITNESS FOR A PARTICULAR PURPOSE. For more details, see GNU GPL at https://www.gnu.org/copyleft/gpl.html
 *
 * You can contact Ascensio System SIA by email at sales@onlyoffice.com
 *
 * The interactive user interfaces in modified source and object code versions of ONLYOFFICE must display 
 * Appropriate Legal Notices, as required under Section 5 of the GNU GPL version 3.
 *
 * Pursuant to Section 7 § 3(b) of the GNU GPL you must retain the original ONLYOFFICE logo which contains 
 * relevant author attributions when distributing the software. If the display of the logo in its graphic 
 * form is not reasonably feasible for technical reasons, you must include the words "Powered by ONLYOFFICE" 
 * in every copy of the program you distribute. 
 * Pursuant to Section 7 § 3(e) we decline to grant you any rights under trademark law for use of our trademarks.
 *
*/


using System;
using System.Globalization;
using System.Linq;
using System.Threading;

using ASC.Common;
using ASC.Common.Caching;
using ASC.Core;
using ASC.Core.Configuration;
using ASC.Notify.Model;
using ASC.Notify.Patterns;
using ASC.Notify.Recipients;
using ASC.Web.Core.Users;
using ASC.Web.Studio.Utility;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ASC.Web.Studio.Core.Notify
{
    public class StudioNotifyServiceSender
    {
        private static string EMailSenderName { get { return Constants.NotifyEMailSenderSysName; } }

        private IServiceProvider ServiceProvider { get; }
        private IConfiguration Configuration { get; }

        public StudioNotifyServiceSender(IServiceProvider serviceProvider, IConfiguration configuration, ICacheNotify<NotifyItem> cache)
        {
            cache.Subscribe(OnMessage, CacheNotifyAction.Any);
            ServiceProvider = serviceProvider;
            Configuration = configuration;
        }
       
        public void OnMessage(NotifyItem item)
        {
            using var scope = ServiceProvider.CreateScope();
            var scopeClass = scope.ServiceProvider.GetService<StudioNotifyServiceSenderScope>();
            (var tenantManager, var userManager, var securityContext, var authContext, var studioNotifyHelper, var displayUserSettings, var tenantExtra, var coreBaseSettings) = scopeClass;
            tenantManager.SetCurrentTenant(item.TenantId);
            CultureInfo culture = null;

            var client = WorkContext.NotifyContext.NotifyService.RegisterClient(studioNotifyHelper.NotifySource, scope);

            var tenant = tenantManager.GetCurrentTenant(false);

            if (tenant != null)
            {
                culture = tenant.GetCulture();
            }

            if (Guid.TryParse(item.UserId, out var userId) && !userId.Equals(Constants.Guest.ID) && !userId.Equals(Guid.Empty))
            {
                securityContext.AuthenticateMe(Guid.Parse(item.UserId));
                var user = userManager.GetUsers(userId);
                if (!string.IsNullOrEmpty(user.CultureName))
                {
                    culture = CultureInfo.GetCultureInfo(user.CultureName);
                }
            }

            if (culture != null && !Equals(Thread.CurrentThread.CurrentCulture, culture))
            {
                Thread.CurrentThread.CurrentCulture = culture;
            }
            if (culture != null && !Equals(Thread.CurrentThread.CurrentUICulture, culture))
            {
                Thread.CurrentThread.CurrentUICulture = culture;
            }

            client.SendNoticeToAsync(
                (NotifyAction)item.Action,
                item.ObjectID,
                item.Recipients?.Select(r => r.IsGroup ? new RecipientsGroup(r.ID, r.Name) : (IRecipient)new DirectRecipient(r.ID, r.Name, r.Addresses.ToArray(), r.CheckActivation)).ToArray(),
                item.SenderNames.Any() ? item.SenderNames.ToArray() : null,
                item.CheckSubsciption,
                item.Tags.Select(r => new TagValue(r.Tag_, r.Value)).ToArray());
        }

        public void RegisterSendMethod()
        {
            var cron = Configuration["core:notify:cron"] ?? "0 0 5 ? * *"; // 5am every day

            using var scope = ServiceProvider.CreateScope();
            var scopeClass = scope.ServiceProvider.GetService<StudioNotifyServiceSenderScope>();
            (var tenantManager, var userManager, var securityContext, var authContext, var studioNotifyHelper, var displayUserSettings, var tenantExtra, var coreBaseSettings) = scopeClass;
            if (Configuration["core:notify:tariff"] != "false")
            {
                if (tenantExtra.Enterprise)
                {
                    WorkContext.RegisterSendMethod(SendEnterpriseTariffLetters, cron);
                }
                else if (tenantExtra.Opensource)
                {
                    WorkContext.RegisterSendMethod(SendOpensourceTariffLetters, cron);
                }
                else if (tenantExtra.Saas)
                {
                    if (coreBaseSettings.Personal)
                    {
                        WorkContext.RegisterSendMethod(SendLettersPersonal, cron);
                    }
                    else
                    {
                        WorkContext.RegisterSendMethod(SendSaasTariffLetters, cron);
                    }
                }
            }

            if (!coreBaseSettings.Personal)
            {
                WorkContext.RegisterSendMethod(SendMsgWhatsNew, "0 0 * ? * *"); // every hour
            }
        }

        public void SendSaasTariffLetters(DateTime scheduleDate)
        {
            //remove client
            using var scope = ServiceProvider.CreateScope();
            scope.ServiceProvider.GetService<StudioPeriodicNotify>().SendSaasLetters(EMailSenderName, scheduleDate);
        }

        public void SendEnterpriseTariffLetters(DateTime scheduleDate)
        {
            using var scope = ServiceProvider.CreateScope();
            scope.ServiceProvider.GetService<StudioPeriodicNotify>().SendEnterpriseLetters(EMailSenderName, scheduleDate);
        }

        public void SendOpensourceTariffLetters(DateTime scheduleDate)
        {
            using var scope = ServiceProvider.CreateScope();
            scope.ServiceProvider.GetService<StudioPeriodicNotify>().SendOpensourceLetters(EMailSenderName, scheduleDate);
        }

        public void SendLettersPersonal(DateTime scheduleDate)
        {
            using var scope = ServiceProvider.CreateScope();
            scope.ServiceProvider.GetService<StudioPeriodicNotify>().SendPersonalLetters(EMailSenderName, scheduleDate);
        }

        public void SendMsgWhatsNew(DateTime scheduleDate)
        {
            using var scope = ServiceProvider.CreateScope();
            scope.ServiceProvider.GetService<StudioWhatsNewNotify>().SendMsgWhatsNew(scheduleDate);
        }
    }

    public class StudioNotifyServiceSenderScope
    {
        private TenantManager TenantManager { get; }
        private UserManager UserManager { get; }
        private SecurityContext SecurityContext { get; }
        private AuthContext AuthContext { get; }
        private StudioNotifyHelper StudioNotifyHelper { get; }
        private DisplayUserSettings DisplayUserSettings { get; }
        private TenantExtra TenantExtra { get; }
        private CoreBaseSettings CoreBaseSettings { get; }

        public StudioNotifyServiceSenderScope(TenantManager tenantManager,
            UserManager userManager,
            SecurityContext securityContext,
            AuthContext authContext,
            StudioNotifyHelper studioNotifyHelper,
            DisplayUserSettings displayUserSettings,
            TenantExtra tenantExtra,
            CoreBaseSettings coreBaseSettings)
        {
            TenantManager = tenantManager;
            UserManager = userManager;
            SecurityContext = securityContext;
            AuthContext = authContext;
            StudioNotifyHelper = studioNotifyHelper;
            DisplayUserSettings = displayUserSettings;
            TenantExtra = tenantExtra;
            CoreBaseSettings = coreBaseSettings;
        }

        public void Deconstruct(out TenantManager tenantManager,
            out UserManager userManager,
            out SecurityContext securityContext,
            out AuthContext authContext, 
            out StudioNotifyHelper studioNotifyHelper,
            out DisplayUserSettings displayUserSettings, 
            out TenantExtra tenantExtra, 
            out CoreBaseSettings coreBaseSettings)
        {
            tenantManager = TenantManager;
            userManager = UserManager;
            securityContext = SecurityContext;
            authContext = AuthContext;
            studioNotifyHelper = StudioNotifyHelper;
            displayUserSettings = DisplayUserSettings;
            tenantExtra = TenantExtra;
            coreBaseSettings = CoreBaseSettings;
        }
    }

    public static class ServiceLauncherExtension
    {
        public static DIHelper AddStudioNotifyServiceSender(this DIHelper services)
        {
            services.TryAddSingleton<StudioNotifyServiceSender>();
            services.TryAddScoped<StudioNotifyServiceSenderScope>();

            return services
                .AddStudioPeriodicNotify()
                .AddStudioWhatsNewNotify()
                .AddTenantManagerService()
                .AddUserManagerService()
                .AddSecurityContextService()
                .AddAuthContextService()
                .AddStudioNotifyHelperService()
                .AddDisplayUserSettingsService()
                .AddTenantExtraService()
                .AddCoreBaseSettingsService();
        }
    }
}