using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;

namespace MWWebPage.Models
{
    public class _WaterfallHelper
    {

        public int CurrentPage
        {
            get;
            set;
        }
        public string CurrentImg { get {
            return "waterfall_img_" + CurrentPage;
        } }
    }
}