using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using BookingApp.Models;
using System.Web.Http.OData;
using BookingApp.Hubss;
using System.Web;
using Newtonsoft.Json;
using System.Net.Http;
using System.Collections.Generic;
using System;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using System.IO;


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
                     .Include("Owner")
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
        public IHttpActionResult PutAccommodation()
        {
            Accommodation accomm = new Accommodation();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var httpRequest = HttpContext.Current.Request;
            accomm = JsonConvert.DeserializeObject<Accommodation>(httpRequest.Form[0]); 

            //Upload file
            foreach (string file in httpRequest.Files)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                var postedFile = httpRequest.Files[file];
                if(postedFile != null && postedFile.ContentLength > 0)
                {
                    IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                    var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                    var extension = ext.ToLower();

                    if(!AllowedFileExtensions.Contains(extension))
                    {
                        return BadRequest();
                    }
                    else
                    {
                        //Save file local
                        //var filePath = HttpContext.Current.Server.MapPath("~/Content/AccommodationPictures/" + postedFile.FileName);
                        //accomm.ImageURL = "Content/AccommodationPictures/" + postedFile.FileName;
                        //postedFile.SaveAs(filePath);

                        //Save file on Blob
                        var filePath = HttpContext.Current.Server.MapPath("~/Content/AccommodationPictures/" + postedFile.FileName);
                        string blobUri = SaveFileOnBlob(postedFile.FileName, filePath);
                        accomm.ImageURL = blobUri;
                    }
                }
            }

            //References
            AppUser user = db.AppUsers
                .FirstOrDefault(o => o.Username == accomm.Owner.Username);

            Place place = db.Places.Where(p => p.Id == accomm.Place.Id)
                .Include("Region")
                .FirstOrDefault();

            place.Region = db.Regions.Where(r => r.Id == place.Region.Id)
                .Include("Country")
                .FirstOrDefault();

            AccommodationType accommType = db.AccommodationTypes
                .FirstOrDefault(at => at.Id == accomm.AccommodationType.Id);

            var accommInDB = db.Accommodations.Where(a => a.Id == accomm.Id)
                //.Include("Owner")
                //.Include("AccommodationType")
                //.Include("Place")
                .FirstOrDefault();

            accommInDB.Name = accomm.Name;
            accommInDB.Description = accomm.Description;
            accommInDB.Address = accomm.Address;
            accommInDB.AverageGrade = accomm.AverageGrade;
            accommInDB.Longitude = accomm.Longitude;
            accommInDB.Latitude = accomm.Latitude;
            accommInDB.ImageURL = accomm.ImageURL;
            accommInDB.Approved = accomm.Approved;
            accommInDB.AccommodationType = accommType;
            accommInDB.Place = place;
            accommInDB.Owner = user;

            db.Entry(accommInDB).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationExists(accomm.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            if(accomm.Approved)
            {
                NotificationHub.NotifyAccommodationApproved(accomm.Owner.Id.ToString(), accomm.Id);
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
        
        // POST: api/Accommodations
        [HttpPost]
        [Authorize(Roles = "Manager, Admin")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult PostAccommodation()
        {
            Accommodation accomm = new Accommodation();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var httpRequest = HttpContext.Current.Request;
            accomm = JsonConvert.DeserializeObject<Accommodation>(httpRequest.Form[0]);

            //References
            AppUser user = db.AppUsers
                .FirstOrDefault(o => o.Username == accomm.Owner.Username);

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

            //File upload
            foreach (string file in httpRequest.Files)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                var postedFile = httpRequest.Files[file];
                if(postedFile != null && postedFile.ContentLength > 0)
                {
                    IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                    var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                    var extension = ext.ToLower();

                    if(!AllowedFileExtensions.Contains(extension))
                    {
                        return BadRequest();
                    }
                    else
                    {
                        //Save file local
                        //var filePath = HttpContext.Current.Server.MapPath("~/Content/AccommodationPictures/" + postedFile.FileName);
                        //accomm.ImageURL = "Content/AccommodationPictures/" + postedFile.FileName;
                        //postedFile.SaveAs(filePath);

                        //Save file on Blob
                        var filePath = HttpContext.Current.Server.MapPath("~/Content/AccommodationPictures/" + postedFile.FileName);
                        string blobUri = SaveFileOnBlob(postedFile.FileName, filePath);
                        accomm.ImageURL = blobUri;
                    }
                }
            }

            db.Accommodations.Add(accomm);
            db.SaveChanges();

            NotificationHub.NotifyNewAccommodation(accomm.Id);

            return CreatedAtRoute("DefaultApi", new { id = accomm.Id }, accomm);
        }

        private string SaveFileOnBlob(string fileName, string filePath)
        {
            //Save file on Blob
            string accountname = "jd2tastaturablob";
            string accesskey = "XzIORM3QagDButWziQXdGYh+eYg1dnQ0M/XqTSaa1AdNxqnBahHm0/hI0AfRzg17r4hbaMmiP9Ct2E1mKTepug==";

            try
            {
                StorageCredentials creden = new StorageCredentials(accountname, accesskey);
                CloudStorageAccount acc = new CloudStorageAccount(creden, useHttps: true);
                CloudBlobClient client = acc.CreateCloudBlobClient();
                CloudBlobContainer cont = client.GetContainerReference("jd2tastaturacont");
                cont.CreateIfNotExists();
                cont.SetPermissions(new BlobContainerPermissions
                {
                    PublicAccess = BlobContainerPublicAccessType.Blob
                });

                CloudBlockBlob cblob = cont.GetBlockBlobReference(fileName);

                using (Stream f = System.IO.File.OpenRead(filePath))
                {
                    cblob.UploadFromStream(f);
                }

                return cblob.Uri.ToString();
            }
            catch (Exception ex)
            {
                return String.Empty;
            }
        }

        // DELETE: api/Accommodations/5
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult DeleteAccommodation(int id)
        {
            //References
            var accommodation = db.Accommodations.Where(a => a.Id == id)
                .Include("Owner")
                .Include("AccommodationType")
                .Include("Place")
                .FirstOrDefault();

            AppUser user = db.AppUsers
                .FirstOrDefault(o => o.Username == accommodation.Owner.Username);

            Place place = db.Places.Where(p => p.Id == accommodation.Place.Id)
                .Include("Region")
                .FirstOrDefault();

            place.Region = db.Regions.Where(r => r.Id == place.Region.Id)
                .Include("Country")
                .FirstOrDefault();

            AccommodationType accommType = db.AccommodationTypes
                .FirstOrDefault(at => at.Id == accommodation.AccommodationType.Id);

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