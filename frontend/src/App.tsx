import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BooksPage from './pages/BooksPage'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'
import AdminBooksPage from './pages/AdminPage'

function App() {

  return (
    <>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/adminpage" element={<AdminBooksPage />} />
        </Routes>
      </Router>
    </CartProvider>
    </>
  )
}

export default App
