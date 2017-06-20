using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class AppUser
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<RoomReservations> RoomReservationss { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Accommodation> Accommodations { get; set; }
        public bool IsBanned { get; set; }

        public AppUser()
        {
            this.FullName = string.Empty;
            this.Username = string.Empty;
            this.Email = string.Empty;
            this.Password = string.Empty;
            this.RoomReservationss = new List<RoomReservations>();
            this.Comments = new List<Comment>();
            this.Accommodations = new List<Accommodation>();
            this.IsBanned = false;
        }

        public AppUser(int id, string username, string email, string password)
        {
            this.Id = id;
            this.FullName = string.Empty;
            this.Username = username;
            this.Email = email;
            this.Password = password;
            this.RoomReservationss = new List<RoomReservations>();
            this.Comments = new List<Comment>();
            this.Accommodations = new List<Accommodation>();
            this.IsBanned = false;
        }
    }
}