using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Region
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Country Country { get; set; }
        public ICollection<Place> Places { get; set; }

        public Region()
        {

        }

        public Region(int id, string name, Country country)
        {
            this.Id = id;
            this.Name = name;
            this.Country = country;
        }
    }
}