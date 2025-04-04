import { useEffect, useState } from 'react';
import { fetchBooks, deleteBook } from '../api/BooksAPI';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';
import { Book } from '../types/Book';
import Pagination from '../components/Pagination';

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [pageSize, setPageSize] = useState<number>(10); // Number of books per page
    const [pageNum, setPageNum] = useState<number>(1); // Current page number
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const booksData = await fetchBooks(pageSize, pageNum, []);
                setBooks(booksData.books);
                setTotalPages(Math.ceil(booksData.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, [pageSize, pageNum]); // Re-fetch when pageSize or pageNum changes

    const handleDelete = async (bookId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this book?');
        if (!confirmDelete) {
            return; // Exit if user cancels the delete action
        }
        try {
            await deleteBook(bookId); // Call the API to delete the book
            setBooks(books.filter((b) => b.bookId !== bookId)); // Update the state to remove the deleted book
        } catch (error) {
            // Handle error if delete fails
            alert('Failed to delete the book. Please try again later.');
            console.error('Error deleting book:', error);
        }
    };

    const handleEdit = (book: Book) => {
        setEditingBook(book);
    };

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p className="text-red-500">Error loading books: {error}</p>; // Display error message if fetching fails

    return (
        <div>
            <h1>Admin - Books</h1>

            {!showForm && (
                <button 
                    className="btn btn-success mb-3"
                    onClick={() => setShowForm(true)}
                >
                    Add Book
                </button>
            )}

            {showForm && (
                <NewBookForm 
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(pageSize, pageNum, []).then((data) => setBooks(data.books));
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingBook && (
                <EditBookForm 
                    book={editingBook} 
                    onSuccess={() => {
                        setEditingBook(null);
                        fetchBooks(pageSize, pageNum, []).then((data) => setBooks(data.books));
                    }}
                    onCancel={() => setEditingBook(null)}
                />
            )}

            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Page Count</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.bookId}>
                            <td>{book.bookId}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{book.isbn}</td>
                            <td>{book.classification}</td>
                            <td>{book.category}</td>
                            <td>{book.pageCount}</td>
                            <td>{book.price}</td>
                            <td>
                                <div className="d-flex gap-1">
                                    <button 
                                        className="btn btn-primary btn-sm w-100" 
                                        onClick={() => handleEdit(book)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm w-100" 
                                        onClick={() => handleDelete(book.bookId)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination 
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            />
        </div>
    );
};

export default AdminBooksPage;
