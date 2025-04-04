import { useEffect, useState } from "react";
import {Book} from '../types/Book'
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext";
import * as bootstrap from "bootstrap";
import NewBookForm from '../components/NewBookForm'
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import EditBookForm from "./EditBookForm";
import Pagination from './Pagination';

function BookList({selectedCategories}: {selectedCategories: string[]}) {

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
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Sorting order for book titles (ascending or descending)
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const handleAddToCart = (book: Book) => {
        const newItem = {
            bookId: book.bookId,
            title: book.title,
            price: book.price,
            quantity: 1
        };
        addToCart(newItem);
        
        // Show toast notification
        const toastMessage = document.getElementById('toastMessage');
        if (toastMessage) {
            toastMessage.textContent = `Added ${book.title} to cart!`;
        }
        const toastElement = document.getElementById('cartToast');
        if (toastElement) {
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        }
    };

    const loadBooks = async () => {
        try {
            setLoading(true);
            const data = await fetchBooks(pageSize, pageNum, selectedCategories);
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            setError(null);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBooks();
    }, [pageSize, pageNum, sortOrder, selectedCategories]); // Re-fetch books when pageSize, pageNum, or sortOrder changes

    if (loading) return <p>Loading books...</p>;
    if (error) return <p className='text-danger'>Error: {error}</p>;

    return (
        <>
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

                        <button
                        className="btn btn-outline-primary"
                        onClick={() => handleAddToCart(b)}
                        >
                            Add to Cart
                        </button>

                    </div>
                </div>
            ))}
            <br />

            <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={(newPage) => setPageNum(newPage)}
                onPageSizeChange={(newSize) => setPageSize(newSize)}
            />

            <div
                className="toast-container position-fixed bottom-0 end-0 p-3"
                style={{ zIndex: 9999 }}
            >
                <div
                    id="cartToast"
                    className="toast align-items-center text-bg-success border-0"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    data-bs-delay="3000"
                    data-bs-autohide="true"
                >
                    <div className="d-flex">
                        <div className="toast-body" id="toastMessage">
                            Added to cart!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookList;