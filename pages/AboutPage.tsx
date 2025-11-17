import React from 'react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-xl font-bold text-blue-400 mb-2">{title}</h3>
        <div className="text-gray-300">{children}</div>
    </div>
);

const AboutPage: React.FC = () => {
    return (
        <div className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">About the Competition</h1>
                    <p className="mt-4 text-lg text-gray-400">Everything you need to know to get started.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InfoCard title="How It Works">
                        <p>This is a demo account trading competition designed to find the most skilled traders. Participants compete over a one-month period. The trader who achieves the highest percentage gain on their initial demo account balance wins the grand prize. It's a pure test of trading strategy and risk management.</p>
                    </InfoCard>
                    <InfoCard title="The Goal">
                        <p>Your objective is simple: achieve the <span className="font-bold text-blue-300">highest percentage gain</span> on your demo account by the end of the competition. This approach levels the playing field, ensuring that strategy, not starting capital, determines the winner.</p>
                    </InfoCard>
                    <InfoCard title="Entry Fee">
                        <p className="text-2xl font-bold">R300</p>
                        <p>A one-time fee to join the competition and enter the prize pool.</p>
                    </InfoCard>
                    <InfoCard title="Start Date">
                        <p className="text-2xl font-bold">30 November 2025</p>
                        <p>Mark your calendars! The competition kicks off on this date.</p>
                    </InfoCard>
                    <InfoCard title="Duration">
                        <p className="text-2xl font-bold">1 Month</p>
                        <p>You have one full month to showcase your trading prowess.</p>
                    </InfoCard>
                    <InfoCard title="Platform">
                        <div className="flex flex-col items-start">
                            <p className="text-2xl font-bold">OctaFX Demo Accounts Only</p>
                            <p>All trading must be conducted on an OctaFX Demo Account with an exact balance of R2000. This ensures a risk-free and standardized environment for all participants.</p>
                             <a 
                                href="https://my.octafx.com/login/?back=%2F&fromFront=1" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                            >
                                Create OctaFX Account
                            </a>
                        </div>
                    </InfoCard>
                     <div className="md:col-span-2">
                        <InfoCard title="Account Verification">
                            <p>To ensure fair play, participants must provide their demo account's <strong>investor (read-only) password</strong> upon registration. This is a secure, view-only credential that allows us to verify your trading activity without any risk to your account.</p>
                        </InfoCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;