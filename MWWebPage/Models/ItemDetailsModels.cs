using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MWWebPage.Models
{
    public class ItemRcommondation
    {
        public IEnumerable<Item> Recommondation 
        { 
            get 
            {
                return new List<Item> { 
                    new Item {}                
                };
            } 
        }
    }
    
    public class ItemDetails
    {
        private string _mockUrl = @"~/Content/waterfall_test_image/01.jpg";
        public string ImgUrl { get { return _mockUrl; } }
        public ItemRcommondation Rommondation { get; set; }
    }
}