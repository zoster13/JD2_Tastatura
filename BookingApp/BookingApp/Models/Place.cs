using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Place
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Region Region { get; set; }
        public ICollection<Accommodation> Accommodations { get; set; }

        public Place()
        {

        }

        public Place(int id, string name, Region region)
        {
            this.Id = id;
            this.Name = name;
            this.Region = region;
        }
    }
}