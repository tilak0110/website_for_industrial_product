using System;
using System.Collections.Generic;

namespace IndustrialFeedback.Models
{
    public partial class Login
    {
        public Login()
        {
            Admins = new HashSet<Admin>();
            Customers = new HashSet<Customer>();
            Sellers = new HashSet<Seller>();
        }

        public int LoginId { get; set; }
        public string? Username { get; set; }
        public string Password { get; set; } = null!;
        public int? RoleId { get; set; }
        public int? Flag { get; set; }

        public virtual Role? Role { get; set; }
        public virtual ICollection<Admin> Admins { get; set; }
        public virtual ICollection<Customer> Customers { get; set; }
        public virtual ICollection<Seller> Sellers { get; set; }
    }
}
