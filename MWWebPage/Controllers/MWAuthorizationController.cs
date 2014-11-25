using MWWebPage.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MWRequest;
using System.Web.Routing;
using System.Xml;
using System.Xml.Linq;
using MWWebPage.MWRequest;

namespace MWWebPage.Controllers
{
    public class MWAuthorizationController : Controller
    {
        // GET: /MWAuthorization/
        [HttpGet]
        public ActionResult Login()
        {
            return View(new LoginContext
            {
                userLoginModel = new UserLoginModel
                {
                    Username = "ayush",
                    Password = "password",
                    RememberMe = false
                }
            });
        }

        [HttpGet]
        public ActionResult FacebookLogin(string uId, string accessToken)
        {
            string response = MWOAuthRequest.remoteFacebookLogin(uId, accessToken);
            
            //validate response, then add to session
            Session["AccessToken"] = response;
            MWRequest.MWRequests.token = response;
            //map it to the authorization server

            UrlHelper h = new UrlHelper(ControllerContext.HttpContext.Request.RequestContext);
            string str = h.Action("SetUserEnvironment", "MWHome", null);
            return new JsonResult() { Data = str, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // POST /MWAuthorization/LoginPost
        [HttpGet]
        public ActionResult LoginPost(string username, string password, Boolean rememberMe)
        {
            ModelState.Clear();
            //TODO: check username and password

            MWAccessTokenResponse response = MWOAuthRequest.remoteLoignPasswardGrant(username, password);
            //process req
            string login_user = "Fail";
            if (MWOAuthRequest.ProcessResponse(response))
            {
                if(rememberMe)
                {
                    CookieHelper cookie = new CookieHelper(username);
                    CookieHelper.SetCookie(MWRequests.token, MWOAuthRequest.refreshToken);
                }
                
                Session["email"] = username;
                login_user = username;
            }

            if (login_user != "Fail")
            {
                UrlHelper h = new UrlHelper(ControllerContext.HttpContext.Request.RequestContext);
                string str = h.Action("SetUserEnvironment", "MWHome", null);
                return new JsonResult() { Data = str, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }

            else
                return null;
        }

        // POST: /MWAuthorization/CreateAccount
        [HttpGet]
        public JsonResult CreateAccount(string username, string password, string gender, string birthDay,
                                        string birthMonth, string birthYear, string location)
        {

            var res = MWOAuthRequest.remoteCreateUserRequest(username, password, gender, birthDay, birthMonth, birthYear, location) as string;
            
             Session["email"] = username;
             if (res == "user name already exist!")
                 return Json(res, JsonRequestBehavior.AllowGet);
             else
             {
                 Session["AccessToken"] = res;
                 
                 UrlHelper h = new UrlHelper(ControllerContext.HttpContext.Request.RequestContext);
                 string str = h.Action("SetUserEnvironment", "MWHome", null);
                 return new JsonResult() { Data = str, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
             }
        }


        [HttpGet]
        public string ChangePassword(string newPassword)
        {
            return MWOAuthRequest.remoteChangeUserPassword(Session["AccessToken"].ToString(), newPassword);
        }

        [HttpGet]
        public JsonResult Logoff()
        {
            Session.RemoveAll();
            Session.Clear();
            Session.Abandon();
            CookieHelper.CleanCookie();

            //UrlHelper h = new UrlHelper(ControllerContext.HttpContext.Request.RequestContext);
            //string str = h.Action("_Layout", "Shared", null);
            return Json("True", JsonRequestBehavior.AllowGet); 
        }

    }
}
