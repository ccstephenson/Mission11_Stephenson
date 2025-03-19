import { useEffect, useState } from "react";
import {Book} from './types/Book'

function BookList() {

    // State to store books data
    const [books, setBooks] = useState<Book[]>([]);

    // Number of books displayed per page
    const [pageSize, setPageSize] = useState<number>(5);

    // Current page number
    const [pageNum, setPageNum] = useState<number>(1);

    // Total number of books available
    const [totalItems, setTotalItems] = useState<number>(0);

    // Total number of pages calculated based on total books and pageSize
    const [totalPages, setTotalPages] = useState<number>(0);

    // Sorting order for book titles (ascending or descending)
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        // Function to fetch books from the backend API
        const fetchBooks = async () => {
            const response = await fetch(
                `https://localhost:5000/api/Bookstore/GetBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`
            );
            const data = await response.json();

            // Update state with fetched books and pagination info
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        };

        fetchBooks();

    }, [pageSize, pageNum, sortOrder]); // Re-fetch books when pageSize, pageNum, or sortOrder changes

    return (
        <>
            <h2>Books</h2>
            <br />

            {/* Button to toggle sorting order */}
            {/* Clicking this button switches between ascending and descending order */}
            <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                Sort by Title ({sortOrder === "asc" ? "Descending" : "Ascending"})
            </button>
            <br />
            <br />

            {/* Display books */}
            {/* .map() iterates through the books array and creates a book card for each */}
            {books.map((b) => (
                <div id="bookCard" className="card" key={b.bookId}>
                    {/* Each book has a title displayed as a header */}
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                        {/* Unordered list containing book details */}
                        <ul className="list-unstyled">
                            <li><strong>Author:</strong> {b.author}</li>
                            <li><strong>Publisher:</strong> {b.publisher}</li>
                            <li><strong>ISBN:</strong> {b.isbn}</li>
                            <li><strong>Classification:</strong> {b.classification}</li>
                            <li><strong>Category:</strong> {b.category}</li>
                            <li><strong>Page Count:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> ${b.price.toFixed(2)}</li>
                        </ul>
                    </div>
                </div>
            ))}
            <br />

            {/* Pagination controls */}
            {/* Previous button: Disabled if on the first page */}
            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

            {/* Dynamically create page number buttons based on total pages */}
            {/* .map() generates a button for each page */}
            {[...Array(totalPages)].map((_, index) => (
                <button 
                    key={index + 1} // Assigns a unique key to each button (React requirement)
                    onClick={() => setPageNum(index + 1)} // Sets the current page when clicked
                    disabled={pageNum === index + 1} // Disables the button for the current page
                >
                    {index + 1} {/* Displays the page number */}
                </button>
            ))}

            {/* Next button: Disabled if on the last page */}
            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

            <br />
            <br />

            {/* Dropdown for selecting number of results per page */}
            {/* Changing this value updates the page size and resets to the first page */}
            <label>
                Results per page: 
                <select
                    value={pageSize}
                    onChange={(p) => {
                        setPageSize(Number(p.target.value));
                        setPageNum(1); // Reset to first page when changing page size
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </>
    );
}

export default BookList;