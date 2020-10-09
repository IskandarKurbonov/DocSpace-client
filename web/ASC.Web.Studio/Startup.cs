using ASC.Api.Core;
using ASC.Common;
using ASC.Common.DependencyInjection;
using ASC.Core.Common.EF;
using ASC.Core.Common.EF.Context;
using ASC.Data.Storage;
using ASC.Data.Storage.Configuration;
using ASC.Data.Storage.DiscStorage;
using ASC.FederatedLogin;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ASC.Web.Studio
{
    public class Startup : BaseStartup
    {
        public override string[] LogParams { get => new string[] { "ASC.Web" }; }

        public override bool AddControllers { get => false; }

        public Startup(IConfiguration configuration, IHostEnvironment hostEnvironment) : base(configuration, hostEnvironment)
        {
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            _ = services.AddCors();

            var diHelper = new DIHelper(services);
            _ = diHelper
                .AddStorage()
                .AddPathUtilsService()
                .AddStorageHandlerService()
                .AddLoginHandlerService();

            _ = services.AddMemoryCache();

            base.ConfigureServices(services);
            _ = services.AddAutofac(Configuration, HostEnvironment.ContentRootPath);
        }

        public override void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
           
            _ = app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            
            _ = app.UseRouting();

            _ = app.UseCors(builder =>
                builder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod());

            _ = app.UseAuthentication();

            _ = app.UseEndpoints(endpoints =>
            {
                endpoints.InitializeHttpHandlers();
            });

            _ = app.MapWhen(
               context => context.Request.Path.ToString().EndsWith("login.ashx"),
               appBranch =>
               {
                   _ = appBranch.UseLoginHandler();
               });
        }
    }
}
