using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<RoomReservations> RoomReservationss { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Accommodation> Accommodations { get; set; }

        public User()
        {

        }

        public User(int id, string username, string email, string password)
        {
            this.Id = id;
            this.Username = username;
            this.Email = email;
            this.Password = password;
        }
    }
}