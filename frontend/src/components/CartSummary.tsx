import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
    const navigate = useNavigate();
    const {cart} = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0)
    return (
        <div style={{
            position: 'fixed',
            top: '10px',
            right: '20px',
            background: '#f8f9fa',
            padding: '10px  15px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            fontSize: '16px',        
        }}
        onClick={() => navigate('/cart')}
        >
            🛒<strong className="ms-2">${totalAmount.toFixed(2)}</strong>
            <span className="badge bg-primary rounded-pill ms-2">{cart.length}</span>
        </div>
    );
};

export default CartSummary;