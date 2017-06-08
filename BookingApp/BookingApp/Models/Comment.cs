using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int Grade { get; set; }
        public string Text { get; set; }
        [Required]
        public Accommodation Accommodation { get; set; }
        [Required]
        public AppUser User { get; set; }

        public Comment()
        {
            this.Text = string.Empty;
            this.Accommodation = new Accommodation();
            this.User = new AppUser();
        }

        public Comment(int grade, string text)
        {
            this.Grade = grade;
            this.Text = text;
            this.Accommodation = new Accommodation();
            this.User = new AppUser();
        }
    }
}