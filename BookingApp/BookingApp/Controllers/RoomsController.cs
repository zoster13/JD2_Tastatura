using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using BookingApp.Models;
using System.Web.Http.OData;

namespace BookingApp.Controllers
{
    public class RoomsController : ApiController
    {
        private BAContext db = new BAContext();

        // GET: api/Rooms
        [HttpGet]
        [EnableQuery]
        public IQueryable<Room> GetRooms()
        {
            return db.Rooms.Include("Accommodation");
        }

        // GET: api/Rooms/5
        [HttpGet]
        [ResponseType(typeof(Room))]
        public IHttpActionResult GetRoom(int id)
        {
            Room room = db.Rooms.Where(r => r.Id == id)
                .Include("Accommodation")
                .FirstOrDefault();

            if (room == null)
            {
                return NotFound();
            }

            return Ok(room);
        }

        // PUT: api/Rooms/5
        [HttpPut]
        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoom(int id, Room room)
        {
            
            //References
            Accommodation accommodationInDB = db.Accommodations
                .Where(a => a.Id == room.Accommodation.Id)
                .Include("Place")
                .Include("AccommodationType")
                .Include("Owner")
                .FirstOrDefault();

            AppUser user = db.AppUsers
                .FirstOrDefault(o => o.Id == accommodationInDB.Owner.Id);

            Place place = db.Places.Where(p => p.Id == accommodationInDB.Place.Id)
                .Include("Region")
                .FirstOrDefault();

            place.Region = db.Regions.Where(r => r.Id == place.Region.Id)
                .Include("Country")
                .FirstOrDefault();

            AccommodationType accommType = db.AccommodationTypes
                .FirstOrDefault(at => at.Id == accommodationInDB.AccommodationType.Id);

            accommodationInDB.Place = place;
            accommodationInDB.AccommodationType = accommType;
            accommodationInDB.Owner = user;

            Room roomInDB = db.Rooms.Where(r => r.Id == room.Id)
                //.Include("Accommodation")
                .FirstOrDefault();

            roomInDB.BedCount = room.BedCount;
            roomInDB.Description = room.Description;
            roomInDB.PricePerNight = room.PricePerNight;
            roomInDB.RoomNumber = room.RoomNumber;
            roomInDB.Accommodation = accommodationInDB;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != room.Id)
            {
                return BadRequest();
            }

            db.Entry(roomInDB).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
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

        // POST: api/Rooms
        [HttpPost]
        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult PostRoom(Room room)
        {

            //References
            Accommodation accomm = db.Accommodations
                .Where(a => a.Id == room.Accommodation.Id)
                .Include("Place")
                .Include("AccommodationType")
                .Include("Owner")
                .FirstOrDefault();

            AppUser user = db.AppUsers
                .FirstOrDefault(o => o.Id == accomm.Owner.Id);

            Place place = db.Places.Where(p => p.Id == accomm.Place.Id)
                .Include("Region")
                .FirstOrDefault();

            place.Region = db.Regions.Where(r => r.Id == place.Region.Id)
                .Include("Country")
                .FirstOrDefault();

            AccommodationType accommType = db.AccommodationTypes
                .FirstOrDefault(at => at.Id == accomm.AccommodationType.Id);

            accomm.Place = place;
            accomm.AccommodationType = accommType;
            accomm.Owner = user;

            room.Accommodation = accomm;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Rooms.Add(room);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = room.Id }, room);
        }

        // DELETE: api/Rooms/5
        [HttpDelete]
        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult DeleteRoom(int id)
        {
            Room room = db.Rooms.Where(r => r.Id == id)
                .Include("Accommodation")
                .FirstOrDefault();

            //References
            Accommodation accomm = db.Accommodations
                .Where(a => a.Id == room.Accommodation.Id)
                .Include("Place")
                .Include("AccommodationType")
                .Include("Owner")
                .FirstOrDefault();

            AppUser user = db.AppUsers
                .FirstOrDefault(o => o.Id == accomm.Owner.Id);

            Place place = db.Places.Where(p => p.Id == accomm.Place.Id)
                .Include("Region")
                .FirstOrDefault();

            place.Region = db.Regions.Where(r => r.Id == place.Region.Id)
                .Include("Country")
                .FirstOrDefault();

            AccommodationType accommType = db.AccommodationTypes
                .FirstOrDefault(at => at.Id == accomm.AccommodationType.Id);

            accomm.Place = place;
            accomm.AccommodationType = accommType;
            accomm.Owner = user;

            room.Accommodation = accomm;
            
            if (room == null)
            {
                return NotFound();
            }

            db.Rooms.Remove(room);
            db.SaveChanges();

            return Ok(room);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomExists(int id)
        {
            return db.Rooms.Count(e => e.Id == id) > 0;
        }
    }
}