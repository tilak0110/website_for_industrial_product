using System;
using System.Collections.Generic;

namespace IndustrialFeedback.Models
{
    public partial class Admin
    {
        public int Adminid { get; set; }
        public int? LoginId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Admincol { get; set; }

        public virtual Login? Login { get; set; }
    }
}
