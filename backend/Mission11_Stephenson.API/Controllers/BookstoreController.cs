using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Stephenson.API.Data;
using System.Linq;

namespace Mission11_Stephenson.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreContext _BookContext;
        
        public BookstoreController(BookstoreContext temp) => _BookContext = temp;
    
        [HttpGet("GetBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc")
        {
            IQueryable<Book> booksQuery = _BookContext.Books;

            // Apply sorting based on title
            booksQuery = sortOrder.ToLower() == "desc" 
                ? booksQuery.OrderByDescending(b => b.Title) 
                : booksQuery.OrderBy(b => b.Title);

            var paginatedBooks = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _BookContext.Books.Count();

            var result = new
            {
                Books = paginatedBooks,
                TotalNumBooks = totalNumBooks
            };

            return Ok(result);
        }
    }
}