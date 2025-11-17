import React from 'react';
import { Link } from 'react-router-dom';

const PaymentPage: React.FC = () => {
    // Replace this with your actual payment provider link
    const paymentLink = "https://pay.yoco.com/your-payment-link";

    return (
        <div className="flex items-center justify-center py-12 px-4">
            <div className="max-w-lg w-full text-center bg-gray-800 p-10 rounded-xl shadow-2xl">
                <h1 className="text-3xl font-extrabold text-white mb-4">Final Step: Complete Your Payment</h1>
                <p className="text-gray-300 mb-6">
                    To secure your spot in the competition, please complete the R300 entry fee payment.
                </p>

                <div className="bg-gray-700 p-6 rounded-lg text-left space-y-4">
                    <div>
                        <h3 className="font-bold text-lg text-white">Payment Details</h3>
                        <p className="text-gray-400">Entry Fee: <span className="font-bold text-blue-400 text-xl">R300</span></p>
                    </div>
                     <div>
                        <h3 className="font-bold text-lg text-white">Important Instructions</h3>
                        <p className="text-gray-400">
                            When making the payment, please use your competition <strong className="text-white">Username</strong> or <strong className="text-white">Email Address</strong> as the payment reference. This is crucial for us to verify your payment.
                        </p>
                    </div>
                </div>

                <a 
                    href={paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 w-full inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg"
                >
                    Proceed to Secure Payment
                </a>
                <p className="text-xs text-gray-500 mt-2">You will be redirected to our secure payment partner.</p>

                 <div className="mt-8 border-t border-gray-700 pt-6">
                    <h3 className="font-semibold text-white">What happens next?</h3>
                    <p className="text-gray-400 text-sm mt-2">
                        After we receive your payment, our admin will verify your account and payment status within 24 hours. Once verified, you will be officially entered into the competition.
                    </p>
                    <Link to="/leaderboard" className="text-blue-400 hover:underline text-sm mt-4 inline-block">View the Leaderboard</Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;