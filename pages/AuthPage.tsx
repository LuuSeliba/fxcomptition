import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, MailIcon, PhoneIcon, HashtagIcon, LockIcon, ChartBarIcon, ChevronDownIcon, CheckCircleIcon } from '../components/icons';
import InputField from '../components/InputField';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [investorPassword, setInvestorPassword] = useState('');
  const [tradingPlatform, setTradingPlatform] = useState('');
  const [rulesConfirmed, setRulesConfirmed] = useState(false);
  const [error, setError] = useState('');
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showInvestorPassword, setShowInvestorPassword] = useState(false);

  const handleRegistrationSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!phone.startsWith('+')) {
        setError('Phone number must include a country code (e.g., +27).');
        return;
    }

    if (!username || !fullName || !email || !phone || !accountNumber || !tradingPlatform || !investorPassword) {
        setError('Please fill in all fields.');
        return;
    }
    if (!rulesConfirmed) {
        setError('You must confirm you meet the competition requirements.');
        return;
    }

    setFormStatus('submitting');
    
    const formData = new FormData();
    formData.append('username', username);
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('accountNumber', accountNumber);
    formData.append('investorPassword', investorPassword);
    formData.append('tradingPlatform', tradingPlatform);
    formData.append('rulesConfirmed', String(rulesConfirmed));

    try {
      const response = await fetch('https://getform.io/f/amdynpyb', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        setError('Registration failed. Please try again.');
        setFormStatus('idle');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred during submission. Please try again.');
      setFormStatus('idle');
    }
  };
  
  if (formStatus === 'success') {
    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl text-center">
                <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto" />
                <h2 className="mt-6 text-3xl font-extrabold text-white">
                    Registration Submitted!
                </h2>
                <p className="mt-2 text-gray-300">
                    Thank you for registering! You will receive an email confirmation shortly with the next steps and competition details.
                </p>
                <div className="mt-6">
                    <Link to="/" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Register for the Competition
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegistrationSubmit}>
            <>
              <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-4 text-sm text-blue-200 space-y-2">
                  <h4 className="font-bold">Important Registration Rules:</h4>
                  <ul className="list-disc list-inside">
                      <li>Only <strong>OctaFX Demo Accounts</strong> are accepted.</li>
                      <li>The account balance must be exactly <strong>R2000</strong>.</li>
                      <li><strong>Investor (read-only) password</strong> is required for verification.</li>
                  </ul>
              </div>
              <InputField name="username" icon={<UserIcon className="h-5 w-5 text-gray-400"/>} type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              <InputField name="fullName" icon={<UserIcon className="h-5 w-5 text-gray-400"/>} type="text" placeholder="Full Name (private)" value={fullName} onChange={e => setFullName(e.target.value)} />
              <InputField name="email" icon={<MailIcon className="h-5 w-5 text-gray-400"/>} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
              <InputField name="whatsappNumber" icon={<PhoneIcon className="h-5 w-5 text-gray-400"/>} type="tel" placeholder="Phone Number (e.g. +27...)" value={phone} onChange={e => setPhone(e.target.value)} />
              <InputField name="accountNumber" icon={<HashtagIcon className="h-5 w-5 text-gray-400"/>} type="text" placeholder="Trading Account Number" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
              <div>
                <InputField 
                  name="investorPassword" 
                  icon={<LockIcon className="h-5 w-5 text-gray-400"/>} 
                  type="password" 
                  placeholder="Investor (Read-Only) Password" 
                  value={investorPassword} 
                  onChange={e => setInvestorPassword(e.target.value)}
                  isPassword
                  passwordVisible={showInvestorPassword}
                  onToggleVisibility={() => setShowInvestorPassword(!showInvestorPassword)}
                />
                <p className="mt-2 text-xs text-gray-400">Enter the investor (read-only) password for your OctaFX demo account. This allows us to verify your account only — we will not trade or withdraw funds.</p>
              </div>

              <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <ChartBarIcon className="h-5 w-5 text-gray-400" />
                  </span>
                  <select
                      name="tradingPlatform"
                      id="tradingPlatform"
                      value={tradingPlatform}
                      onChange={(e) => setTradingPlatform(e.target.value)}
                      required
                      className={`w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none ${!tradingPlatform ? 'text-gray-400' : 'text-white'}`}
                  >
                      <option value="" disabled>Select Trading Platform</option>
                      <option value="OctaFX on MT4">OctaFX on MT4</option>
                      <option value="OctaFX on MT5">OctaFX on MT5</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <ChevronDownIcon className="w-5 h-5 text-gray-400"/>
                  </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="rules"
                    name="rules"
                    type="checkbox"
                    checked={rulesConfirmed}
                    onChange={(e) => setRulesConfirmed(e.target.checked)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-600 bg-gray-700 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="rules" className="font-medium text-gray-300">
                    I confirm that I am using an OctaFX Demo Account with an exact balance of R2000.
                  </label>
                </div>
              </div>
            </>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <div>
            <button 
              type="submit" 
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:bg-blue-800 disabled:cursor-not-allowed"
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? 'Submitting...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;