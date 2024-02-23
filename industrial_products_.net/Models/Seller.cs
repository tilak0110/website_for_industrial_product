using System;
using System.Collections.Generic;

namespace IndustrialFeedback.Models
{
    public partial class Seller
    {
        public Seller()
        {
            Products = new HashSet<Product>();
        }

        public int SellerId { get; set; }
        public string FirstName { get; set; } = null!;
        public string BusinessName { get; set; } = null!;
        public int? LoginId { get; set; }
        public string? LastName { get; set; }
        public string? GstNo { get; set; }
        public string? Email { get; set; }
        public string? PhoneNo { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }

        public virtual Login? Login { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
