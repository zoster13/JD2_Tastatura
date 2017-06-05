using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class RoomReservations
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime Timestamp { get; set; }
        public ICollection<Room> Rooms { get; set; }
        public ICollection<User> Users { get; set; }

        public RoomReservations()
        {

        }

        public RoomReservations(DateTime startDate, DateTime endDate, DateTime timestamp)
        {
            this.StartDate = startDate;
            this.EndDate = endDate;
            this.Timestamp = timestamp;
        }
    }
}