using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using MWWebPage.Models;
using MWWebPage.MWRequest;
using System.Net;
using System.IO;
using MWRemoteAPICall;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace MWWebPage.Controllers
{
    public class MWHomeController : Controller
    {
        private EndPointParameters defaultSeaerch(string strInput = @"", int page = 0)
        {
            dynamic p = new EndPointParameters();
            if (strInput != null && strInput != @"")
            {
                p.input = strInput.Trim();
                p.conditions = new JArray() as dynamic;
                p.notConditions = new JArray() as dynamic;

                dynamic price = new EndPointParameters();

                price.minPrice = 0;
                price.maxPrice = 10000;

                p.price = price;
                p.currentPage = page;
                p.sortName = "Price";
                p.sortMethod = "Down";
            } 
            else
            {
                p.input = "null";
                p.conditions = new JArray() as dynamic;
                dynamic obj = new JObject();
                obj.type = @"discount";
                obj.val = -1;

                JArray a = new JArray();
                a.Add(obj);
                p.notConditions = a;

                dynamic price = new EndPointParameters();

                price.minPrice = 0;
                price.maxPrice = 10000;

                p.price = price;
                p.currentPage = page;
                p.sortName = "Price";
                p.sortMethod = "Down";
            }

            return p as EndPointParameters;
        }

        //
        // GET /MWHome/Index
        [HttpGet]
        public ActionResult Index(string strInput)
        {
            if (Request.IsAjaxRequest()) return null;

            ViewBag.OriginSearchString = strInput;
            var m = new HomeModelContext();
            m.WaterfallHelper = new _WaterfallHelper();
            m.WaterfallHelper.CurrentPage = 0;
            m.Details = new ItemDetails();

            var p = defaultSeaerch(strInput);
            var result = MWRequests.remoteSearch_2(JsonConvert.SerializeObject(p));

            if (result != null && !result.Equals("none"))
            {
                m._items = result as IEnumerable<Item>;
            }
            return View("Home", m);
        }

        [HttpGet]
        public ActionResult SetUserEnvironment()
        {
            var m = new HomeModelContext();
            m.WaterfallHelper = new _WaterfallHelper();
            m.Details = new ItemDetails();

            if (Session["email"] != null)
                m.SettingModel = GetProfile();

            if (Session["AccessToken"] != null)
            {
                ViewBag.Username = Session["email"];
                ViewBag.LogIn = "True";
            }
            else
                ViewBag.LogIn = "False";

            var p = defaultSeaerch();
            var result = MWRequests.remoteSearch_2(JsonConvert.SerializeObject(p));
            if (result != null && !result.Equals("none"))
            {
                m._items = result as IEnumerable<Item>;
            }

            return View(@"../MWHome/Home", m);
        }

        //
        // POST: /MWHome/Search
        [HttpPost]
        public PartialViewResult Search(string searchArgs)
        {
            dynamic search_args = JsonConvert.DeserializeObject(searchArgs);
            var model = new HomeModelContext();
            model.WaterfallHelper = new _WaterfallHelper();
            model.WaterfallHelper.CurrentPage = search_args.currentPage;
            model.Details = new ItemDetails();

            IEnumerable<Item> result;
            
            if (search_args.discount == true)
            {
                //var p = this.defaultSeaerch(@"null", search_args.Page);
                var p = this.defaultSeaerch(@"null", model.WaterfallHelper.CurrentPage);
                result = MWRequests.remoteSearch_2(JsonConvert.SerializeObject(p));
            }
            else
            {
                result = MWRequests.remoteSearch_2(searchArgs);
            }

            if (result != null && !result.Equals("none"))
            {
                model._items = result as IEnumerable<Item>;
                return PartialView(@"SearchResult/_Waterfall", model);
            }
            else
                return null;
        }

        // 
        // GET: /MWHome/AutoComplete/
        public JsonResult AutoComplete(string search)
        {
            var response = MWRequests.remoteAutoComplete(search);
            return Json(response, JsonRequestBehavior.AllowGet);            
        }

        //
        // GET: /MWHome/ItemDetails
        public ActionResult ItemDetails(int id)
        {
            var m = new ItemDetails();
            return PartialView("_ItemDetails", m);
        }

        //Get /MWHome/GetProfile/{email}
        public _AllUserSettingsModel GetProfile()
        {
            var userProfile = new _AllUserSettingsModel();
            string email = Session["email"] as string;
            string userId = "haahsksdfkas";
            userProfile._settings.email = email;
            userProfile._profile.populate(MWRequests.remoteGetProfileRequest(userId));

            return userProfile;
        }

        //Get /MWHome/UpdateProfile/{email}
        [HttpGet]
        public ActionResult UpdateProfile(_ProfileModel profile)
        {
            var profileModel = new _AllUserSettingsModel();
            profileModel._profile.populate(profile);
            profile.populate(profile);
            MWRequests.remoteProfileUpdateRequestData(profile, Session["email"] as string);
            return PartialView(@"SideToolKit/_Profile", profileModel);

        }

        [HttpGet]
        public JsonResult UpdataLikeCount(int itemID)
        {
            string userId = @"84Zxayw02aA5Mt7V+XtZSw==";

            var response = MWRequests.remoteGetUpdateLike(itemID.ToString(), userId) as string;
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
