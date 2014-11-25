using MWWebPage.Models;
using MWWebPage.MWRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace MWWebPage.Controllers
{
    public class MWMyWardrobeController : Controller
    {
        [HttpGet]
        public Boolean AddItem(string _userId, int _itemId, int _tagId)
        {
            var result = MWRequests.remoteAddItem(_userId, _itemId, _tagId);
            return result.HasValue ? result.Value : false;
        }

        [HttpGet]
        public Boolean DelItem(string _userId, int _itemId)
        {
            var result = MWRequests.remoteDelItem(_userId, _itemId);
            return result.HasValue ? result.Value : false;
        }

        [HttpGet]
        public string ListOutfitItems(string _userId, int _outfitId)
        {
            var result = MWMyWardrobeRequest.remoteListOutfitItems(_userId, _outfitId);
            return new JavaScriptSerializer().Serialize(result);
        }

        [HttpGet]
        public Boolean DelOutfit(string _userId, int _outfitId)
        {

            var result = MWRequests.remoteDelOutfit(_userId, _outfitId);
            return result.HasValue ? result.Value : false;
        }

        [HttpGet]
        public Boolean EditOutfit(string _userId, int _outfitId)
        {
            var result = MWRequests.remoteEditOutfit(_userId, _outfitId);
            return result.HasValue ? result.Value : false;
        }

        [HttpGet]
        public ActionResult ListAllUserItems(string _userId)
        {
            return PartialView(@"../MWHome/SideToolKit/Wardrobe/TagItemDetails/_WardrobeAllSingleItems", MWRequests.remoteListAllUserItems(_userId));
        }

        [HttpGet]
        public ActionResult ListAllUserOutfits(string _userId)
        {
            return PartialView(@"../MWHome/SideToolKit/Wardrobe/TagItemDetails/_WardrobeAllOutfits", MWRequests.remoteListAllUserOutfits(_userId));
        }
    }
}
