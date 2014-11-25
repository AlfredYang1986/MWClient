using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using MvcGlobalisationSupport;

namespace MWWebPage
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            const string defautlRouteUrl = "{controller}/{action}";

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            RouteValueDictionary defaultRouteValueDictionary = new RouteValueDictionary(new { controller = "MWAuthorization", action = "Login" } );
            routes.Add("DefaultGlobalised", new GlobalisedRoute(defautlRouteUrl, defaultRouteValueDictionary));
            routes.Add("Default", new Route(defautlRouteUrl, defaultRouteValueDictionary, new MvcRouteHandler()));

            //LocalizedViewEngine: this is to support views also when named e.g. Index.de.cshtml
            routes.MapRoute(
                "Default2",
                "{culture}/{controller}/{action}",
                new
                {
                    culture = "en",
                    controller = "MWAuthorization",//ControllerName
                    action = "Login",//ActionName
                    id = UrlParameter.Optional
                }
            ).RouteHandler = new LocalizedMvcRouteHandler();
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            //LocalizedViewEngine: this is to support views also when named e.g. Index.de.cshtml
            ViewEngines.Engines.Insert(0, new LocalizedViewEngine());

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //standard mvc4 routing. see App_Start\RouteConfig.cs
            //RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();
        }
    }
}