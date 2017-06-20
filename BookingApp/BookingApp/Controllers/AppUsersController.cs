﻿using System;
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

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class AppUsersController : ApiController
    {
        private BAContext db = new BAContext();

        // GET: api/AppUsers
        [HttpGet]
        [Route("AppUsers")]
        public IQueryable<AppUser> GetAppUsers()
        {
            return db.AppUsers;
        }

        // GET: api/AppUsers/5
        [HttpGet]
        [Route("AppUsers/{id}")]
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult GetAppUser(int id)
        {
            AppUser appUser = db.AppUsers.Find(id);
            if (appUser == null)
            {
                return NotFound();
            }

            return Ok(appUser);
        }

        [HttpPut]
        [Route("UserBan/{id}")]
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(void))]
        public IHttpActionResult BanUser(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppUser appUser = db.AppUsers.Where(au => au.Id == id).FirstOrDefault();
            bool isManager = false;

            var role = db.Roles.Where(r => r.Name.Equals("Manager")).FirstOrDefault();

            var users = role.Users.Join(db.Users, u1 => u1.UserId, u2 => u2.Id, (u1, u2)
            => new { UserRole = u1, User = u2 }).Select(x => x.User.AppUserId).Join(db.AppUsers, u3 => u3, u4 => u4.Id, (u3, u4) => new { AppUser = u4 }).ToList();

            foreach (var user in users)
            {
                if (user.AppUser.Id == id)
                {
                    isManager = true;
                    break;
                }
            }


            if (appUser == null || !isManager)
            {
                return BadRequest();
            }

            appUser.IsBanned = true;


            db.Entry(appUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [HttpPut]
        [Route("UserUnban/{id}")]
        [Authorize(Roles = "Admin")]
        [ResponseType(typeof(void))]
        public IHttpActionResult UnbanUser(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppUser appUser = db.AppUsers.Where(au => au.Id == id).FirstOrDefault();
            bool isManager = false;

            var role = db.Roles.Where(r => r.Name.Equals("Manager")).FirstOrDefault();

            var users = role.Users.Join(db.Users, u1 => u1.UserId, u2 => u2.Id, (u1, u2)
            => new { UserRole = u1, User = u2 }).Select(x => x.User.AppUserId).Join(db.AppUsers, u3 => u3, u4 => u4.Id, (u3, u4) => new { AppUser = u4 }).ToList();

            foreach (var user in users)
            {
                if (user.AppUser.Id == id)
                {
                    isManager = true;
                    break;
                }
            }


            if (appUser == null || !isManager)
            {
                return BadRequest();
            }

            appUser.IsBanned = false;


            db.Entry(appUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AppUserExists(int id)
        {
            return db.AppUsers.Count(e => e.Id == id) > 0;
        }
    }
}