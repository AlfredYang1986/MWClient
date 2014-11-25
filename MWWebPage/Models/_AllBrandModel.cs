using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MWWebPage.Models
{
    public class _AllBrandModel
    {
        private static IEnumerable<char> _getBrandIndex() 
        {
            for (char index = 'A'; index <= 'Z'; ++index) 
                yield return index;
        }

        public static IEnumerable<string> _getBrandName()
        {
            var brandList = MWWebPage.MWRequest.MWRequests.GetMenuItems("brand");
            return brandList.AsEnumerable();
            //return new List<string> { "1", "2", "3", "4" }.AsEnumerable();
          
        }

        private static IEnumerable<char> _brandIndex = _getBrandIndex();
        private static IEnumerable<string> _brandName = _getBrandName();

        public IEnumerable<string> brandName {  get { return _brandName; } }
        public IEnumerable<char> brandIndex { get { return _brandIndex; } }
    }
}