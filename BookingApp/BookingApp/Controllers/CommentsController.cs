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
    public class CommentsController : ApiController
    {
        private BAContext db = new BAContext();

        // GET: api/Comments
        [HttpGet]
        [EnableQuery]
        public IQueryable<Comment> GetComments()
        {
            return db.Comments.Include("User");
        }

        // GET: api/Comments/5
        [HttpGet]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult GetComment(int id)
        {
            Comment comment = db.Comments.Find(id);
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        // PUT: api/Comments/5
        [HttpPut]
        [Authorize(Roles = "AppUser")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutComment(int id, Comment comment)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != comment.Id)
            {
                return BadRequest();
            }

            db.Entry(comment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
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

        // POST: api/Comments
        [HttpPost]
        [Authorize(Roles = "AppUser")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult PostComment(Comment comment)
        {
            Accommodation accomm = db.Accommodations
                .Where(a => comment.Accommodation.Id == a.Id)
                .Include("Place")
                .Include("AccommodationType")
                .Include("Owner")
                .FirstOrDefault();

            accomm.Place = db.Places
                .Where(p => p.Id == accomm.Place.Id)
                .Include("Region")
                .FirstOrDefault();

            accomm.Place.Region = db.Regions
                .Where(r => r.Id == accomm.Place.Region.Id)
                .Include("Country")
                .FirstOrDefault();

            

            if(comment.User.Username != string.Empty)
            {
                comment.User = db.AppUsers
               .Where(u => u.Username == comment.User.Username)
               .FirstOrDefault();
            }
            else
            {
                comment.User = db.AppUsers
               .Where(u => u.Id == comment.User.Id)
               .FirstOrDefault();
            }

            comment.Accommodation = accomm;

            List<Comment> comments = db.Comments.Where(c => c.Accommodation.Id == comment.Accommodation.Id).ToList();
            double average = comment.Grade;
            int count = 1;

            foreach (Comment comm in comments)
            {
                average += comm.Grade;
                count++;
            }

            average /= count;

            comment.Accommodation.AverageGrade = average;

            

            db.Entry(comment.Accommodation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(comment.Accommodation.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Comments.Add(comment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = comment.Id }, comment);
        }

        // DELETE: api/Comments/5
        [HttpDelete]
        [Authorize(Roles = "AppUser")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult DeleteComment(int id)
        {
            Comment comment = db.Comments.Find(id);
            if (comment == null)
            {
                return NotFound();
            }

            db.Comments.Remove(comment);
            db.SaveChanges();

            return Ok(comment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CommentExists(int id)
        {
            return db.Comments.Count(e => e.Id == id) > 0;
        }
    }
}