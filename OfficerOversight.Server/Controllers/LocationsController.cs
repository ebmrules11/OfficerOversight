using Microsoft.AspNetCore.Mvc;
using OfficerOversight.Server.Models;

namespace OfficerOversight.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Location> GetLocations()
        {
            return new List<Location>
            {
                new Location { Id = 1, Latitude = 33.996724, Longitude = -118.269681, Title = "Crip Got Shot", Description = "Aww shit that crip be dead!" },
                new Location { Id = 2, Latitude = 34.035142, Longitude = -118.161310, Title = "Blud Got Shot", Description = "Aww shit that Blud be dead!"},
                new Location { Id = 3, Latitude = 33.956581, Longitude = -118.234761, Title = "Mac Daddy Got Shot", Description = "Aww shit that Mac Daddy be dead!" }
            };
        }
    }
}