﻿using System.Collections;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using Breeze.ContextProvider;
using Breeze.WebApi2;
using Newtonsoft.Json.Linq;
using SiqCloset.DataAccess;
using SiqCloset.Model;

namespace SiqCloset.Web.Controllers
{
    [BreezeController]
    public class BreezeController : ApiController
    {
        // Todo: inject via an interface rather than "new" the concrete class
        readonly SiqClosetRepository _repository = new SiqClosetRepository();

        [HttpGet]
        public string Metadata()
        {
            return _repository.Metadata;
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _repository.SaveChanges(saveBundle);
        }

        [HttpGet]
        public IQueryable<Customer> Customers()
        {
            return _repository.Customers;
        }

        [HttpGet]
        public IEnumerable TopTenCustomers()
        {
            return _repository.Customers
                .OrderByDescending(c => c.Items.Count)
                .Take(10)
                .Select(c => new
                {
                    Name = c.Name, 
                    ItemsCount = c.Items.Count
                })
                .ToList();
        }

        [HttpGet]
        public IQueryable<Batch> Batches()
        {
            return _repository.Batches;
        }

        [HttpGet]
        public IQueryable<Box> Boxes()
        {
            return _repository.Boxes;
        }

        [HttpGet]
        public IQueryable<Item> Items()
        {
            return _repository.Items;
        }
        

        // Diagnostic
        [HttpGet]
        public string Ping()
        {
            return "pong";
        }
    }
}