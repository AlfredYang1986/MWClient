using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace MWWebPage.Controllers
{
    public class CookieHelper
    {
        public static string CookieName { get; set; }


        public CookieHelper(String name)
        {
            CookieName = "Cookie" + name;
        }

        public static void SetCookie(String accessToken, String refreshToken = "",int cookieExpireDate = 30)
        {
            HttpCookie myCookie = new HttpCookie(CookieName);
            myCookie["access_token"] = accessToken;
            myCookie["refresh_token"] = refreshToken;
            myCookie.Expires = DateTime.Now.AddDays(cookieExpireDate);
            HttpContext.Current.Response.Cookies.Add(myCookie);
        }

        public HttpCookie GetCookie()
        {
            HttpCookie myCookie = HttpContext.Current.Request.Cookies[CookieName];
            if (myCookie != null)
            {
                String accessToken = myCookie.Values["access_token"];
                String refreshToken = myCookie.Values["refresh_token"];

                HttpContext.Current.Session["accessToken"] = accessToken;
                HttpContext.Current.Session["refreshToken"] = refreshToken;
                return myCookie;
            }
            return null;
        }
        public static void CleanCookie()
        {
            
            //HttpContext.Current.Request.Cookies.Remove("access_token");
            //HttpContext.Current.Request.Cookies.Remove("refresh_token");
            //HttpContext.Current.Request.Cookies.Clear();
            if (HttpContext.Current.Request.Cookies[CookieName] != null)
            {
                HttpCookie mycookie = new HttpCookie(CookieName);
                mycookie.Expires = DateTime.Now.AddDays(-1);
                HttpContext.Current.Response.Cookies.Add(mycookie);

            }
        }
    }
}