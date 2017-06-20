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
                  new AppUser() { FullName = "Menadzer Menadzerovic", Email = "m0@yahoo.com", Password = "m0", Username = "m0" }
            );
            context.AppUsers.AddOrUpdate(
                  p => p.FullName,
                  new AppUser() { FullName = "Stefan Stevic", Email = "m1@yahoo.com", Password = "m1", Username = "m1" }
            );
            context.AppUsers.AddOrUpdate(
                  p => p.FullName,
                  new AppUser() { FullName = "Mirko Mirkovic", Email = "m2@yahoo.com", Password = "m2", Username = "m2" }
            );

            context.AppUsers.AddOrUpdate(
                p => p.FullName,
                new AppUser() { FullName = "AppUser AppUserovic", Email = "appu@yahoo.com", Password = "appu", Username = "appu" }
            );
            context.AppUsers.AddOrUpdate(
                p => p.FullName,
                new AppUser() { FullName = "Marko Markovic", Email = "marko@yahoo.com", Password = "marko", Username = "marko" }
            );
            context.AppUsers.AddOrUpdate(
                p => p.FullName,
                new AppUser() { FullName = "Laza Lazic", Email = "laza@yahoo.com", Password = "laza", Username = "laza" }
            );


            context.SaveChanges();

            //Admins
            var userStore = new UserStore<BAIdentityUser>(context);
            var userManager = new UserManager<BAIdentityUser>(userStore);
            if (!context.Users.Any(u => u.UserName == "admin"))
            {
                var _appUser = context.AppUsers.FirstOrDefault(a => a.Email == "admin@yahoo.com");
                var user = new BAIdentityUser() { Id = "admin", UserName = "admin", Email = "admin@yahoo.com", PasswordHash = BAIdentityUser.HashPassword("admin"), AppUserId = _appUser.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }

            //Menadzeri
            if (!context.Users.Any(u => u.UserName == "m0"))
            {
                var _appUser = context.AppUsers.FirstOrDefault(a => a.Email == "m0@yahoo.com");
                var user = new BAIdentityUser() { Id = _appUser.Username, UserName = _appUser.Username, Email = _appUser.Email, PasswordHash = BAIdentityUser.HashPassword(_appUser.Password), AppUserId = _appUser.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Manager");
            }
            if (!context.Users.Any(u => u.UserName == "m1"))
            {
                var _appUser = context.AppUsers.FirstOrDefault(a => a.Email == "m1@yahoo.com");
                var user = new BAIdentityUser() { Id = _appUser.Username, UserName = _appUser.Username, Email = _appUser.Email, PasswordHash = BAIdentityUser.HashPassword(_appUser.Password), AppUserId = _appUser.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Manager");
            }

            if (!context.Users.Any(u => u.UserName == "m2"))
            {
                var _appUser = context.AppUsers.FirstOrDefault(a => a.Email == "m2@yahoo.com");
                var user = new BAIdentityUser() { Id = _appUser.Username, UserName = _appUser.Username, Email = _appUser.Email, PasswordHash = BAIdentityUser.HashPassword(_appUser.Password), AppUserId = _appUser.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Manager");
            }

            //AppUsers
            if (!context.Users.Any(u => u.UserName == "appu"))
            {
                var _appUser = context.AppUsers.FirstOrDefault(a => a.Email == "appu@yahoo.com");
                var user = new BAIdentityUser() { Id = _appUser.Username, UserName = _appUser.Username, Email = _appUser.Email, PasswordHash = BAIdentityUser.HashPassword(_appUser.Password), AppUserId = _appUser.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }
            if (!context.Users.Any(u => u.UserName == "marko"))
            {
                var _appUser = context.AppUsers.FirstOrDefault(a => a.Email == "marko@yahoo.com");
                var user = new BAIdentityUser() { Id = _appUser.Username, UserName = _appUser.Username, Email = _appUser.Email, PasswordHash = BAIdentityUser.HashPassword(_appUser.Password), AppUserId = _appUser.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }
            if (!context.Users.Any(u => u.UserName == "laza"))
            {
                var _appUser = context.AppUsers.FirstOrDefault(a => a.Email == "laza@yahoo.com");
                var user = new BAIdentityUser() { Id = _appUser.Username, UserName = _appUser.Username, Email = _appUser.Email, PasswordHash = BAIdentityUser.HashPassword(_appUser.Password), AppUserId = _appUser.Id };
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

            //*******************************************************

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

            //********************************************************

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

            //*********************************************************************************

            AccommodationType accommType1 = new AccommodationType() { Name = "Hotel" };
            AccommodationType accommType2 = new AccommodationType() { Name = "Motel" };
            AccommodationType accommType3 = new AccommodationType() { Name = "Vila" };
            AccommodationType accommType4 = new AccommodationType() { Name = "Kamp" };

            //****************************************************************************************

            Accommodation accomm1 = new Accommodation(1, "Hotel Park", "Hotel sa 5 zvezdica.", "Novosadskog sajma 35", 4.4, 0.0, 0.0, "nepoznato", false, place1, accommType1, context.AppUsers.Where(u => u.Id == 1).FirstOrDefault());
            Accommodation accomm2 = new Accommodation(2, "Fontana", "Opis...", "Jugoslovenske Armije 11", 4.3, 0.0, 0.0, "nepoznato", false, place2, accommType1, context.AppUsers.Where(u => u.Id == 1).FirstOrDefault());
            Accommodation accomm3 = new Accommodation(3, "Vila Elena", "Opis...", "18, Heracleous St", 4.7, 0.0, 0.0, "nepoznato", false, place5, accommType3, context.AppUsers.Where(u => u.Id == 1).FirstOrDefault());

            //******************************************************************************************************************

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
