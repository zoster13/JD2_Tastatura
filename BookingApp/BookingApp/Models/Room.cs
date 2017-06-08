using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Room
    {
        public int Id { get; set; }
        public int RoomNumber { get; set; }
        public int BedCount { get; set; }
        public string Description { get; set; }
        public double PricePerNight { get; set; }
        [Required]
        public Accommodation Accommodation { get; set; }
        public ICollection<RoomReservations> RoomReservationss { get; set; }

        public Room()
        {
            this.Description = string.Empty;
            this.Accommodation = new Accommodation();
            this.RoomReservationss = new List<RoomReservations>();
        }

        public Room(int roomNumber, int bedCount, string description, double pricePerNight, Accommodation accommodation)
        {
            this.RoomNumber = roomNumber;
            this.BedCount = bedCount;
            this.Description = description;
            this.PricePerNight = pricePerNight;
            this.Accommodation = accommodation;
            this.Accommodation = new Accommodation();
            this.RoomReservationss = new List<RoomReservations>();
        }
    }
}