using IndustrialFeedback.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IndustrialFeedback.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {


        [HttpPost]
        public String SetFeedback(Feedback feedback)
        {
            using (var db= new industrial_productsContext())
            {
                db.Add(feedback);
                db.SaveChanges();
            }
            return "Ok";
        }




        [HttpGet]
        public List<Feedback> getFeedbacks()
        {
            List<Feedback> list = new List<Feedback>(); 
            using(var db = new industrial_productsContext())
            {
                list = db.Feedbacks.ToList();
            }
            return list;
        }
    }
}
