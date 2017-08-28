using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class AccommodationType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public ICollection<Accommodation> Accommodations { get; set; }

        public AccommodationType()
        {
            this.Name = string.Empty;
            //this.Accommodations = new List<Accommodation>();
        }

        public AccommodationType(int id, string name)
        {
            this.Id = id;
            this.Name = name;
            //this.Accommodations = new List<Accommodation>();
        }
    }
}