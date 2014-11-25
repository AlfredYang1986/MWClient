using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MWWebPage.Models
{
    public class LoginTypes
    {
        public string Megawardrobe  { get { return "Megawardrobe"; } }
        public string Facebook  { get { return "FaceBook"; } }
        public string Twitter   { get { return "Twitter"; } }
        public string Weibo     { get { return "Weibo"; } }
        public string Instagram { get { return "Instagram"; } }
    }

    public class UserLoginModel
    {
        //public string LoginMethod { get; set; }

        [Required]
        //[Display(Name = "User name")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        //[Display(Name = "Password")]
        public string Password { get; set; }

        //[Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class UserRegisterModel
    {
        public string FirstName { get; set; }
        public string NickName { get; set; }
        public string Email { get; set; }
        public string DOB { get; set; }
    }

    public class LoginContext
    {
        static public LoginTypes _type = new LoginTypes();
        //static public UserLoginModel _user = new UserLoginModel();
        public LoginTypes loginTypes { get { return _type; } }
        //public UserLoginModel userLoginModel 
        //{ 
        //    get { return _user; } 
        //    set 
        //    { 
        //        _user.Username = value.Username;
        //        _user.Password = value.Password;
        //        _user.RememberMe = value.RememberMe;
        //    } 
        //} 
        public UserLoginModel userLoginModel { get; set; }
        //public UserRegisterModel userRegisterModel { get; set; }
    }
}