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

namespace BookingApp.Controllers
{
    public class RoomReservationsController : ApiController
    {
        private BAContext db = new BAContext();

        // GET: api/RoomReservations
        [EnableQuery]
        public IQueryable<RoomReservations> GetRoomReservationss()
        {
            return db.RoomReservationss.Include("Room");
        }

        // GET: api/RoomReservations/5
        [ResponseType(typeof(RoomReservations))]
        public IHttpActionResult GetRoomReservations(int id)
        {
            RoomReservations roomReservations = db.RoomReservationss.Find(id);
            if (roomReservations == null)
            {
                return NotFound();
            }

            return Ok(roomReservations);
        }

        // PUT: api/RoomReservations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoomReservations(int id, RoomReservations roomReservations)
        {
            roomReservations.User = db.AppUsers.Where(u => u.Username == roomReservations.User.Username).FirstOrDefault();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != roomReservations.Id)
            {
                return BadRequest();
            }

            db.Entry(roomReservations).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomReservationsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/RoomReservations
        [ResponseType(typeof(RoomReservations))]
        public IHttpActionResult PostRoomReservations(RoomReservations roomReservations)
        {
            Room room = db.Rooms.Where(r => roomReservations.Room.Id == r.Id).Include("Accommodation").FirstOrDefault();
            room.Accommodation = db.Accommodations
                .Where(a => a.Id == room.Accommodation.Id)
                .Include("AccommodationType")
                .Include("Owner")
                .Include("Place").FirstOrDefault();

            room.Accommodation.Place = db.Places
                .Where(p => p.Id == room.Accommodation.Place.Id)
                .Include("Region")
                .FirstOrDefault();

            room.Accommodation.Place.Region = db.Regions
                .Where(r => r.Id == room.Accommodation.Place.Region.Id)
                .Include("Country")
                .FirstOrDefault();

            roomReservations.Room = room;

            if(roomReservations.User.Username == string.Empty)
            {
                roomReservations.User = db.AppUsers.Where(u => u.Id == 1).FirstOrDefault();
            }
            else
            {
                roomReservations.User = db.AppUsers.Where(u => u.Username == roomReservations.User.Username).FirstOrDefault();
            }
            

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RoomReservationss.Add(roomReservations);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = roomReservations.Id }, roomReservations);
        }

        // DELETE: api/RoomReservations/5
        [ResponseType(typeof(RoomReservations))]
        public IHttpActionResult DeleteRoomReservations(int id)
        {
            RoomReservations roomReservations = db.RoomReservationss.Find(id);
            if (roomReservations == null)
            {
                return NotFound();
            }

            db.RoomReservationss.Remove(roomReservations);
            db.SaveChanges();

            return Ok(roomReservations);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomReservationsExists(int id)
        {
            return db.RoomReservationss.Count(e => e.Id == id) > 0;
        }
    }
}