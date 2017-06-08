using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Country
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Code { get; set; }
        public ICollection<Region> Regions { get; set; }

        public Country()
        {
            this.Name = string.Empty;
            this.Regions = new List<Region>();
        }

        public Country(int id, string name, int code)
        {
            this.Id = id;
            this.Name = name;
            this.Code = code;
            this.Regions = new List<Region>();
        }
    }
}