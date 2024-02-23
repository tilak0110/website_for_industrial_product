using System;
using System.Collections.Generic;

namespace IndustrialFeedback.Models
{
    public partial class Cart
    {
        public int Orderid { get; set; }
        public int? Quantity { get; set; }
        public int? CustomerId { get; set; }
        public int? Productid { get; set; }

        public virtual Customer? Customer { get; set; }
        public virtual Product? Product { get; set; }
    }
}
