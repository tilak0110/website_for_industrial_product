using System;
using System.Collections.Generic;

namespace IndustrialFeedback.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderItems = new HashSet<OrderItem>();
        }

        public int Orderid { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Paymentmode { get; set; }
        public int? Price { get; set; }
        public string? State { get; set; }
        public int? CustomerId { get; set; }

        public virtual Customer? Customer { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
