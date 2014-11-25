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
using System.ServiceModel;
using MWRemoteAPICall;
using Newtonsoft.Json.Linq;

namespace MWWebPage.MWRequest
{
    public class MWRequests
    {
        //access token
        public static string token = HttpUtility.UrlEncode(@"DFaZSeNv0UgUDBo1rCVkmqxSJMkl427K");

        public static IEnumerable<string> GetMenuItems(string input)
        {
            return RequestRemoteCall<IEnumerable<string>>("dispatch", "request", "GetInitialMenuItem",
                                                 input, token, MWRequests.loadItem_2);
        }

        private static Object loadItem_2(string result)
        {
            XDocument source = XDocument.Parse(result);
            return from item in source.Descendants(XName.Get("string", source.Root.Name.NamespaceName))
                   select new string(item.Value.Replace("'", "\\'").Replace('&', '_').ToCharArray());
        }

        public static IEnumerable<MWWebPage.Models.Item> remoteSearch_2(string args)
        {
            return RequestRemoteCall <IEnumerable<MWWebPage.Models.Item>>("dispatch", "request", "Searching", args, token,MWRequests.loadSearchingItems_2);
        }

        public static IEnumerable<MWWebPage.Models.Item> remoteSearch(string input, int min, int max, int CurrentPage, string sortName, string sortMethod)
        {
            dynamic p = new EndPointParameters();
            p.input = input.Trim();
            p.conditions = new JArray() as dynamic;
            p.notConditions = new JArray() as dynamic;

            dynamic price = new EndPointParameters();
               
            price.minPrice = min;
            price.maxPrice = max;
                
            p.price = price;
            p.currentPage = CurrentPage;
            p.sortName = sortName;
            p.sortMethod = sortMethod;

            return RequestRemoteCall<IEnumerable<MWWebPage.Models.Item>>("dispatch", "request", "Searching",
                            p as EndPointParameters,
                            token,
                            MWRequests.loadSearchingItems_2);
        }

        private static Object loadSearchingItems_2(string result)
        {
            XDocument source = XDocument.Parse(result);

            var res = from item in source.Descendants(XName.Get("Apparel", source.Root.Name.NamespaceName))
                      select new MWWebPage.Models.Item
                      {
                          ItemId = item.Element(XName.Get("ItemID", source.Root.Name.NamespaceName)).Value,
                          Brand = item.Element(XName.Get("Brand", source.Root.Name.NamespaceName)).Value,
                          Color = item.Element(XName.Get("Color", source.Root.Name.NamespaceName)).Value,
                          Gender = item.Element(XName.Get("Gender", source.Root.Name.NamespaceName)).Value,
                          Price = Double.Parse(item.Element(XName.Get("Price", source.Root.Name.NamespaceName)).Value),
                          ImgUrl = item.Element(XName.Get("ImageURL", source.Root.Name.NamespaceName)).Value,
                          Category = item.Element(XName.Get("Category", source.Root.Name.NamespaceName)).Value,
                          DiscountPrice = item.Element(XName.Get("DiscountPrice", source.Root.Name.NamespaceName)).Value,
                          ItemUrl = item.Element(XName.Get("ItemUrl", source.Root.Name.NamespaceName)).Value,
                          Title = item.Element(XName.Get("Title", source.Root.Name.NamespaceName)).Value,
                          LikeCount = Convert.ToInt32(item.Element(XName.Get("Likes", source.Root.Name.NamespaceName)).Value),
                          SourceName = item.Element(XName.Get("SourceName", source.Root.Name.NamespaceName)).Value,
                      };
            return res;
        }

        public static string remoteGetUpdateLike(string itemId, string userid)
        {
            dynamic p = new EndPointParameters();
            p.ItemID = itemId;
            p.userId = userid;
            return RequestRemoteCall<string>("dispatch", "request", "UpdateLikeCount",
                                    p as EndPointParameters,
                                    HttpContext.Current.Session["AccessToken"].ToString(),
                                    MWRequests.GetUpdateLikeResult_2);
        }

        private static Object GetUpdateLikeResult_2(string result)
        {
            try
            {
                XDocument source = XDocument.Parse(result);
                return (from item in source.Descendants(XName.Get("string", source.Root.Name.NamespaceName))
                       select item.Value).FirstOrDefault();
            }
            catch (System.Exception )
            {
                return null;
            }
        }

        public static IEnumerable<string> remoteAutoComplete(string input)
        {
            return RequestRemoteCall<IEnumerable<string>>("dispatch", "request", "AutoCompletion",
                                             input,
                                             token,
                                             MWRequests.getAutoCompleteResult);         
        }

        private static Object getAutoCompleteResult(string result)
        {
            try
            {
                XDocument source = XDocument.Parse(result);
                return (from item in source.Descendants(XName.Get("string", source.Root.Name.NamespaceName))
                        select new String(item.Value.ToArray()));
            }
            catch (System.Exception )
            {
                return null;
            }
        }

        public static string remoteProfileUpdateRequestData(_ProfileModel profile, string emailid)
        {
            dynamic p = new EndPointParameters();
            p.email = emailid;
            p.DateTimeStr = profile.BirthDay + "/" + profile.BirthMonth + "/" + profile.BirthYear;
            p.gender = profile.Gender;
            p.name = profile.NickName;
            p.occupation = profile.occupation;
            p.nationality = profile.nationality;
            p.location = profile.location;
            p.profile_picture = profile.profile_picture;

            return RequestRemoteCall<string>("dispatch", "request", "UpdateUser",
                                    p as EndPointParameters,
                                    HttpContext.Current.Session["AccessToken"].ToString(),
                                    MWRequests.loadStringResult_2);
        }

        private static Object loadStringResult_2(string result)
        {
            return result;
        }

        public static MWWebPage.Models._ProfileModel remoteGetProfileRequest(string userId)
        {
            return RequestRemoteCall<MWWebPage.Models._ProfileModel>("dispatch", "request", "GetUserInfo",
                                                        userId,
                                                        HttpContext.Current.Session["AccessToken"].ToString(),
                                                        MWRequests.loadProfile_2);
        }

        private static Object loadProfile_2(string result)
        {
            XDocument source = XDocument.Parse(result);

            var res = (from item in source.Descendants(XName.Get("UserInfo", source.Root.Name.NamespaceName))
                       select new MWWebPage.Models._ProfileModel
                       {
                           birthdate = item.Element(XName.Get("DateTimeStr", source.Root.Name.NamespaceName)).Value,
                           //credit = item.Element(XName.Get("credit", source.Root.Name.NamespaceName)).Value,
                           Gender = (item.Element(XName.Get("gender", source.Root.Name.NamespaceName)) != null) ? item.Element(XName.Get("gender", source.Root.Name.NamespaceName)).Value : "",
                           NickName = (item.Element(XName.Get("name", source.Root.Name.NamespaceName)) != null) ? item.Element(XName.Get("name", source.Root.Name.NamespaceName)).Value : "",
                           location = (item.Element(XName.Get("location", source.Root.Name.NamespaceName)) != null) ? item.Element(XName.Get("location", source.Root.Name.NamespaceName)).Value : "",
                           nationality = (item.Element(XName.Get("nationality", source.Root.Name.NamespaceName)) != null) ? item.Element(XName.Get("nationality", source.Root.Name.NamespaceName)).Value : "",
                           profile_picture = (item.Element(XName.Get("profile_picture", source.Root.Name.NamespaceName)) != null) ? ((item.Element(XName.Get("profile_picture", source.Root.Name.NamespaceName)).Value != "") ? Int32.Parse(item.Element(XName.Get("profile_picture", source.Root.Name.NamespaceName)).Value) : 0) : 0,
                           occupation = (item.Element(XName.Get("occupation", source.Root.Name.NamespaceName)) != null) ? item.Element(XName.Get("occupation", source.Root.Name.NamespaceName)).Value : "",
                           //experience = item.Element(XName.Get("experience", source.Root.Name.NamespaceName)).Value,
                       }).FirstOrDefault();
            return res;
        }

        public static MWWebPage.Models._ProfileModel loadProfile(string result)
        {
            var xDoc = new XmlDocument();
            xDoc.LoadXml(result);

            //check if the result was an error

            //if not error
            var innerXml = xDoc.InnerText;
            XDocument source = XDocument.Parse(innerXml);

            //var res = source.Element("UserInfo")
            var res = (from item in source.Descendants(XName.Get("UserInfo", source.Root.Name.NamespaceName))
                       select new MWWebPage.Models._ProfileModel
                       {
                           birthdate = item.Element(XName.Get("DateTimeStr", source.Root.Name.NamespaceName)).Value,
                           //credit = item.Element(XName.Get("credit", source.Root.Name.NamespaceName)).Value,
                           Gender = (item.Element(XName.Get("gender", source.Root.Name.NamespaceName)) != null) ? item.Element(XName.Get("gender", source.Root.Name.NamespaceName)).Value : "",
                           NickName = (item.Element(XName.Get("name", source.Root.Name.NamespaceName)) != null) ? item.Element(XName.Get("name", source.Root.Name.NamespaceName)).Value : "",
                           location = (item.Element(XName.Get("location", source.Root.Name.NamespaceName)) != null) ? item.Element(XName.Get("location", source.Root.Name.NamespaceName)).Value : "",
                           nationality = (item.Element(XName.Get("nationality", source.Root.Name.NamespaceName)) != null) ? item.Element(XName.Get("nationality", source.Root.Name.NamespaceName)).Value : "",
                           profile_picture = (item.Element(XName.Get("profile_picture", source.Root.Name.NamespaceName)) != null) ? ((item.Element(XName.Get("profile_picture", source.Root.Name.NamespaceName)).Value != "") ? Int32.Parse(item.Element(XName.Get("profile_picture", source.Root.Name.NamespaceName)).Value) : 0) : 0,
                           occupation = (item.Element(XName.Get("occupation", source.Root.Name.NamespaceName)) != null) ? item.Element(XName.Get("occupation", source.Root.Name.NamespaceName)).Value : "",
                           //experience = item.Element(XName.Get("experience", source.Root.Name.NamespaceName)).Value,
                       }).FirstOrDefault();
            return res;
        }
		
        public static Nullable<Boolean> remoteAddTag(string _userId, string _tagName, string _tagType, int _itemId, int _picId)
        {
            dynamic p = new EndPointParameters();
            p.itemId = _itemId;
            p.tagType = _tagType;
            p.tagName = _tagName;
            p.userId = _userId;
            p.picId = _picId;

            return RequestRemoteCall<Nullable<Boolean>>("dispatch", "request", "AddTag",
                                                p as EndPointParameters,
                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                MWRequests.loadBoolResult_2);
        }

        public static Nullable<Boolean> remoteAddOutfit(string _userId, string _tagName, string _tagType, int _outfitId, int _picId)
        {
            dynamic p = new EndPointParameters();
            p.outfitId = _outfitId;
            p.tagType = _tagType;
            p.tagName = _tagName;
            p.userId = _userId;
            p.picId = _picId;
                
            return RequestRemoteCall<Nullable<Boolean>>("dispatch", "request", "AddTag",
                                                p as EndPointParameters,
                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                MWRequests.loadBoolResult_2);
        }

        public static IEnumerable<MWWebPage.Models.Tags> remoteDelTag(int inputTagId)
        {
            dynamic p = new EndPointParameters();
            p.tagId = inputTagId;

            return RequestRemoteCall<IEnumerable<MWWebPage.Models.Tags>>("dispatch", "request", "DelTag",
                                                                p as EndPointParameters,
                                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                                MWRequests.loadUserTags_2);
        }

        private static Object loadUserTags_2(string result)
        {
            if (result == "") return new List<MWWebPage.Models.Tags>();

            XDocument source = XDocument.Parse(result);

            var reslut = from item in XDocument.Parse(result).Descendants(XName.Get("Tags", source.Root.Name.NamespaceName))
                   select new MWWebPage.Models.Tags
                   {
                       tagId = int.Parse(item.Element(XName.Get("tagId", source.Root.Name.NamespaceName)).Value),
                       tagName = item.Element(XName.Get("tagName", source.Root.Name.NamespaceName)).Value,
                       tagType = item.Element(XName.Get("tagType", source.Root.Name.NamespaceName)).Value,
                       picUrl = item.Element(XName.Get("tagPicUrl", source.Root.Name.NamespaceName)).Value,
                   };
            return reslut;
        }

        public static Nullable<Boolean> remoteDelObjTag(string _userId, int _itemId, int _tagId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;
            p.itemId = _itemId;
            p.preTagId = _tagId;

            return RequestRemoteCall<Nullable<Boolean>>("dispatch", "request", "DelObjTag",
                                                p as EndPointParameters,
                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                MWRequests.loadBoolResult_2);
        }
        
        public static Nullable<Boolean> remoteDelOutfitTag(string _userId, int _outfitId, int _tagId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;
            p.outfitId = _outfitId;
            p.preTagId = _tagId;

            return RequestRemoteCall<Nullable<Boolean>>("dispatch", "request", "DelObjTag",
                                                p as EndPointParameters,
                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                MWRequests.loadBoolResult_2);
        }

        public static Nullable<Boolean> remoteEditTag(string _tagName, int _tagId)
        {
            dynamic p = new EndPointParameters();
            p.tagName = _tagName;
            p.tagId = _tagId;

            return RequestRemoteCall<Nullable<Boolean>>("dispatch", "request", "EditTag",
                                                p as EndPointParameters,
                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                MWRequests.loadBoolResult_2);
        }

        public static Nullable<Boolean> remoteEditObjTag(string _userId, int _itemId, string _tagName, string _tagType, int _tagId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;
            p.itemId = _itemId;
            p.tagName = _tagName;
            p.tagType = _tagType;
            p.tagId = _tagId;

            return RequestRemoteCall<Nullable<Boolean>>("dispatch", "request", "EditObjTag",
                                                p as EndPointParameters,
                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                MWRequests.loadBoolResult_2);
        }
        
        public static Nullable<Boolean> remoteEditOutfitTag(string _userId, int _outfitId, string _tagName, string _tagType, int _tagId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;
            p.outfitId = _outfitId;
            p.tagName = _tagName;
            p.tagType = _tagType;
            p.tagId = _tagId;
                
            return RequestRemoteCall<Nullable<Boolean>>("dispatch", "request", "EditObjTag",
                                                p as EndPointParameters,
                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                MWRequests.loadBoolResult_2);
        }

        public static IEnumerable<MWWebPage.Models.Tags> remoteListTags(string _userId, int _pageIndex)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;
            p.pageIndex = _pageIndex;
                
            return RequestRemoteCall<IEnumerable<MWWebPage.Models.Tags>>("dispatch", "request", "ListTags",
                            p as EndPointParameters,
                            HttpContext.Current.Session["AccessToken"].ToString(),
                            MWRequests.loadUserTags_2);
        }

        public static IEnumerable<MWWebPage.Models.Tags> remoteListAllTags(string _userId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;

            return RequestRemoteCall<IEnumerable<MWWebPage.Models.Tags>>("dispatch", "request", "ListTags",
                                                                p as EndPointParameters,
                                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                                MWRequests.loadUserTags_2);
        }

        public static Nullable<int> remoteGetTagNumber(string _userId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;

            return RequestRemoteCall<Nullable<int>>("dispatch", "request", "GetTagNumber",
                                            p as EndPointParameters,
                                            HttpContext.Current.Session["AccessToken"].ToString(),
                                            MWRequests.loadCount_2);
        }

        public static Nullable<int> remoteImportCount(int _itemId)
        {
            dynamic p = new EndPointParameters();
            p.itemId = _itemId;

            return RequestRemoteCall<Nullable<int>>("dispatch", "request", "ImportedCount",
                                            p as EndPointParameters,
                                            HttpContext.Current.Session["AccessToken"].ToString(),
                                            MWRequests.loadCount_2);
        }

        public static Nullable<int> remoteLikeCount(int _itemId)
        {
            dynamic p = new EndPointParameters();
            p.itemId = _itemId;

            return RequestRemoteCall<Nullable<int>>("dispatch", "request", "LikedCount", 
                                            p as EndPointParameters,
                                            HttpContext.Current.Session["AccessToken"].ToString(),
                                            MWRequests.loadCount_2);
        }

        public static Nullable<int> remoteDislikeCount(int _itemId)
        {
            dynamic p = new EndPointParameters();
            p.itemId = _itemId;

            return  RequestRemoteCall<Nullable<int>>("dispatch", "request", "DislikedCount",
                                            p as EndPointParameters,
                                            HttpContext.Current.Session["AccessToken"].ToString(),
                                            MWRequests.loadCount_2);
        }

        public static Nullable<int> remoteLikeAnItem(int _itemId)
        {
            dynamic p = new EndPointParameters();
            p.itemId = _itemId;

            return RequestRemoteCall<Nullable<int>>("dispatch", "request", "LikeAnItem",
                                           p as EndPointParameters,
                                           HttpContext.Current.Session["AccessToken"].ToString(),
                                           MWRequests.loadCount_2);
        }

        public static Nullable<int> remoteDislikeAnItem(int _itemId)
        {
            dynamic p = new EndPointParameters();
            p.itemId = _itemId;

            return RequestRemoteCall<Nullable<int>>("dispatch", "request", "DislikeAnItem",
                                                        p as EndPointParameters,
                                                        HttpContext.Current.Session["AccessToken"].ToString(),
                                                        MWRequests.loadCount_2);
        }

        private static Object loadCount_2(string result)
        {
            return int.Parse(XDocument.Parse(result).Descendants().FirstOrDefault().Value);
        }

        public static IEnumerable<MWWebPage.Models.ItemInfo> remoteListItemByTag(string userId, int tagId)
        {
            dynamic p = new EndPointParameters();
            p.userId = userId;
            p.tagId = tagId;

            return RequestRemoteCall<IEnumerable<MWWebPage.Models.ItemInfo>>("dispatch", "request", "ListItemByTag",
                                                                    p as EndPointParameters,
                                                                    HttpContext.Current.Session["AccessToken"].ToString(),
                                                                    MWRequests.loadUserItem_2);
        }

        private static Object loadUserItem_2(string result)
        {
            XDocument source = XDocument.Parse(result);

            var res = from item in source.Descendants(XName.Get("ItemInfo", source.Root.Name.NamespaceName))
                      select new MWWebPage.Models.ItemInfo
                      {
                          searchable_ItemId = int.Parse(item.Element(XName.Get("seaItemId", source.Root.Name.NamespaceName)).Value),
                          brand = item.Element(XName.Get("brand", source.Root.Name.NamespaceName)).Value,
                          category = item.Element(XName.Get("category", source.Root.Name.NamespaceName)).Value,
                          addedTime = item.Element(XName.Get("addedTime", source.Root.Name.NamespaceName)).Value,
                          from_url = item.Element(XName.Get("fromUrl", source.Root.Name.NamespaceName)).Value,
                          price = double.Parse(item.Element(XName.Get("price", source.Root.Name.NamespaceName)).Value),
                          default_pic = item.Element(XName.Get("itemPicUrl", source.Root.Name.NamespaceName)).Value,
                          title = item.Element(XName.Get("title", source.Root.Name.NamespaceName)).Value,
                          tagId = int.Parse(item.Element(XName.Get("tagId", source.Root.Name.NamespaceName)).Value),
                          LikeCount = int.Parse(item.Element(XName.Get("LikeCount", source.Root.Name.NamespaceName)).Value),
                      };
            return res;
        }

        public static IEnumerable<MWWebPage.Models.OutfitInfo> remoteListOutfitByTag(string _userId, int _tagId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;
            p.tagId = _tagId;

            return RequestRemoteCall<IEnumerable<MWWebPage.Models.OutfitInfo>>("dispatch", "request", "ListOutfitByTag",
                                                                        p as EndPointParameters,
                                                                        HttpContext.Current.Session["AccessToken"].ToString(),
                                                                        MWRequests.loadUserOutfits_2);
        }

        public static IEnumerable<MWWebPage.Models.ItemInfo> remoteListOutfitItemsByOutfitId(string _userId, int _outfitId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;
            p.outfitId = _outfitId;

            return RequestRemoteCall<IEnumerable<MWWebPage.Models.ItemInfo>>("dispatch", "request", "ListOutfitByTag",
                                                                    p as EndPointParameters,
                                                                    HttpContext.Current.Session["AccessToken"].ToString(),
                                                                    MWRequests.loadUserItem_2);
        }

        private static Object loadUserOutfits_2(string result)
        {
            XDocument source = XDocument.Parse(result);

            var res = from item in source.Descendants(XName.Get("OutfitInfo", source.Root.Name.NamespaceName))
                      select new MWWebPage.Models.OutfitInfo
                      {
                          outfitId = int.Parse(item.Element(XName.Get("outfitId", source.Root.Name.NamespaceName)).Value),
                          outfitName = item.Element(XName.Get("outfitName", source.Root.Name.NamespaceName)).Value,
                          outfitTime = item.Element(XName.Get("outfitTime", source.Root.Name.NamespaceName)).Value
                      };
            return res;
        }

        public static Nullable<Boolean> remoteSetCover(string _coverUrl, int _tagId)
        {
            dynamic p = new EndPointParameters();
            p.coverUrl = _coverUrl;
            p.tagId = _tagId;

            return RequestRemoteCall<Nullable<Boolean>>("dispatch", "request", "SetCover",
                                                p as EndPointParameters,
                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                MWRequests.loadBoolResult_2);
        }

        private static Object loadBoolResult_2(string result)
        {
            return Boolean.Parse(XDocument.Parse(result).Descendants().FirstOrDefault().Value);
        }

        public static Boolean loadBoolResult(string result)
        {
            var xDoc = new XmlDocument();
            xDoc.LoadXml(result);
            return Boolean.Parse(XDocument.Parse(xDoc.InnerText).Descendants().FirstOrDefault().Value);
        }

        public static IEnumerable<MWWebPage.Models.ItemInfo> remoteListAllUserItems(string _userId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;

            return RequestRemoteCall<IEnumerable<MWWebPage.Models.ItemInfo>>("dispatch", "request", "ListAllUserItems",
                                                                    p as EndPointParameters,
                                                                    HttpContext.Current.Session["AccessToken"].ToString(),
                                                                    MWRequests.loadUserItem_2);
        }

        public static IEnumerable<MWWebPage.Models.ItemInfo> remoteListAllUserOutfits(string _userId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;

            return RequestRemoteCall<IEnumerable<MWWebPage.Models.ItemInfo>>("dispatch", "request", "ListAllUserOutfits",
                                                                    p as EndPointParameters,
                                                                    HttpContext.Current.Session["AccessToken"].ToString(),
                                                                    MWRequests.loadUserOutfits_2);
        }

        public static Nullable<Boolean> remoteAddItem(string _userId, int _itemId, int _tagId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;
            p.itemId = _itemId;
            p.tagId = _tagId;
            
            return RequestRemoteCall<Nullable<Boolean>>("dispatch", "request", "AddItem",
                                                p as EndPointParameters,
                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                MWRequests.loadBoolResult_2);
        }

        public static Nullable<Boolean> remoteDelItem(string _userId, int _itemId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;
            p.itemId = _itemId;

            return RequestRemoteCall<Nullable<Boolean>>("dispatch", "request", "DelItem",
                                                p as EndPointParameters,
                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                MWRequests.loadBoolResult_2);
        }

        public static Nullable<Boolean> remoteDelOutfit(string _userId, int _outfitId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;
            p.outfitId = _outfitId;

            return RequestRemoteCall<Nullable<Boolean>>("dispatch", "request", "DelOutfit",
                                                p as EndPointParameters,
                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                MWRequests.loadBoolResult_2);
        }

        public static Nullable<Boolean> remoteEditOutfit(string _userId, int _outfitId)
        {
            dynamic p = new EndPointParameters();
            p.userId = _userId;
            p.outfitId = _outfitId;

            return RequestRemoteCall<Nullable<Boolean>>("dispatch", "request", "EditOutfit",
                                                p as EndPointParameters,
                                                HttpContext.Current.Session["AccessToken"].ToString(),
                                                MWRequests.loadBoolResult_2);
        }

        public static T RequestRemoteCall<T>(string server, string request, string methodname, EndPointParameters pramamters, string token, Func<string, Object> func = null)
        {
            using (var remoteCall = MWRemoteAPIFactory.Instance())
            {
                return (T) remoteCall.invokes(server, request,
                                    ParameterFactory.CreateRequestParamters(
                                    ParameterFactory.CreateAuthParamters( token,
                                    ParameterFactory.CreateMethodParamters(methodname, pramamters as EndPointParameters))),
                                    func);
            }
        }

        public static T RequestRemoteCall<T>(string server, string request, string methodname, string pramamters, string token, Func<string, Object> func = null)
        {
            using (var remoteCall = MWRemoteAPIFactory.Instance())
            {
                return (T)remoteCall.invokes(server, request,
                                    ParameterFactory.CreateRequestParamters(
                                    ParameterFactory.CreateAuthParamters(token,
                                    ParameterFactory.CreateMethodParamters(methodname, pramamters as string))),
                                    func);
            }
        }
        
    }
}