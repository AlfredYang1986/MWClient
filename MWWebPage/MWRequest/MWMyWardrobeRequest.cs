using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using MWWebPage.Models;
using System.Xml.Linq;
using System.Net;
using System.IO;
using MWRequest;
using System.Web.Script.Serialization;
using MWWebPage.Controllers;
using MWRemoteAPICall;

namespace MWWebPage.MWRequest
{
    public class MWMyWardrobeRequest
    {
        public static CookieHelper mycookie = new CookieHelper(HttpContext.Current.Session["email"].ToString());

        public static string token = HttpContext.Current.Session["AccessToken"].ToString();

        public static IEnumerable<MWWebPage.Models.OutfitItem> remoteListOutfitItems(string _userId, int _outfitId)
        {
            using (var remoteCall = MWRemoteAPIFactory.Instance())
            {
                dynamic p = new EndPointParameters();
                p.userId = _userId;
                p.outfitId = _outfitId;

                return remoteCall.invokes("dispatch", "request",
                            ParameterFactory.CreateAuthParamters(HttpContext.Current.Session["AccessToken"].ToString(),
                                ParameterFactory.CreateMethodParamters("DelItem", p as EndPointParameters)),
                                    MWMyWardrobeRequest.loadOutfitItems_2) as IEnumerable<MWWebPage.Models.OutfitItem>;
            }
        }

        private static Object loadOutfitItems_2(string result)
        {
            XDocument source = XDocument.Parse(result);

            var res = from item in source.Descendants(XName.Get("OutfitItem", source.Root.Name.NamespaceName))
                      select new MWWebPage.Models.OutfitItem
                      {
                          outfitId = int.Parse(item.Element(XName.Get("outfitId", source.Root.Name.NamespaceName)).Value),
                          seaId = int.Parse(item.Element(XName.Get("seaId", source.Root.Name.NamespaceName)).Value),
                          picUrl = item.Element(XName.Get("picUrl", source.Root.Name.NamespaceName)).Value,
                          picX = int.Parse(item.Element(XName.Get("picX", source.Root.Name.NamespaceName)).Value),
                          picY = int.Parse(item.Element(XName.Get("picY", source.Root.Name.NamespaceName)).Value),
                          angle = float.Parse(item.Element(XName.Get("angle", source.Root.Name.NamespaceName)).Value),
                          cropX = int.Parse(item.Element(XName.Get("cropX", source.Root.Name.NamespaceName)).Value),
                          cropY = int.Parse(item.Element(XName.Get("cropY", source.Root.Name.NamespaceName)).Value),
                          cropWidth = float.Parse(item.Element(XName.Get("cropWidth", source.Root.Name.NamespaceName)).Value),
                          cropHeight = float.Parse(item.Element(XName.Get("cropHeight", source.Root.Name.NamespaceName)).Value),
                          sizingFactor = int.Parse(item.Element(XName.Get("sizingFactor", source.Root.Name.NamespaceName)).Value),
                          zIndex = int.Parse(item.Element(XName.Get("zIndex", source.Root.Name.NamespaceName)).Value),
                      };
            return res;
        }
    }
}