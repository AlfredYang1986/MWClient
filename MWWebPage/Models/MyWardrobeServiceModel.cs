using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MWWebPage.Models
{
    public class MyWardrobeServiceModel
    {
        public string userId { get; set; }
        public int outfitId { get; set; }
        public string outfitName { get; set; }
        public List<OutfitItem> outfitItems { get; set; }
        public int itemId { get; set; }
        public int tagId { get; set; }
        public List<int> itemIds { get; set; }
        public List<itemBriefInfo> items { get; set; }
    }

    public class itemBriefInfo
    {
        public int itemId { get; set; }
        public int preTagId { get; set; }
    }

    public class OutfitItem
    {
        public int outfitId { get; set; }
        public int seaId { get; set; }
        public string picUrl { get; set; }
        public int picId { get; set; }
        public int picX { get; set; }
        public int picY { get; set; }
        public float angle { get; set; }
        public int cropX { get; set; }
        public int cropY { get; set; }
        public Nullable<float> cropWidth { get; set; }
        public Nullable<float> cropHeight { get; set; }
        public float sizingFactor { get; set; }
        public int zIndex { get; set; }

    }
}