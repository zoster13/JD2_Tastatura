namespace BookingApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
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
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            //Roles
            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "Manager"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Manager" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "AppUser"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "AppUser" };

                manager.Create(role);
            }

            //Users
            context.AppUsers.AddOrUpdate(
                  p => p.FullName,
                  new AppUser() { FullName = "Admin Adminovic", Email = "admin@yahoo.com", Password = "admin", Username = "admin" }
            );
            context.AppUsers.AddOrUpdate(
                  p => p.FullName,
                  new AppUser() { FullName = "Menadzer Menadzerovic", Email = "menadzer@yahoo.com", Password = "menadzer", Username = "meanadzer" }
            );
            context.AppUsers.AddOrUpdate(
                p => p.FullName,
                new AppUser() { FullName = "AppUser AppUserovic", Email = "appu@yahoo.com", Password = "appu", Username = "appu" }
            );
            context.SaveChanges();

            //Dodjeljivanje rola
            //[Authorize(Roles="Admin")]
            var userStore = new UserStore<BAIdentityUser>(context);
            var userManager = new UserManager<BAIdentityUser>(userStore);
            if (!context.Users.Any(u => u.UserName == "admin"))
            {
                var _appUser = context.AppUsers.FirstOrDefault(a => a.Email == "admin@yahoo.com");
                var user = new BAIdentityUser() { Id = "admin", UserName = "admin", Email = "admin@yahoo.com", PasswordHash = BAIdentityUser.HashPassword("admin"), AppUserId = _appUser.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }
            if (!context.Users.Any(u => u.UserName == "meanadzer"))
            {
                var _appUser = context.AppUsers.FirstOrDefault(a => a.Email == "menadzer@yahoo.com");
                var user = new BAIdentityUser() { Id = "meanadzer", UserName = "meanadzer", Email = "meanadzer@yahoo.com", PasswordHash = BAIdentityUser.HashPassword("meanadzer"), AppUserId = _appUser.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Manager");
            }
            if (!context.Users.Any(u => u.UserName == "appu"))
            {
                var _appUser = context.AppUsers.FirstOrDefault(a => a.Email == "appu@yahoo.com");
                var user = new BAIdentityUser() { Id = "appu", UserName = "appu", Email = "appu@yahoo.com", PasswordHash = BAIdentityUser.HashPassword("appu"), AppUserId = _appUser.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }

            context.SaveChanges();


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
