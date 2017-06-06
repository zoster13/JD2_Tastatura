namespace BookingApp.Migrations
{
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<BookingApp.Models.BAContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BookingApp.Models.BAContext context)
        {
            Region region = new Region();
            region.Name = "Vojvodina";
            region.Places = new List<Place>();
           
            Place place = new Place();
            place.Name = "Novi Sad";
            place.Region = region;
            place.Accommodations = new List<Accommodation>();
            region.Places.Add(place);

            Place place2 = new Place();
            place2.Name = "Backa Palanka";
            place2.Region = region;
            place2.Accommodations = new List<Accommodation>();
            region.Places.Add(place2);

            Country country = new Country();
            country.Name = "Srbija";
            country.Code = 123;
            country.Regions = new List<Region>() { region };
            region.Country = country;
            
            context.Countries.Add(country);
        }
    }
}
