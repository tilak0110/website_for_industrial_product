using System;
using System.Collections.Generic;

namespace IndustrialFeedback.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Carts = new HashSet<Cart>();
            Feedbacks = new HashSet<Feedback>();
            Orders = new HashSet<Order>();
        }

        public int CustomerId { get; set; }
        public string FirstName { get; set; } = null!;
        public int? LoginId { get; set; }
        public string Address { get; set; } = null!;
        public string? PhoneNo { get; set; }
        public string? Email { get; set; }
        public string? LastName { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }

        public virtual Login? Login { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
