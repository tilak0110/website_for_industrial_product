using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace IndustrialFeedback.Models
{
    public partial class Feedback
    {
        public int Idfeedback { get; set; }
        public string? Feedback1 { get; set; }
        public int? ProductId { get; set; }
        public int? Star { get; set; }
        public int? CustId { get; set; }
        [JsonIgnore]
        public virtual Customer? Cust { get; set; }
        [JsonIgnore]
        public virtual Product? Product { get; set; }
    }
}
