using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace MWRequest
{
    [DataContract]
    public class Apparel
    {
        private int nID;
        private string strBrand;
        private string strColor;
       // private string strSize; 
        private List<string> l_size = new List<string>();
        private string strSizeType;
        private string strGender;
        private Double nPrice;
        private string strImageUrl;
        private string strTitle;
        private string category;
        private float discountPrice;
        private string itemUrl;

        [DataMember]
        public string Category
        {
            get { return category; }
            set { category = value; }
        }

        [DataMember]
        public float DiscountPrice
        {
            get { return discountPrice; }
            set { discountPrice = value; }
        }

        [DataMember]
        public string ItemUrl
        {
            get { return itemUrl; }
            set { itemUrl = value; }
        }

        [DataMember]
        public string Brand
        {
            get { return strBrand; }
            set { strBrand = value; }
        }

        [DataMember]
        public string Color
        {
            get { return strColor; }
            set { strColor = value; }
        }

        [DataMember]
        public List<string> Size
        {
            get { return l_size; }
            set { l_size = value; }
        }

        [DataMember]
        public string Gender
        {
            get { return strGender; }
            set { strGender = value; }
        }

        [DataMember]
        public int ItemID 
        {
            get { return nID; }
            set { nID = value; }
        }

        [DataMember]
        public string SizeType
        {
            get { return strSizeType; }
            set { strSizeType = value; }
        }

        [DataMember]
        public Double Price
        {
            get { return nPrice; }
            set { nPrice = value; }
        }

        [DataMember]
        public string ImamgeUrl
        {
            get { return strImageUrl; }
            set { strImageUrl = value; }
        }

        [DataMember]
        public string Title
        {
            get { return strTitle; }
            set { strTitle = value; }
        }

        public override string ToString()
        {
            return "Brand: " + strBrand +
                "\nColor: " + strColor +
                "\nSource: " + strImageUrl +
                "\nTitle: " + strTitle + "\n";
        }
    }

    [DataContract]
    public class ClothDetail
    {
        private Double  upper_Price;
        private Double  lower_Price;
        private string strDescribtion;

        private Apparel c;

        [DataMember]
        public Apparel Cloth 
        {
            get { return c; }
            set { c = value; }
        }

        [DataMember]
        public Double UpperPrice
        {
            get { return upper_Price; }
            set { upper_Price = value; }
        }

        [DataMember]
        public Double LowerPrice
        {
            get { return lower_Price; }
            set { lower_Price = value; }
        }
        
        [DataMember]
        public string Description
        {
            get { return strDescribtion; }
            set { strDescribtion = value; }
        }
    } 

    [DataContract]
    public class TagData
    {
        private string strTag;

        public string Tag
        {
            get { return strTag; }
            set { strTag = value;}
        }
    }

    [DataContract]
    public class SearchingArgs
    {
        [DataMember]
        public Dictionary<string, IList<string>> args { get; set; }
    }

	[DataContract]
    public class MWSearchingwithPrice
    {
        [DataMember]
        public MWPrice price { get; set; }
        [DataMember]
        public string Query { get; set; }
    }
	
	[DataContract]
   public class MWPrice
    {
        [DataMember]
        public int maxPrice { get; set; }
        [DataMember]
        public int minPrice { get; set; }
    }
	
    [DataContract]
    public class Item
    {
        [DataMember]
        public string ItemId { get; set; }
        [DataMember]
        public string Xposition { get; set; }
        [DataMember]
        public string Yposition { get; set; }
        [DataMember]
        public string Top { get; set; }
        [DataMember]
        public string Left { get; set; }
        [DataMember]
        public string Width { get; set; }
        [DataMember]
        public string Height { get; set; }
    }

    [DataContract]
    public class MWAcceptRequestJSON
    {
        [DataMember]
        public string ID { get; set; }
        [DataMember]
        public string UserId { get; set; }
        [DataMember]
        public List<Item> Items;
    }

    [DataContract]
    public class MWShareRequestJSON
    {
        [DataMember]
        public string UserId;
        [DataMember]
        public string FriendId;
        [DataMember]
        public List<Item> Items;
    }
    [DataContract]
    public class MWSPEnvironmentJSON
    {
        [DataMember]
        public string UserId { get; set; }
        [DataMember]
        public List<Item> Items;
    }
	
	[DataContract]
    public class TagServiceData
    {
        [DataMember]
        public string userId { get; set; }

        [DataMember]
        public int tagId { get; set; }

        [DataMember]
        public string tagName { get; set; }

        [DataMember]
        public string tagType { get; set; }

        [DataMember]
        public int itemId { get; set; }

        [DataMember]
        public int outfitId { get; set; }

        [DataMember]
        public int picId { get; set; }

        [DataMember]
        public System.DateTime timeAdded { get; set; }
    }

    [DataContract]
    public class AbsItem
    {
        [DataMember]
        public int absItemId { get; set; }

        [DataMember]
        public string material { get; set; }
        [DataMember]
        public string gender { get; set; }

        [DataMember]
        public Nullable<int> brandId { get; set; }

        [DataMember]
        public Nullable<int> tagId { get; set; }

        [DataMember]
        public Nullable<float> upperPrice { get; set; }

        [DataMember]
        public Nullable<float> lowerPrice { get; set; }
    }

    [DataContract]
    public class SeaItem
    {
        [DataMember]
        public int absItemId { get; set; }

        [DataMember]    
        public int colourId { get; set; }

        [DataMember]
        public float price { get; set; }

        [DataMember]
        public Nullable<float> discount { get; set; }

        [DataMember]
        public string fromUrl { get; set; }

        [DataMember]
        public int seaItemId { get; set; }

        [DataMember]
        public string title { get; set; }

        [DataMember]
        public int sourceId { get; set; }

        [DataMember]
        public Nullable<int> defaultPic { get; set; }

    }

    [DataContract]
    public class ItemInfo
    {
        [DataMember]
        public AbsItem absItem { get; set; }

        [DataMember]
        public IList<SeaItem> seaItems { get; set; }
    }

    [DataContract]
    public class OutfitInfo
    {
        [DataMember]
        public int outfitId { get; set; }
        [DataMember]
        public string outfitName { get; set; }
        [DataMember]
        public byte[] outfitPic { get; set; }
    }

    [DataContract]
    public class MyWardrobeData
    {
        [DataMember]
        public string UserId { get; set; }

        [DataMember]
        public int OutfitId { get; set; }

        [DataMember]
        public string OutfitName { get; set; }

        [DataMember]
        public List<OutfitItem> OutfitItems { get; set; }

        [DataMember]
        public int ItemId { get; set; }
    }

    [DataContract]
    public class OutfitItem
    {
        [DataMember]
        public int outfitId { get; set; }

        [DataMember]
        public int seaId { get; set; }

        [DataMember]
        public Nullable<int> picId { get; set; }

        [DataMember]
        public int picX { get; set; }

        [DataMember]
        public int picY { get; set; }

        [DataMember]
        public Nullable<float> angle { get; set; }

        [DataMember]
        public int cropX { get; set; }

        [DataMember]
        public int cropY { get; set; }

        [DataMember]
        public Nullable<float> cropWidth { get; set; }
        [DataMember]
        public Nullable<float> cropHeight { get; set; }

        [DataMember]
        public float sizingFactor { get; set; }

        [DataMember]
        public int zIndex { get; set; }

    }

    [DataContract]
    public class UserProfileInfo
    {
        [DataMember]
        public string userID { get; set; }

        [DataMember]
        public bool enSSNLogin { get; set; }

        [DataMember]
        public string email { get; set; }

        //[DataMember]
        //public Nullable<System.DateTime> birthday { get; set; }
        public Nullable<System.DateTime> birthday { get {return DateTime.Parse(DateTimeStr); } }
        [DataMember]
        public string DateTimeStr { get; set; }

        [DataMember]
        public string gender { get; set; }

        [DataMember]
        public string name { get; set; }

        [DataMember]
        public Nullable<int> credit { get; set; }

        [DataMember]
        public Nullable<int> experience { get; set; }

        [DataMember]
        public string occupation { get; set; }

        [DataMember]
        public string nationality { get; set; }

        [DataMember]
        public string location { get; set; }

        [DataMember]
        public Nullable<int> profile_picture { get; set; }
    }

    public class FacebookMapper
    {
        public string uId { get; set; }
        public string fbToken { get; set; }
    }
    [DataContract]
    public class ChangePassRequest
    {
        [DataMember]
        public string Token { get; set; }
        [DataMember]
        public string Password { get; set; }
    }

    [DataContract]
    public class AuthUserInfo
    {
        [DataMember]
        public string Token { get; set; }
        [DataMember]
        public string client_id { get; set; }
        [DataMember]
        public string password { get; set; }
        [DataMember]
        public bool enableSSNLogin { get; set; }
        [DataMember]
        public string email { get; set; }
        //[DataMember]
        //public Nullable<System.DateTime> birthday { get { return DateTime.Parse(DateTimeStr); } }
        [DataMember]
        public string DateTimeStr { get; set; }
        [DataMember]
        public string gender { get; set; }
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public Nullable<int> credit { get; set; }
        [DataMember]
        public Nullable<int> experience { get; set; }
        [DataMember]
        public string occupation { get; set; }
        [DataMember]
        public string nationality { get; set; }
        [DataMember]
        public string location { get; set; }
        [DataMember]
        public Nullable<int> profile_picture { get; set; }
    }
}
