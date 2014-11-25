using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MWWebPage.Models;
using MWWebPage.Controllers.Models;

namespace MWWebPage.Models
{
    public class HomeModelContext
    {
        private IEnumerable<Item> _nullItem = new List<Item>();
        public IEnumerable<Item> _items { get { return _nullItem; } set { _nullItem = value; } }

        public StylePalette myStylePal = new StylePalette();

        public _WaterfallHelper WaterfallHelper { get; set; }
        public ItemDetails Details { get; set; }
        public Price priceTaker = new Price() { MaxPrice = 10000, MinPrice = 20 };

        public _AllBrandModel BrandModel { get { return _brandModel; } }
        private _AllBrandModel _brandModel = new _AllBrandModel(); 

        public _AllCategoryModel CategoryMolde { get { return _categoryModel; } }
        private _AllCategoryModel _categoryModel = new _AllCategoryModel();

        public _AllScenceModel SecenceModel { get { return _scenceModel; } }
        private _AllScenceModel _scenceModel = new _AllScenceModel();

        public _AllUserSettingsModel SettingModel = new _AllUserSettingsModel();
    }
}