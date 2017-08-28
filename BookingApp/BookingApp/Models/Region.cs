using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Region
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public Country Country { get; set; }
        //public ICollection<Place> Places { get; set; }

        public Region()
        {
            this.Name = string.Empty;
            this.Country = new Country();
            //this.Places = new List<Place>();
        }

        public Region(int id, string name, Country country)
        {
            this.Id = id;
            this.Name = name;
            this.Country = country;
            //this.Places = new List<Place>();
        }
    }
}