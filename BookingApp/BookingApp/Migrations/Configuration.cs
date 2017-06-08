namespace BookingApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using System;
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

            Country country1 = new Country();
            country1.Name = "Srbija";
            country1.Code = 123;

            Country country2 = new Country();
            country2.Name = "Spanija";
            country2.Code = 456;

            Country country3 = new Country();
            country3.Name = "Grcka";
            country3.Code = 789;

            context.Countries.Add(country1);
            context.Countries.Add(country2);
            context.Countries.Add(country3);

            context.SaveChanges();

            country1 = context.Countries.Where(c => c.Name == "Srbija").FirstOrDefault();
            country2 = context.Countries.Where(c => c.Name == "Spanija").FirstOrDefault();
            country3 = context.Countries.Where(c => c.Name == "Grcka").FirstOrDefault();

            Region region1 = new Region();
            region1.Name = "Vojvodina";
            region1.Country = country1;

            Region region2 = new Region();
            region2.Name = "Katalonija";
            region2.Country = country2;

            Region region3 = new Region();
            region3.Name = "Makedonija";
            region3.Country = country3;

            Region region4 = new Region();
            region4.Name = "Atika";
            region4.Country = country3;

            context.Regions.Add(region1);
            context.Regions.Add(region2);
            context.Regions.Add(region3);
            context.Regions.Add(region4);

            context.SaveChanges();

            region1 = context.Regions.Where(c => c.Name == "Vojvodina").Include("Country").FirstOrDefault();
            region2 = context.Regions.Where(c => c.Name == "Katalonija").Include("Country").FirstOrDefault();
            region3 = context.Regions.Where(c => c.Name == "Makedonija").Include("Country").FirstOrDefault();
            region4 = context.Regions.Where(c => c.Name == "Atika").Include("Country").FirstOrDefault();

            Place place1 = new Place();
            place1.Name = "Novi Sad";
            place1.Region = region1;

            Place place2 = new Place();
            place2.Name = "Backa Palanka";
            place2.Region = region1;

            Place place3 = new Place();
            place3.Name = "Barselona";
            place3.Region = region2;

            Place place4 = new Place();
            place4.Name = "Solun";
            place4.Region = region3;

            Place place5 = new Place();
            place5.Name = "Atina";
            place5.Region = region4;

            context.Places.AddOrUpdate(place1);
            context.Places.AddOrUpdate(place2);
            context.Places.AddOrUpdate(place3);
            context.Places.AddOrUpdate(place4);
            context.Places.AddOrUpdate(place5);

            context.SaveChanges();

            AccommodationType accommType1 = new AccommodationType() { Name = "Hotel" };
            AccommodationType accommType2 = new AccommodationType() { Name = "Motel" };
            AccommodationType accommType3 = new AccommodationType() { Name = "Vila" };
            AccommodationType accommType4 = new AccommodationType() { Name = "Kamp" };
            context.AccommodationTypes.AddOrUpdate(accommType1);
            context.AccommodationTypes.AddOrUpdate(accommType2);
            context.AccommodationTypes.AddOrUpdate(accommType3);
            context.AccommodationTypes.AddOrUpdate(accommType4);

            place1 = context.Places.Where(c => c.Name == "Novi Sad").FirstOrDefault();
            place1.Region = region1;
            place2 = context.Places.Where(c => c.Name == "Backa Palanka").FirstOrDefault();
            place2.Region = region1;
            place3 = context.Places.Where(c => c.Name == "Barselona").FirstOrDefault();
            place3.Region = region2;
            place4 = context.Places.Where(c => c.Name == "Solun").FirstOrDefault();
            place4.Region = region3;
            place5 = context.Places.Where(c => c.Name == "Atina").FirstOrDefault();
            place5.Region = region4;

            Accommodation accomm1 = new Accommodation("Hotel Park", "Hotel sa 5 zvezdica.", "Novosadskog sajma 35", 4.4, 0.0, 0.0, "nepoznato", false, place1, accommType1, new AppUser());
            Accommodation accomm2 = new Accommodation("Fontana", "Opis...", "Jugoslovenske Armije 11", 4.3, 0.0, 0.0, "nepoznato", false, place2, accommType1, new AppUser());
            Accommodation accomm3 = new Accommodation("Vila Elena", "Opis...", "18, Heracleous St", 4.7, 0.0, 0.0, "nepoznato", false, place5, accommType3, new AppUser());
            context.Accommodations.AddOrUpdate(accomm1);
            context.Accommodations.AddOrUpdate(accomm2);
            context.Accommodations.AddOrUpdate(accomm3);

            context.SaveChanges();

            accomm1 = context.Accommodations.Where(c => c.Name == "Hotel Park").FirstOrDefault();
            accomm1.Place = place1;
            accomm2 = context.Accommodations.Where(c => c.Name == "Fontana").FirstOrDefault();
            accomm1.Place = place2;
            accomm3 = context.Accommodations.Where(c => c.Name == "Vila Elena").FirstOrDefault();
            accomm1.Place = place5;

            Room room1 = new Room(1, 2, "opis...", 60, accomm1);
            Room room2 = new Room(2, 3, "opis...", 80, accomm1);
            Room room3 = new Room(3, 1, "opis...", 35, accomm1);
            Room room4 = new Room(1, 2, "opis...", 20, accomm2);
            Room room5 = new Room(2, 2, "opis...", 35, accomm2);
            Room room6 = new Room(3, 3, "opis...", 50, accomm2);
            Room room7 = new Room(1, 1, "opis...", 100, accomm3);
            Room room8 = new Room(2, 2, "opis...", 260, accomm3);
            Room room9 = new Room(3, 3, "opis...", 180, accomm3);
            Room room10 = new Room(4, 1, "opis...", 200, accomm3);

            context.Rooms.AddOrUpdate(room1);
            context.Rooms.AddOrUpdate(room2);
            context.Rooms.AddOrUpdate(room3);
            context.Rooms.AddOrUpdate(room4);
            context.Rooms.AddOrUpdate(room5);
            context.Rooms.AddOrUpdate(room6);
            context.Rooms.AddOrUpdate(room7);
            context.Rooms.AddOrUpdate(room8);
            context.Rooms.AddOrUpdate(room9);
            context.Rooms.AddOrUpdate(room10);

            context.SaveChanges();
        }
    }
}
