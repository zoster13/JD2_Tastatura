using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BookingApp.Models;
using System.Web.Http.OData;
using BookingApp.Hubss;

namespace BookingApp.Controllers
{
    public class AccommodationsController : ApiController
    {
        private BAContext db = new BAContext();

        // GET: api/Accommodations
        [HttpGet]
        [EnableQuery]
        public IQueryable<Accommodation> GetAccommodations()
        {
            return db.Accommodations
                     .Include("Place")
                     .Include("AccommodationType")
                     .AsQueryable();
        }

        // GET: api/Accommodations/5
        [HttpGet]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult GetAccommodation(int id)
        {
            Accommodation accommodation = db.Accommodations.Find(id);
            if (accommodation == null)
            {
                return NotFound();
            }

            return Ok(accommodation);
        }

        // PUT: api/Accommodations/5
        [HttpPut]
        [Authorize(Roles = "Manager, Admin")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAccommodation(int id, Accommodation accommodation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Accommodation accomm = db.Accommodations.FirstOrDefault(a => a.Id == accommodation.Id);//TEMP

            AppUser owner = db.AppUsers.FirstOrDefault(o => o.Id == accomm.Owner.Id);
            Place place = db.Places.Where(p => p.Id == accommodation.Place.Id).Include("Region").FirstOrDefault();
            place.Region = db.Regions.Where(r => r.Id == place.Region.Id).Include("Country").FirstOrDefault();
            AccommodationType accommType = db.AccommodationTypes.FirstOrDefault(at => at.Id == accommodation.AccommodationType.Id);

            accommodation.Place = place;
            accommodation.AccommodationType = accommType;
            accommodation.Owner = owner;


            if (id != accommodation.Id)
            {
                return BadRequest();
            }

            db.Entry(accommodation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            if(accommodation.Approved)
            {
                var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));
                NotificationHub.NotifyAccommodationApproved(user.Id, accommodation.Id);
            }


            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Accommodations
        [HttpPost]
        [Authorize(Roles = "Manager, Admin")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult PostAccommodation(Accommodation accommodation)
        {
            AppUser user = db.AppUsers.FirstOrDefault(o => o.Id == accommodation.Owner.Id);

            Place place = db.Places.Where(p => p.Id == accommodation.Place.Id).Include("Region").FirstOrDefault();
            place.Region = db.Regions.Where(r => r.Id == place.Region.Id).Include("Country").FirstOrDefault();
            AccommodationType accommType = db.AccommodationTypes.FirstOrDefault(at => at.Id == accommodation.AccommodationType.Id);

            accommodation.Place = place;
            accommodation.AccommodationType = accommType;
            accommodation.Owner = user;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Accommodations.Add(accommodation);
            db.SaveChanges();

            NotificationHub.NotifyNewAccommodation(accommodation.Id);

            return CreatedAtRoute("DefaultApi", new { id = accommodation.Id }, accommodation);
        }

        // DELETE: api/Accommodations/5
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult DeleteAccommodation(int id)
        {
            //Accommodation accommodation = db.Accommodations.Find(id);

            Accommodation accommodation = db.Accommodations
                .Include("AccommodationType")
                .Include("Place")
                .Include("Owner")
                .FirstOrDefault(a => a.Id == id);

            Place place = db.Places.Where(p => p.Id == accommodation.Place.Id).Include("Region").FirstOrDefault();
            place.Region = db.Regions.Where(r => r.Id == place.Region.Id).Include("Country").FirstOrDefault();
            AccommodationType accommType = db.AccommodationTypes.FirstOrDefault(at => at.Id == accommodation.AccommodationType.Id);
            AppUser user = db.AppUsers.FirstOrDefault(o => o.Id == accommodation.Owner.Id);

            accommodation.Place = place;
            accommodation.AccommodationType = accommType;
            accommodation.Owner = user;


            if (accommodation == null)
            {
                return NotFound();
            }

            db.Accommodations.Remove(accommodation);
            db.SaveChanges();

            return Ok(accommodation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationExists(int id)
        {
            return db.Accommodations.Count(e => e.Id == id) > 0;
        }
    }
}