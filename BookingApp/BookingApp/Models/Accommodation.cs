using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Accommodation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public double AverageGrade { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string ImageURL { get; set; }
        public bool Approved { get; set; }
        public Place Place { get; set; }
        public AccommodationType AccommodationType { get; set; }
        public ICollection<Room> Rooms { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public User Owner { get; set; }

        public Accommodation()
        {

        }

        public Accommodation(int id, string name, string description, string address, double averageGrade, double longitude, double latitude, string imageURL, bool approved, Place place, AccommodationType accommodationType, User owner)
        {
            this.Id = id;
            this.Name = name;
            this.Description = description;
            this.Address = address;
            this.AverageGrade = averageGrade;
            this.Longitude = longitude;
            this.Latitude = latitude;
            this.ImageURL = imageURL;
            this.Approved = approved;
            this.Place = place;
            this.AccommodationType = accommodationType;
            this.Owner = owner;
        }
    }
}