using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.AccessControl;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;

namespace BookingApp.Models
{
    public class BAContext: IdentityDbContext<BAIdentityUser>
    {   
        public virtual DbSet<AppUser> AppUsers { get; set; }

        public BAContext() : base("name=JD2_Tastatura")
        {            
        }

        public static BAContext Create()
        {
            return new BAContext();
        }
    }
}