using System;
using System.Collections.Generic;
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
        public Accommodation Accommodation { get; set; }
        public ICollection<RoomReservations> RoomReservationss { get; set; }

        public Room()
        {

        }

        public Room(int id, int roomNumber, int bedCount, string description, double pricePerNight, Accommodation accommodation)
        {
            this.Id = id;
            this.RoomNumber = roomNumber;
            this.BedCount = bedCount;
            this.Description = description;
            this.PricePerNight = pricePerNight;
            this.Accommodation = accommodation;
        }
    }
}