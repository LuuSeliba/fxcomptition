import React, { useState } from 'react';
import { UserIcon, MailIcon, PhoneIcon, HashtagIcon, LockIcon } from '../components/icons';
import InputField from '../components/InputField';

const AuthPage: React.FC = () => {
  // State for form fields to keep them controlled
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [investorPassword, setInvestorPassword] = useState('');
  const [showInvestorPassword, setShowInvestorPassword] = useState(false);

  // IMPORTANT: Replace with your actual Getform endpoint
  const getformEndpoint = "https://getform.io/f/your-unique-endpoint";
  
  // Construct the success URL dynamically for redirection after form submission
  const successRedirectUrl = `${window.location.origin}${window.location.pathname}#/registration-success`;

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Register for the Competition
          </h2>
        </div>
        <form action={getformEndpoint} method="POST" className="mt-8 space-y-6">
          
          {/* Hidden input for Getform's success redirect */}
          <input type="hidden" name="redirect" value={successRedirectUrl} />
          {/* Honeypot for spam protection */}
          <input type="hidden" name="_gotcha" style={{ display: 'none' }} />

          <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-4 text-sm text-blue-200 space-y-2">
              <h4 className="font-bold">Important Registration Rules:</h4>
              <ul className="list-disc list-inside">
                  <li>Only <strong>OctaFX Demo Accounts</strong> are accepted.</li>
                  <li>The account balance must be exactly <strong>R2000</strong>.</li>
                  <li><strong>Investor (read-only) password</strong> is required for verification.</li>
              </ul>
          </div>
          <InputField name="username" icon={<UserIcon className="h-5 w-5 text-gray-400"/>} type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <InputField name="email" icon={<MailIcon className="h-5 w-5 text-gray-400"/>} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
          <InputField name="phone" icon={<PhoneIcon className="h-5 w-5 text-gray-400"/>} type="tel" placeholder="Phone Number (e.g. +27...)" value={phone} onChange={e => setPhone(e.target.value)} />
          <InputField name="accountNumber" icon={<HashtagIcon className="h-5 w-5 text-gray-400"/>} type="text" placeholder="Trading Account Number" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />

          {/* Broker is hardcoded, but we add it as a hidden field for the form submission */}
          <input type="hidden" name="broker" value="OctaFX" />

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
            <p className="mt-2 text-xs text-gray-400">This read-only password allows us to verify your account only. We cannot trade or withdraw funds.</p>
          </div>
          
          <div>
            <button 
              type="submit" 
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;