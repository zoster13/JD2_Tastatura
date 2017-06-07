using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class RoomReservations
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime Timestamp { get; set; }
        [Required]
        public Room Room { get; set; }
        [Required]
        public AppUser User { get; set; }

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