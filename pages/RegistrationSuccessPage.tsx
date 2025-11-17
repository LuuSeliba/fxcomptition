import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '../components/icons';

const RegistrationSuccessPage: React.FC = () => {
    // IMPORTANT: Replace this with your actual payment link
    const paymentLink = "https://pay.yoco.com/your-payment-link";

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl text-center">
                <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto" />
                <h2 className="mt-6 text-3xl font-extrabold text-white">
                    Registration Submitted!
                </h2>
                <p className="mt-2 text-gray-300">
                    Thank you for registering! Please follow the payment instructions below to finalize your spot in the competition.
                </p>

                <div className="mt-6 bg-gray-700 p-6 rounded-lg text-left space-y-4">
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

                <div className="mt-6">
                    <Link to="/" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccessPage;
