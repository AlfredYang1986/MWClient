using MWWebPage.MWRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.Serialization.Json;
using System.Web;
using System.IO;
using Newtonsoft.Json;
using MWRemoteAPICall;

namespace MWRequest
{
    /*
     * Created by Ayush
     * Requests to the Authorization server to be created and processed here.
     */
    public class MWOAuthRequest
    {
        //current only client id 
        public const string clientId = @"yS2JzRYo0Ui9wO5KHvA3V+kwWapVxdUw";
        //refresh token!!??
        public static string refreshToken = @"A/w8iKMt0UjaGeawrj1ZeQnF7wXiHFqz";

        public static string remoteFacebookLogin(string uid, string token)
        {
            using (var remoteCall = MWRemoteAPIFactory.Instance())
            {
                dynamic p = new EndPointParameters();
                p.uId = uid;
                p.fbToken = token;
                dynamic request = new EndPointParameters();
                request.fbMapper = p;

                return remoteCall.invokes("oauth", "facebookLogin/",
                    request as EndPointParameters, MWOAuthRequest.getFacebookToken) as string;
            }
        }

        private static Object getFacebookToken(string result)
        {
            dynamic accessToken = JsonConvert.DeserializeObject(result);
            return accessToken.mw_fb_loginResult;
        }

        public static string remoteChangeUserPassword(string token, string password)
        {
            using (var remoteCall = MWRemoteAPIFactory.Instance())
            {
                dynamic p = new EndPointParameters();
                p.Token = token;
                p.Password = password;
                dynamic request = new EndPointParameters();
                request.request = p;

                return remoteCall.invokes("oauth", "UpdateUserPassword/",
                    request as EndPointParameters, MWOAuthRequest.getEasyResult) as string;
            }
        }

        private static Object getCrateAccountResult(string result)
        {
            return result.Replace('\"', ' ').Trim();
        }

        private static Object getEasyResult(string result)
        {
            return result;
        }

        public static string remoteCreateUserRequest(string username, string password, string gender, string birthDay,
                                             string birthMonth, string birthYear, string location)
        {
            using (var remoteCall = MWRemoteAPIFactory.Instance())
            {
                dynamic p = new EndPointParameters();
                p.client_id = clientId;
                p.password = password;
                p.email = username;
                p.DateTimeStr = (birthMonth + "/" + birthDay + "/" + birthYear);
                p.location = location;

                if (gender.ToLower().Equals("male"))
                    p.gender = "M";
                else if (gender.ToLower().Equals("female"))
                    p.gender = "F";
                else
                    p.gender = "O";

                dynamic user = new EndPointParameters();
                user.user = p;

                return remoteCall.invokes("oauth", "CreateUser/",
                    user as EndPointParameters, MWOAuthRequest.getCrateAccountResult) as string;
            }
        }

        public static string remoteCheckUserEmail(string email)
        {
            using (var remoteCall = MWRemoteAPIFactory.Instance())
            {
                dynamic request = new UrlPointParameters();
                request.email = email;

                return remoteCall.invokes("oauth", "CheckUserEmail", 
                    request as EndPointParameters, MWOAuthRequest.getEasyResult) as string;
            }
        }

        public static string remoteValidateChpToken(string chptoken)
        {
            using (var remoteCall = MWRemoteAPIFactory.Instance())
            {
                dynamic request = new UrlPointParameters();
                request.chptoken = chptoken;

                return remoteCall.invokes("oauth", "ValidateChpToken",
                    request as EndPointParameters, MWOAuthRequest.getEasyResult) as string;
            }
        }

        public static string remoteUpdateUserPassword(string chptoken, string password)
        {
            using (var remoteCall = MWRemoteAPIFactory.Instance())
            {
                dynamic request = new UrlPointParameters();
                request.chptoken = chptoken;
                request.password = password;

                return remoteCall.invokes("oauth", "UpdateUserPassword",
                    request as EndPointParameters, MWOAuthRequest.getEasyResult) as string;
            }
        }

        public static MWAccessTokenResponse remoteLoignPasswardGrant(string username, string password)
        {
            string newClientId = HttpUtility.UrlEncode(clientId);
            string refreshToken2 = string.Empty;
            try
            {
                refreshToken2 = HttpUtility.UrlEncode(HttpContext.Current.Session["RefreshToken"].ToString());
            }
            catch (Exception )
            {
                refreshToken2 = HttpUtility.UrlEncode(refreshToken);
            }

            using (var remoteCall = MWRemoteAPIFactory.Instance())
            {
                dynamic request = new UrlPointParameters();
                request.grant_type = @"password";
                request.code = "";
                request.redirect_uri = "";
                request.client_id = newClientId;
                request.username = username;
                request.password = password;
                request.scope = "";
                request.refresh_token = refreshToken2;

                return remoteCall.invokes("oauth", "access_token",
                           request as EndPointParameters, MWOAuthRequest.getLoginReuslt) as MWAccessTokenResponse; 
            }
        }

        private static Object getLoginReuslt(string result)
        {
            return JsonConvert.DeserializeObject(result, typeof(MWAccessTokenResponse)) as MWAccessTokenResponse;
        }

        public static Boolean ProcessResponse(MWAccessTokenResponse response)
        {
            Boolean validity = false;
            //TODO: Check if error returned..
            if (response == null || MWRequests.token == string.Empty)
            {
                return validity;
            }

            MWRequests.token = HttpUtility.UrlEncode(response.AccessToken);
            refreshToken = HttpUtility.UrlEncode(response.RefreshToken);
            //Set session variable
            HttpContext.Current.Session["AccessToken"] = MWRequests.token;
            HttpContext.Current.Session["RefreshToken"] = refreshToken;
            HttpContext.Current.Session["UserId"] = response.UserId;

            validity = true;

            return validity;
        }
    }
}