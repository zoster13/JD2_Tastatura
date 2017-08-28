using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using BookingApp.Models;

namespace BookingApp.Controllers
{
    public class PlacesController : ApiController
    {
        private BAContext db = new BAContext();

        // GET: api/Places
        [HttpGet]
        public IQueryable<Place> GetPlaces()
        {
            return db.Places.Include("Region");
        }

        // GET: api/Places/5
        [HttpGet]
        [ResponseType(typeof(Place))]
        public IHttpActionResult GetPlace(int id)
        {
            Place place = db.Places.Find(id);
            if (place == null)
            {
                return NotFound();
            }

            return Ok(place);
        }

        // PUT: api/Places/5
        [HttpPut]
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPlace(int id, Place place)
        {
            Place placeInDB = db.Places.Where(p => p.Id == place.Id)
                .Include("Region")
                .FirstOrDefault();

            Region regionInDB = db.Regions.Where(r => r.Id == place.Region.Id).Include("Country").FirstOrDefault();
            placeInDB.Region = regionInDB;
            placeInDB.Name = place.Name;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != place.Id)
            {
                return BadRequest();
            }

            db.Entry(placeInDB).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceExists(id))
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

        // POST: api/Places
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(Place))]
        public IHttpActionResult PostPlace(Place place)
        {
            Region region = db.Regions.Where(r => r.Id == place.Region.Id).Include("Country").FirstOrDefault();
            place.Region = region;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Places.Add(place);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = place.Id }, place);
        }

        // DELETE: api/Places/5
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(Place))]
        public IHttpActionResult DeletePlace(int id)
        {
            Place place = db.Places.Where(p => p.Id == id).Include("Region").FirstOrDefault();

            if (place == null)
            {
                return NotFound();
            }

            db.Places.Remove(place);
            db.SaveChanges();

            return Ok(place);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PlaceExists(int id)
        {
            return db.Places.Count(e => e.Id == id) > 0;
        }
    }
}