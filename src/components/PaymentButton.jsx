import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PaymentButton = ({ amount, courseTitle, btnStyle }) => {
    const { user } = useAuth();

    // RAZORPAY KEY ID PROVIDED BY USER
    const RAZORPAY_KEY_ID = "rzp_test_SBzvO1HXJUfYi0";

    const displayAmount = parseInt(amount.replace(/[^0-9]/g, '')) * 100; // Convert "$99" -> 9900 paise (approx, assuming currency)

    const handlePayment = () => {
        const options = {
            key: RAZORPAY_KEY_ID,
            amount: displayAmount, // Amount in paise
            currency: "INR", // Changed to INR for UPI support specifically
            name: "EvolvEd Academy",
            description: `Purchase ${courseTitle}`,
            image: "/logo-circle.png", // automatic logo
            handler: function (response) {
                alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                // In a real app, you would verify signature on backend here
            },
            prefill: {
                name: user?.user_metadata?.full_name || "Student",
                email: user?.email || "student@example.com"
            },
            theme: {
                color: "#003366"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            console.error("Razorpay Error:", response.error);
            alert(`Payment Failed: ${response.error.code} - ${response.error.description}`);
        });
        rzp1.open();
    };

    return (
        <button
            onClick={handlePayment}
            className="btn btn-primary"
            style={btnStyle || { padding: '0.5rem 1rem', fontSize: '0.9rem' }}
        >
            <ShoppingCart size={16} style={{ marginRight: '5px' }} /> Buy Now
        </button>
    );
};

export default PaymentButton;
