using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MWWebPage.Models
{
    public class _AllUserSettingsModel
    {
        public _ProfileModel _profile = new _ProfileModel()
        {
            BirthDay = DateTime.Now.Day.ToString(),
            BirthMonth = DateTime.Now.Month.ToString(),
            BirthYear = DateTime.Now.Year.ToString(),
            Gender = "Male",
            NickName = "Nick",
            occupation = "Student",
            nationality = "Australia",
            location = "Melbourne"
        };
        public _SettingsModel _settings = new _SettingsModel() {
            email = "alexandria.demint@megawardrobe.com" 
            //HttpContext.Current.Session["email"] as string
        };

        public _ProfileModel setProfile()
        {
            if(_settings.email == string.Empty)
            {
                //dont do it
            }
            _ProfileModel profile = MWRequest.MWRequests.remoteGetProfileRequest(_settings.email);
            profile.populate(profile);
            return profile;
        }

        public _ProfileModel Profile 
        { 
            get 
            {
                //_profile = setProfile();
                return _profile; 
            } 
        }
        public _SettingsModel Settings { get { return _settings; } }
    }

    
    public class _ProfileModel
    {
        public string BirthDay { get; set; }
        public string BirthMonth { get; set; }
        public string BirthYear { get; set; }
        public string Gender { get; set; }
        public string NickName { get; set; }
        //public int credit { get; set; }
        //public int experience { get; set; }
        public string occupation { get; set; }
        public string nationality { get; set; }
        public string location { get; set; }
        public int profile_picture { get; set; }
        public string birthdate { get; set; }
        public _ProfileModel()
        {
            //call the get profile web service
            
        }

        public void populate(_ProfileModel newProfile)
        {
            if(newProfile.birthdate != null)
            {
                if(newProfile.birthdate != string.Empty)
                {
                    DateTime date = DateTime.Parse(newProfile.birthdate);
                    this.BirthDay = date.Day.ToString();
                    this.BirthMonth = date.Month.ToString();
                    this.BirthYear = date.Year.ToString();
                }
            }
            else
            {
                this.BirthDay = newProfile.BirthDay;
                this.BirthMonth = newProfile.BirthMonth;
                this.BirthYear = newProfile.BirthYear;
            }
            if (newProfile.Gender.ToLower().StartsWith("m"))
                this.Gender = "M";
            else if (newProfile.Gender.ToLower().StartsWith("f"))
                this.Gender = "F";
            else
                this.Gender = "O";
            this.NickName = newProfile.NickName;
            this.occupation = newProfile.occupation;
            this.nationality = newProfile.nationality;
            this.location = newProfile.location;
        }
    }

    public class _SettingsModel
    {
        public string email { get; set; }
        public string password { get; set; }
    }
}