using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MWWebPage.Models
{
    public class TagServiceModel
    {
        public string userId { get; set; }
        public int tagId { get; set; }
        public string tagName { get; set; }
        public string tagType { get; set; }
        public int itemId { get; set; }
        public int outfitId { get; set; }
        public int picId { get; set; }
        public long timeAdded { get; set; }
        public List<OutfitInfo> outfits { get; set; }
        public int pageIndex { get; set; }
        public string coverUrl { get; set; }
        public List<Tags> sTags { get; set; }
        public int preTagId { get; set; }
    }

    public class ReturnTags
    {
        public IEnumerable<Tags> tags { get; set; }
        public int totalPages { get; set; }
        public int pageIndex { get; set; }
    }

    public class Tags
    {
        public int tagId { get; set; }
        public string tagName { get; set; }
        public string tagType { get; set; }
        public string picUrl { get; set; }
    }
    public class ItemInfo
    {
        public int searchable_ItemId { get; set; }
        public string brand { get; set; }
        public string category { get; set; }
        public string from_url { get; set; }
        public string addedTime { get; set; }
        public double price { get; set; }
        public string title { get; set; }
        public string default_pic { get; set; }
        public int tagId { get; set; }

        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }
    }

    public class ItemGroup
    {
        public string groupKey { get; set; }
        public List<ItemInfo> items { get; set; }
        public List<OutfitInfo> outfits { get; set; }
    }

    public class OutfitInfo
    {
        public int outfitId { get; set; }
        public string outfitName { get; set; }
        public string outfitPic { get; set; }
        public string outfitTime { get; set; }
    }
    public class TagNumber {
        public int totalPage { get; set; }
    }
}
