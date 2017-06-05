using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Comment
    {
        public int Grade { get; set; }
        public string Text { get; set; }
        public ICollection<Accommodation> Accommodations { get; set; }
        public ICollection<User> Users { get; set; }

        public Comment()
        {

        }

        public Comment(int grade, string text)
        {
            this.Grade = grade;
            this.Text = text;
        }
    }
}