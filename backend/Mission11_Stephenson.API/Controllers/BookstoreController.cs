using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Stephenson.API.Data;

namespace Mission11_Stephenson.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreContext _BookContext;
        
        public BookstoreController(BookstoreContext temp) => _BookContext = temp;
    
        [HttpGet("GetBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1)
        {
            var something = _BookContext.Books
                .Skip((pageNum-1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _BookContext.Books.Count();

            var anObject = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };

            return Ok(anObject);
        }
    }
}