﻿namespace ASC.Web.Api.Controllers.Settings;

public class GreetingSettingsController : BaseSettingsController
{
    private Tenant Tenant { get { return _apiContext.Tenant; } }

    private readonly MessageService _messageService;
    private readonly TenantManager _tenantManager;
    private readonly PermissionContext _permissionContext;
    private readonly TenantInfoSettingsHelper _tenantInfoSettingsHelper;

    public GreetingSettingsController(
        TenantInfoSettingsHelper tenantInfoSettingsHelper,
        MessageService messageService,
        ApiContext apiContext,
        TenantManager tenantManager,
        PermissionContext permissionContext,
        WebItemManager webItemManager,
        IMemoryCache memoryCache) : base(apiContext, memoryCache, webItemManager)
    {
        _tenantInfoSettingsHelper = tenantInfoSettingsHelper;
        _messageService = messageService;
        _tenantManager = tenantManager;
        _permissionContext = permissionContext;
    }

    [Read("greetingsettings")]
    public ContentResult GetGreetingSettings()
    {
        return new ContentResult { Content = Tenant.Name };
    }

    [Create("greetingsettings")]
    public ContentResult SaveGreetingSettingsFromBody([FromBody] GreetingSettingsRequestsDto inDto)
    {
        return SaveGreetingSettings(inDto);
    }

    [Create("greetingsettings")]
    [Consumes("application/x-www-form-urlencoded")]
    public ContentResult SaveGreetingSettingsFromForm([FromForm] GreetingSettingsRequestsDto inDto)
    {
        return SaveGreetingSettings(inDto);
    }

    private ContentResult SaveGreetingSettings(GreetingSettingsRequestsDto inDto)
    {
        _permissionContext.DemandPermissions(SecutiryConstants.EditPortalSettings);

        Tenant.Name = inDto.Title;
        _tenantManager.SaveTenant(Tenant);

        _messageService.Send(MessageAction.GreetingSettingsUpdated);

        return new ContentResult { Content = Resource.SuccessfullySaveGreetingSettingsMessage };
    }

    [Create("greetingsettings/restore")]
    public ContentResult RestoreGreetingSettings()
    {
        _permissionContext.DemandPermissions(SecutiryConstants.EditPortalSettings);

        _tenantInfoSettingsHelper.RestoreDefaultTenantName();

        return new ContentResult
        {
            Content = Tenant.Name
        };
    }
}
