using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MWWebPage.Models
{
    public class _AllCategoryModel
    {
        private static IEnumerable<string> _getCategory()
        {
            var categoryList = MWWebPage.MWRequest.MWRequests.GetMenuItems("category");
            return categoryList.AsEnumerable();
        }

        private static IEnumerable<IEnumerable<string> > _getSubCategory()
        {
            return new List<IEnumerable<string>> { 
                MWWebPage.MWRequest.MWRequests.GetMenuItems("Topssubcategory"),
                MWWebPage.MWRequest.MWRequests.GetMenuItems("Footwearsubcategory"),
                MWWebPage.MWRequest.MWRequests.GetMenuItems("skirt&dressessubcategory"),
                MWWebPage.MWRequest.MWRequests.GetMenuItems("Occasionsubcategory"),
                MWWebPage.MWRequest.MWRequests.GetMenuItems("trousers&shortssubcategory"),
                MWWebPage.MWRequest.MWRequests.GetMenuItems("hosierysubcategory"),
            }.AsEnumerable();
        }

        private static IEnumerable<string> _category = _getCategory();
        private static IEnumerable<IEnumerable<string>> _subCategory = _getSubCategory();

        public IEnumerable<string> Category { get { return _category; } }
        public IEnumerable<string> getSubCategory(string cat)
        {
            return SubCategory.ElementAt(Category.ToList().IndexOf(cat));
        }
        public IEnumerable<IEnumerable<string>> SubCategory { get { return _subCategory; } }
    }
}