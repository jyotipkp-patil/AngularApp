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
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class trainingsController : ApiController
    {
        private TrainingsDBEntities db = new TrainingsDBEntities();

        // GET: api/trainings
        public IQueryable<training> Gettrainings()
        {
            return db.trainings;
        }

        // GET: api/trainings/5
        [ResponseType(typeof(training))]
        public IHttpActionResult Gettraining(int id)
        {
            training training = db.trainings.Find(id);
            if (training == null)
            {
                return NotFound();
            }

            return Ok(training);
        }

        // PUT: api/trainings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttraining(int id, training training)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != training.tID)
            {
                return BadRequest();
            }

            db.Entry(training).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!trainingExists(id))
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

        // POST: api/trainings
        [ResponseType(typeof(training))]
        public IHttpActionResult Posttraining(training training)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.trainings.Add(training);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (trainingExists(training.tID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = training.tID }, training);
        }

        // DELETE: api/trainings/5
        [ResponseType(typeof(training))]
        public IHttpActionResult Deletetraining(int id)
        {
            training training = db.trainings.Find(id);
            if (training == null)
            {
                return NotFound();
            }

            db.trainings.Remove(training);
            db.SaveChanges();

            return Ok(training);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool trainingExists(int id)
        {
            return db.trainings.Count(e => e.tID == id) > 0;
        }
    }
}