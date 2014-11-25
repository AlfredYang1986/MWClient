using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace MWWebPage.MWRequest
{
    [DataContract]
    public class MWAccessTokenResponse
    {
        [DataMember(Name = "access_token")]
        public string AccessToken { get; set; }
        [DataMember(Name = "expire_to")]
        public string ExpireTo { get; set; }
        [DataMember(Name = "client_id")]
        public string ClientId { get; set; }
        [DataMember(Name = "user_id")]
        public string UserId { get; set; }
        [DataMember(Name = "refresh_token")]
        public string RefreshToken { get; set; }
    }
}