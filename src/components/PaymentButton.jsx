import React from 'react';
import { ShoppingCart } from 'lucide-react';

const PaymentButton = ({ amount, courseTitle, btnStyle }) => {
    const handlePayment = () => {
        if (courseTitle === '5 Day AI Bootcamp 2026') {
            window.open("https://forms.gle/J9hqn3Q98RYSf8vc6", "_blank");
        } else {
            alert("Enrollment feature coming soon!");
        }
    };

    return (
        <button
            onClick={handlePayment}
            className="btn btn-primary"
            style={btnStyle || { padding: '0.5rem 1rem', fontSize: '0.9rem' }}
        >
            <ShoppingCart size={16} style={{ marginRight: '5px' }} /> Enroll Now
        </button>
    );
};

export default PaymentButton;
