using System;
using System.Collections.Generic;

namespace IndustrialFeedback.Models
{
    public partial class OrderItem
    {
        public int Orderitemid { get; set; }
        public int? Orderid { get; set; }
        public int? Pid { get; set; }

        public virtual Order? Order { get; set; }
        public virtual Product? PidNavigation { get; set; }
    }
}
