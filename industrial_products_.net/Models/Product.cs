using System;
using System.Collections.Generic;

namespace IndustrialFeedback.Models
{
    public partial class Product
    {
        public Product()
        {
            Carts = new HashSet<Cart>();
            Feedbacks = new HashSet<Feedback>();
            OrderItems = new HashSet<OrderItem>();
        }

        public int Productid { get; set; }
        public string? Productname { get; set; }
        public int? Sid { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string? Description { get; set; }
        public int? Categoryid { get; set; }

        public virtual Category? Category { get; set; }
        public virtual Seller? SidNavigation { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
