using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BookingApp.Controllers
{
    public class CountryController : ApiController
    {
        private BAContext _context = new BAContext();

        [HttpGet]
        public IHttpActionResult Get()
        {
            return Json(_context.Countries);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            return Json(_context.Countries.FirstOrDefault(c => c.Id == id));
        }

        [HttpPost]
        public IHttpActionResult Post(int id, string name, int code)
        {
            Country newCountry = new Country(id, name, code);
            _context.Countries.Add(newCountry);

            return Json(newCountry);
        }

        [HttpDelete]
        public void Delete(int id)
        {
            Country forDelete = _context.Countries.FirstOrDefault(c => c.Id == id);

            if(forDelete != null)
            {
                _context.Countries.Remove(forDelete);
            }
        }

        [HttpPut]
        public IHttpActionResult Put(int id, string name, int code)
        {
            Country country = _context.Countries.FirstOrDefault(c => c.Id == id);

            if (country != null)
            {
                if(name != null)
                {
                    country.Name = name;
                }
                if(code != 0)
                {
                    country.Code = code;
                }
            }

            return Json(country);
        }
    }
}
