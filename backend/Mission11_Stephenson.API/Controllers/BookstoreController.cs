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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? bookTypes = null)
        {
            var booksQuery = _BookContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                booksQuery = booksQuery
                .Where(b => bookTypes.Contains(b.Category));
            }

            // Apply sorting based on title
            booksQuery = sortOrder.ToLower() == "desc" 
                ? booksQuery.OrderByDescending(b => b.Title) 
                : booksQuery.OrderBy(b => b.Title);

            var paginatedBooks = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = booksQuery.Count();

            var result = new
            {
                Books = paginatedBooks,
                TotalNumBooks = totalNumBooks
            };

            return Ok(result);
        }
        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _BookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();
            
            return Ok(bookTypes);
        }
    }
}