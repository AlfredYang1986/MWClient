using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MWWebPage.Models
{
    public class _AllScenceModel
    {
        private static IEnumerable<string> _getScence()
        {
            var scenceList = MWWebPage.MWRequest.MWRequests.GetMenuItems("scence");
            return scenceList.AsEnumerable();
        }

        private static IEnumerable<string> _scence = _getScence();

        public IEnumerable<string> scence { get { return _scence; } }
    }
}