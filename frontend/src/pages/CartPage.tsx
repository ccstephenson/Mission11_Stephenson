import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/cartItems";

function CartPage () {
    const navigate = useNavigate();
    const {cart, removeFromCart} = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container my-4">
            <h2 className="mb-4">Your cart</h2>
            <div>
                {cart.length === 0 ? (
                    <div className="alert alert-warning">Your cart is empty.</div>
                ) : (
                    <ul className="list-group">
                        {cart.map((item: CartItem) => (
                            <li key={item.bookId} className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="me-3">
                                    {item.title} (x{item.quantity}): ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.bookId)}>Remove</button>
                            </li>
                        ))}    
                    </ul>
                )}
            </div>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="btn btn-primary">Checkout</button>
            <button className="btn btn-secondary" onClick={() => navigate('/books')}>Continue Browsing</button>
        </div>
    );
}

export default CartPage;