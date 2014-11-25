using MWRequest;
using MWWebPage.MWRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using System.Runtime.Serialization.Json;
using MWRemoteAPICall;

namespace MWWebPage.Controllers
{
    public class ForgetPasswordController : Controller
    {
        //
        // GET: /ForgetPassword/

        public ActionResult Index()
        {
            // page for user to insert email address
            return View();
        }

        // 
        // GET: /ForgetPassword/MailNotification?email=

        public JsonResult MailNotification(string email)
        {
            // 1. first sent email to the Authorization server
            //    to check the email existing or not
            string chptoken = MWOAuthRequest.remoteCheckUserEmail(email);
            if (chptoken == null || chptoken == "false")
                return Json("the email does not exist", JsonRequestBehavior.AllowGet);            

            // 2. sent email to the user
            //string redirectUrl = @"http://dev.megawardrobe.com/ForgetPassword/ChangePasswordPage";
            string redirectUrl = @"http://localhost:1101/ForgetPassword/ChangePasswordPage";
            redirectUrl = string.Format(redirectUrl + "?chptoken={0}", chptoken);

            MailMessage mail = new MailMessage();
            mail.To.Add(email);
            mail.From = new MailAddress("yangyuanpig@gmail.com");
            mail.Subject = @"Megawardrobe Change your password";
            mail.Body = @"Alfred test" + Environment.NewLine.ToString() + redirectUrl;

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.Port = 587; // Gmail can use ports 25, 465 & 587; but must be 25 for medium trust environment.
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new System.Net.NetworkCredential("yangyuanpig@gmail.com", "abcde196125");
            smtp.EnableSsl = true;

            string message = @"Success, Please Check Your Email, and Change your password!";
            try
            {
                smtp.Send(mail);
            }
            catch (System.Exception ex)
            {
                message = ex.Message;
                //Console.WriteLine(ex.Message);
            }

            return Json(message, JsonRequestBehavior.AllowGet);            
        }

        //
        // GET: /ForgetPassword/ChangePasswordPage?chptoken=
        public ActionResult ChangePasswordPage(string chptoken)
        {
            // 1. check chptoken is expired or not
            if (chptoken == null || chptoken == "")
            {
                return View("TokenExpired");
            }

            string isVlidate = MWOAuthRequest.remoteValidateChpToken(chptoken);
            
            if (isVlidate == null || isVlidate == "false")
            {
                return View("TokenExpired");
            }

            ViewBag.chptoken = chptoken;
            return View();
        }

        //
        // POST: /ForgetPassword/ChangePassword
        //[HttpPost]
        public JsonResult ChangePassword(string chptoken, string password)
        {
            string bSuccess = MWOAuthRequest.remoteUpdateUserPassword(chptoken, password);

            if (bSuccess == null || bSuccess == "false")
            {
                return Json("Change password failed, because your token is expired", JsonRequestBehavior.AllowGet);            
            }

            return Json("Change password success, please go the landing page login again", JsonRequestBehavior.AllowGet);            
        }
    }
}
