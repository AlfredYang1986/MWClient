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
    public class MWTagController : Controller
    {
        //
        // GET: /MWTag/

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public Boolean AddTag(string _userId, string _tagName, string _tagType, int _itemId, int _picId)
        {
            var result = MWRequests.remoteAddTag(_userId, _tagName, _tagType, _itemId, _picId);
            return result.HasValue ? result.Value : false;
        }

        [HttpGet]
        public Boolean AddTagToOutfit(string _userId, string _tagName, string _tagType, int _outfitId, int _picId)
        {
            var result = MWRequests.remoteAddOutfit(_userId, _tagName, _tagType, _outfitId, _picId);
            return result.HasValue ? result.Value : false;
        }

        [HttpGet]
        public ActionResult DelTag(int inputTagId)
        {
            return PartialView(@"../MWHome/SideToolKit/Wardrobe/Tags/_WardrobeTags", MWRequests.remoteDelTag(inputTagId));
        }

        [HttpGet]
        public Boolean DelItemTag(string _userId, int _itemId, int _tagId)
        {
            var result = MWRequests.remoteDelObjTag(_userId, _itemId, _tagId);
            return result.HasValue ? result.Value : false;
        }

        [HttpGet]
        public Boolean DelOutfitTag(string _userId, int _outfitId, int _tagId)
        {
            var result = MWRequests.remoteDelOutfitTag(_userId, _outfitId, _tagId);
            return result.HasValue ? result.Value : false;
        }

        [HttpGet]
        public Boolean EditTag(string _tagName, int _tagId)
        {
            var result = MWRequests.remoteEditTag(_tagName, _tagId);
            return result.HasValue ? result.Value : false;
        }

        [HttpGet]
        public Boolean EditItemTag(string _userId, int _itemId, string _tagName, string _tagType, int _tagId)
        {
            var result = MWRequests.remoteEditObjTag(_userId, _itemId, _tagName, _tagType, _tagId);
            return result.HasValue ? result.Value : false;
        }

        [HttpGet]
        public Boolean EditOutfitTag(string _userId, int _outfitId, string _tagName, string _tagType, int _tagId)
        {
            var result = MWRequests.remoteEditOutfitTag(_userId, _outfitId, _tagName, _tagType, _tagId);
            return result.HasValue ? result.Value : false;
        }

        [HttpGet]
        public int ImportedCount(int _itemId)
        {
            var result = MWRequests.remoteImportCount(_itemId);
            return result.HasValue ? result.Value : 0;
        }

        [HttpGet]
        public JsonResult LikedCount(int _itemId)
        {
            var result = MWRequests.remoteLikeCount(_itemId);
            return Json(result.HasValue ? result.Value : 0, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public int DislikedCount(int _itemId)
        {
            var result = MWRequests.remoteLikeCount(_itemId);
            return result.HasValue ? result.Value : 0;
        }

        [HttpGet]
        public int LikeAnItem(int _itemId)
        {
            var result = MWRequests.remoteLikeAnItem(_itemId);
            return result.HasValue ? result.Value : 0;
        }

        [HttpGet]
        public int DislikeAnItem(int _itemId, string _userId)
        {
            var result = MWRequests.remoteDislikeAnItem(_itemId);
            return result.HasValue ? result.Value : 0;
        }

        [HttpGet]
        public ActionResult ListTags(string _userId, int _pageIndex)
        {
            return PartialView(@"../MWHome/SideToolKit/Wardrobe/Tags/_WardrobeTags", MWRequests.remoteListTags(_userId, _pageIndex));
        }

        [HttpGet]
        public ActionResult ListAllTags(string _userId)
        {
            return PartialView(@"../MWHome/SideToolKit/Wardrobe/_ChooseTags", MWRequests.remoteListAllTags(_userId));
        }

        [HttpGet]
        public ActionResult GetTagNumber(string _userId)
        {
            var result = MWRequests.remoteGetTagNumber(_userId);
            return PartialView(@"../MWHome/SideToolKit/Wardrobe/Tags/_Wardrobe-indicators", 
                new TagNumber { totalPage = result.HasValue ? result.Value : 0});
        }

        [HttpGet]
        public IEnumerable<MWWebPage.Models.OutfitInfo> ListOutfitByTag(string _userId, int _tagId)
        {
            return MWRequests.remoteListOutfitByTag(_userId, _tagId);
        }

        [HttpGet]
        public IEnumerable<MWWebPage.Models.ItemInfo> ListOutfitItemsByOutfitId(string _userId, int _outfitId)
        {
            return MWRequests.remoteListOutfitItemsByOutfitId(_userId, _outfitId);
        }

        public ActionResult ListOutfitByTime(string _userId, int _tagId)
        {
            return PartialView(@"../MWHome/SideToolKit/Wardrobe/TagItemDetails/_WSPaneOutfits",
                                (from iter in MWRequests.remoteListOutfitByTag(_userId, _tagId)
                                 group iter by iter.outfitTime into g
                                 select new ItemGroup
                                 {
                                     groupKey = g.Key,
                                     outfits = g.ToList()
                                 }).OrderBy(x => x.groupKey));
        }

        [HttpGet]
        public ActionResult ListItemByTag(string _userId, int _tagId)
        {
            return PartialView(@"../MWHome/Wardrobe/TagItemDetails/_WSPaneItems", MWRequests.remoteListItemByTag(_userId, _tagId));
        }

        public ActionResult ListUserItemsByBrand(string _userId, int _tagId)
        {
            return PartialView(@"../MWHome/SideToolKit/Wardrobe/TagItemDetails/_WSPaneItems",
                                (from iter in MWRequests.remoteListItemByTag(_userId, _tagId)
                                 group iter by iter.brand into g
                                 select new ItemGroup
                                 {
                                     groupKey = g.Key,
                                     items = g.ToList()
                                 }).OrderBy(x => x.groupKey));
        }

        public ActionResult ListUserItemsByCategory(string _userId, int _tagId)
        {
            return PartialView(@"../MWHome/SideToolKit/Wardrobe/TagItemDetails/_WSPaneItems",
                                (from iter in MWRequests.remoteListItemByTag(_userId, _tagId)
                                 group iter by iter.category into g
                                 select new ItemGroup
                                 {
                                     groupKey = g.Key,
                                     items = g.ToList()
                                 }).OrderBy(x => x.groupKey));
        }

        public ActionResult ListUserItemsByTime(string _userId, int _tagId)
        {
            return PartialView(@"../MWHome/SideToolKit/Wardrobe/TagItemDetails/_WSPaneItems",
                                (from iter in MWRequests.remoteListItemByTag(_userId, _tagId)
                                 group iter by iter.addedTime into g
                                 select new ItemGroup
                                 {
                                     groupKey = g.Key,
                                     items = g.ToList()
                                 }).OrderBy(x => x.groupKey));
        }

        [HttpGet]
        public Boolean SetCover(string _coverUrl, int _tagId)
        {
            var result = MWRequests.remoteSetCover(_coverUrl, _tagId);
            return result.HasValue ? result.Value : false;
        }

        [HttpGet]
        public Boolean EditTagSave(string strJson)
        {
            return false;
        }
    }
}
