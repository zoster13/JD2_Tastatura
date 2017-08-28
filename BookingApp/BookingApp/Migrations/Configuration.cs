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

            //*******************************************************//

            //Countries
            Country country1 = new Country();
            country1.Name = "Serbia";
            country1.Code = 111;

            Country country2 = new Country();
            country2.Name = "Spain";
            country2.Code = 222;

            Country country3 = new Country();
            country3.Name = "Greece";
            country3.Code = 333;

            Country country4 = new Country();
            country4.Name = "Croatia";
            country4.Code = 444;

            Country country5 = new Country();
            country5.Name = "Malta";
            country5.Code = 555;

            Country country6 = new Country();
            country6.Name = "USA";
            country6.Code = 666;

            Country country7 = new Country();
            country7.Name = "Germany";
            country7.Code = 777;

            Country country8 = new Country();
            country8.Name = "Italy";
            country8.Code = 888;

            Country country9 = new Country();
            country9.Name = "Australia";
            country9.Code = 999;

            Country country10 = new Country();
            country10.Name = "Bosnia&Herzegovina";
            country10.Code = 1001;


            //Regions
            Region region1 = new Region();
            region1.Name = "Vojvodina";
            region1.Country = country1;

            Region region2 = new Region();
            region2.Name = "Katalonija";
            region2.Country = country2;

            Region region3 = new Region();
            region3.Name = "Atika";
            region3.Country = country3;

            Region region4 = new Region();
            region4.Name = "Pcinjski";
            region4.Country = country1;

            Region region5 = new Region();
            region5.Name = "Podrinje";
            region5.Country = country10;

            Region region6 = new Region();
            region6.Name = "Semberija";
            region6.Country = country10;

            //Places
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
            place5.Region = region3;

            Place place6 = new Place();
            place6.Name = "Zrenjanin";
            place6.Region = region1;

            Place place7 = new Place();
            place7.Name = "Subotica";
            place7.Region = region1;

            Place place8 = new Place();
            place8.Name = "Brcko";
            place8.Region = region6;

            Place place9 = new Place();
            place9.Name = "Bijeljina";
            place9.Region = region6;

            Place place10 = new Place();
            place10.Name = "Zvornik";
            place10.Region = region5;

            Place place11 = new Place();
            place11.Name = "Bratunac";
            place11.Region = region5;

            //AccommodationTypes
            AccommodationType accommType1 = new AccommodationType() { Name = "Hotel" };
            AccommodationType accommType2 = new AccommodationType() { Name = "Motel" };
            AccommodationType accommType3 = new AccommodationType() { Name = "Vila" };
            AccommodationType accommType4 = new AccommodationType() { Name = "Camp" };
            AccommodationType accommType5 = new AccommodationType() { Name = "Zimmer Rooms" };
            AccommodationType accommType6 = new AccommodationType() { Name = "Restoran" };
            AccommodationType accommType7 = new AccommodationType() { Name = "Etno Selo" };

            //Accommodations
            Accommodation accomm1 = new Accommodation(
                1,
                "Hotel Park",
                "Hotel sa 5 zvezdica. Vrhunski kvalitet usluge. Posetite nas!",
                "Novosadskog sajma 35",
                4.5,
                19.842954,
                45.242268,
                "Content/AccommodationPictures/acc1.jpg",    //imageuri
                false,
                place1,
                accommType1,
                context.AppUsers.Where(u => u.Email.Equals("appu@yahoo.com")).FirstOrDefault());

            Accommodation accomm2 = new Accommodation(
                2,
                "Hotel Fontana",
                "Hotel sa dugogodisnjom tradicijom. Preko 50 godina tradicije!",
                "Jugoslovenske Armije 11",
                3.8,
                19.84179,
                45.243134,
                "Content/AccommodationPictures/acc2.jpg",
                false,
                place2,
                accommType1,
                context.AppUsers.Where(u => u.Email.Equals("appu@yahoo.com")).FirstOrDefault());

            Accommodation accomm3 = new Accommodation(
                3,
                "Vila Elena",
                "Luksuzna vila sa 5 zvezdica!",
                "18, Heracleous St",
                4.8,
                19.842300,
                45.242101,
                "Content/AccommodationPictures/acc3.jpg",
                false,
                place5,
                accommType3,
                context.AppUsers.Where(u => u.Email.Equals("appu@yahoo.com")).FirstOrDefault());

            Accommodation accomm4 = new Accommodation(
                4,
                "Restoran Pet Jezera",
                "Vrhunska kuhinja. Dodjite i uvjerite se!",
                "Racanski Put br. 8",
                4.2,
                19.842144,
                45.242484,
                "Content/AccommodationPictures/acc4.jpg",
                false,
                place9,
                accommType6,
                context.AppUsers.Where(u => u.Email.Equals("appu@yahoo.com")).FirstOrDefault());

            Accommodation accomm5 = new Accommodation(
                5,
                "Etno Selo Stanisici",
                "Predivan amijent!",
                "Racanski Put br. 19",
                5.0,
                19.842141,
                45.242142,
                "Content/AccommodationPictures/acc5.jpg",
                false,
                place9,
                accommType7,
                context.AppUsers.Where(u => u.Email.Equals("marko@yahoo.com")).FirstOrDefault());

            Accommodation accomm6 = new Accommodation(
                7,
                "Etno Selo Suncana Reka",
                "Predivan amijent!",
                "Alekse Santica 7",
                3.5,
                19.842888,
                45.242112,
                "Content/AccommodationPictures/acc6.jpg",
                false,
                place10,
                accommType7,
                context.AppUsers.Where(u => u.Email.Equals("marko@yahoo.com")).FirstOrDefault());

            //Rooms
            Room room11 = new Room(11, 2, "Hotel Park: Soba 1", 60, accomm1);
            Room room12 = new Room(12, 3, "Hotel Park: Soba 2", 80, accomm1);
            Room room13 = new Room(13, 1, "Hotel Park: Soba 3", 35, accomm1);
            Room room14 = new Room(14, 2, "Hotel Park: Soba 4", 35, accomm1);
            Room room15 = new Room(15, 3, "Hotel Park: Soba 5", 35, accomm1);

            Room room21 = new Room(21, 2, "Hotel Fontana : Soba 1", 65, accomm2);
            Room room22 = new Room(22, 3, "Hotel Fontana : Soba 2", 120, accomm2);
            Room room23 = new Room(23, 3, "Hotel Fontana : Soba 3", 230, accomm2);
            Room room24 = new Room(24, 1, "Hotel Fontana : Soba 4", 30, accomm2);

            Room room31 = new Room(31, 2, "Vila Elena : Soba 1", 120, accomm3);
            Room room32 = new Room(32, 2, "Vila Elena : Soba 2", 240, accomm3);
            Room room33 = new Room(33, 3, "Vila Elena : Soba 3", 350, accomm3);
            Room room34 = new Room(34, 4, "Vila Elena : Soba 4", 580, accomm3);

            Room room51 = new Room(51, 2, "Etno Selo Stanisici : Soba 1", 60, accomm5);
            Room room52 = new Room(52, 3, "Etno Selo Stanisici : Soba 2", 80, accomm5);
            Room room53 = new Room(53, 1, "Etno Selo Stanisici : Soba 3", 35, accomm5);
            Room room54 = new Room(54, 2, "Etno Selo Stanisici : Soba 4", 35, accomm5);
            Room room55 = new Room(55, 3, "Etno Selo Stanisici : Soba 5", 35, accomm5);

            Room room61 = new Room(61, 2, "Etno Selo Suncana Reka : Soba 1", 60, accomm6);
            Room room62 = new Room(62, 3, "Etno Selo Suncana Reka : Soba 2", 85, accomm6);
            Room room63 = new Room(63, 1, "Etno Selo Suncana Reka : Soba 3", 35, accomm6);
            Room room64 = new Room(64, 2, "Etno Selo Suncana Reka : Soba 4", 35, accomm6);
            Room room65 = new Room(65, 3, "Etno Selo Suncana Reka : Soba 5", 79, accomm6);

            context.Rooms.AddOrUpdate(room11);
            context.Rooms.AddOrUpdate(room12);
            context.Rooms.AddOrUpdate(room13);
            context.Rooms.AddOrUpdate(room14);
            context.Rooms.AddOrUpdate(room15);

            context.Rooms.AddOrUpdate(room21);
            context.Rooms.AddOrUpdate(room22);
            context.Rooms.AddOrUpdate(room23);
            context.Rooms.AddOrUpdate(room24);

            context.Rooms.AddOrUpdate(room31);
            context.Rooms.AddOrUpdate(room32);
            context.Rooms.AddOrUpdate(room33);
            context.Rooms.AddOrUpdate(room34);

            context.Rooms.AddOrUpdate(room51);
            context.Rooms.AddOrUpdate(room52);
            context.Rooms.AddOrUpdate(room53);
            context.Rooms.AddOrUpdate(room54);
            context.Rooms.AddOrUpdate(room55);

            context.Rooms.AddOrUpdate(room61);
            context.Rooms.AddOrUpdate(room62);
            context.Rooms.AddOrUpdate(room63);
            context.Rooms.AddOrUpdate(room64);
            context.Rooms.AddOrUpdate(room65);

            context.SaveChanges();

            //RoomReservations
            RoomReservations res11 = new RoomReservations()
            {
                StartDate = new DateTime(2017, 1, 1),
                EndDate = new DateTime(2017, 1, 10),
                Timestamp = DateTime.Now,
                User = context.AppUsers.Where(u => u.Id == 1).FirstOrDefault(),
                Room = room11
            };

            RoomReservations res12 = new RoomReservations()
            {
                StartDate = new DateTime(2017, 5, 1),
                EndDate = new DateTime(2017, 5, 10),
                Timestamp = DateTime.Now,
                User = context.AppUsers.Where(u => u.Id == 1).FirstOrDefault(),
                Room = room11
            };

            RoomReservations res21 = new RoomReservations()
            {
                StartDate = new DateTime(2017, 11, 1),
                EndDate = new DateTime(2017, 11, 10),
                Timestamp = DateTime.Now,
                User = context.AppUsers.Where(u => u.Id == 1).FirstOrDefault(),
                Room = room21
            };

            RoomReservations res22 = new RoomReservations()
            {
                StartDate = new DateTime(2017, 11, 1),
                EndDate = new DateTime(2017, 11, 10),
                Timestamp = DateTime.Now,
                User = context.AppUsers.Where(u => u.Id == 1).FirstOrDefault(),
                Room = room22
            };

            RoomReservations res23 = new RoomReservations()
            {
                StartDate = new DateTime(2017, 3, 1),
                EndDate = new DateTime(2017, 3, 10),
                Timestamp = DateTime.Now,
                User = context.AppUsers.Where(u => u.Id == 1).FirstOrDefault(),
                Room = room23
            };

            context.RoomReservationss.AddOrUpdate(res11);
            context.RoomReservationss.AddOrUpdate(res12);
            context.RoomReservationss.AddOrUpdate(res21);
            context.RoomReservationss.AddOrUpdate(res22);
            context.RoomReservationss.AddOrUpdate(res23);

            context.SaveChanges();

            //Comments
            Comment comm11 = new Comment()
            {
                Text = "Prezadovoljan sam smjestajem! Preporucio bih svakome! :)",
                Grade = 5,
                Accommodation = accomm1,
                User = context.AppUsers.Where(u => u.Id == 3).FirstOrDefault()
            };

            Comment comm12 = new Comment()
            {
                Text = "Zadovoljna sam. Higijena je na vrhunskom nivou! Sve pohvale. :D",
                Grade = 4,
                Accommodation = accomm1,
                User = context.AppUsers.Where(u => u.Id == 5).FirstOrDefault()
            };

            Comment comm13 = new Comment()
            {
                Text = "Ima i boljih za te pare",
                Grade = 3,
                Accommodation = accomm1,
                User = context.AppUsers.Where(u => u.Id == 6).FirstOrDefault()
            };

            Comment comm21 = new Comment()
            {
                Text = "Prezadovoljan sam smjestajem",
                Grade = 4,
                Accommodation = accomm2,
                User = context.AppUsers.Where(u => u.Id == 3).FirstOrDefault()
            };

            Comment comm22 = new Comment()
            {
                Text = "Osoblje veoma nekulturno!",
                Grade = 2,
                Accommodation = accomm2,
                User = context.AppUsers.Where(u => u.Id == 5).FirstOrDefault()
            };

            Comment comm23 = new Comment()
            {
                Text = "Preskupa hrana!!!",
                Grade = 3,
                Accommodation = accomm2,
                User = context.AppUsers.Where(u => u.Id == 6).FirstOrDefault()
            };


            context.Comments.Add(comm11);
            context.Comments.Add(comm12);
            context.Comments.Add(comm13);

            context.Comments.Add(comm21);
            context.Comments.Add(comm22);
            context.Comments.Add(comm23);

            context.SaveChanges();
        }
    }
}
