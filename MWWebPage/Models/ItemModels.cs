using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MWWebPage.Models
{
    public class Item
    {
        public string Brand { get; set; }
        public string Color { get; set; }
        public string Gender { get; set; }
        public double Price { get; set; }
        public string ImgUrl { get; set; }
        public string Category { get; set; }
        public string DiscountPrice { get; set; }
        public string ItemUrl { get; set; }
        public string Title { get; set; }

        public string ItemId { get; set; }
        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }

        public string SourceName { get; set; }
    }

    public class Price
    {
        public int MaxPrice { get; set; }
        public int MinPrice { get; set; }
    }
}