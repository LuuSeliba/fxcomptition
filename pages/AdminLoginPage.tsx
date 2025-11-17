import React, { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MailIcon, LockIcon, ChartBarIcon } from '../components/icons';
import InputField from '../components/InputField';

const AdminLoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const loginSuccess = await login(email, password);
    
    if (loginSuccess) {
      // The ProtectedRoute will handle redirection automatically
      // once the AuthContext updates the currentUser state.
      navigate(from, { replace: true });
    } else {
      setError('Invalid admin credentials. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl">
        <div className="text-center">
            <ChartBarIcon className="h-12 w-12 text-blue-500 mx-auto" />
            <h2 className="mt-6 text-3xl font-extrabold text-white">
                Admin Portal
            </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <InputField icon={<MailIcon className="h-5 w-5 text-gray-400"/>} type="email" placeholder="Admin Email" value={email} onChange={e => setEmail(e.target.value)} />
          <InputField icon={<LockIcon className="h-5 w-5 text-gray-400"/>} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button 
              type="submit" 
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:bg-blue-800 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;