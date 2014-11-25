using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace MWRequest
{

    public class AuthorizationCheck
    {
        public string Token { get; set; }
        public MWRequestPhraseJSON RequestString { get; set; }
    }

    public class MWRequestPhraseJSON
    {
        public string MessageName { get; set; }
        public string Parameters;
    }
}
