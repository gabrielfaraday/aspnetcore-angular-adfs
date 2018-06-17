using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdfsExample.Controllers
{
    [Authorize(Policy = "Given Policy")]
    [Produces("application/json")]
    [Route("api/Home")]
    public class HomeController : Controller
    {
        [HttpGet]
        [Route("private")]
        public IActionResult GetPrivate()
        {
            var name = User.Identity.Name;
            var email = User.Claims.FirstOrDefault(x => x.Type.ToLower().Contains("email"))?.Value.ToString().ToLower();

            return Ok(new
            {
                message = $"Welcome to the private area! You are {name} - {email}"
            });
        }

        [HttpGet]
        [Route("public")]
        [AllowAnonymous]
        public IActionResult GetPublic()
        {
            return Ok(new
            {
                message = "Welcome to the public area!"
            });
        }

    }
}