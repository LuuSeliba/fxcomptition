import React from 'react';
import { UserIcon, ChartBarIcon, TrophyIcon, ShieldCheckIcon } from '../components/icons';

const RuleSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-gray-800/50 rounded-xl shadow-lg p-6 border border-gray-700 h-full">
        <div className="flex items-center gap-4 mb-4">
            <div className="text-blue-400 flex-shrink-0">{icon}</div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <div className="text-gray-300 space-y-2">
            {children}
        </div>
    </div>
);

const RulesPage: React.FC = () => {
    return (
        <div className="py-16 px-4 bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">Rules & Guidelines</h1>
                    <p className="mt-4 text-lg text-gray-400">Please read carefully before entering the competition.</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <RuleSection title="Account Requirements" icon={<UserIcon className="h-8 w-8" />}>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Only OctaFX Demo Accounts are allowed.</li>
                            <li>Exact account balance must be <strong>R2,000</strong> — not less, not more.</li>
                        </ul>
                         <p className="mt-4">
                            <a href="https://my.octafx.com/login/?back=%2F&fromFront=1" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 hover:underline">
                                Click here to create an OctaFX demo account.
                            </a>
                        </p>
                    </RuleSection>

                    <RuleSection title="Trading Rules" icon={<ChartBarIcon className="h-8 w-8" />}>
                         <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Maximum lot size per trade: <strong>0.3</strong>.</li>
                            <li>No real money accounts are allowed.</li>
                            <li>Only standard instruments are allowed (forex pairs).</li>
                        </ul>
                    </RuleSection>

                    <RuleSection title="Leaderboard & Results" icon={<ChartBarIcon className="h-8 w-8" />}>
                         <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>The leaderboard is updated daily.</li>
                            <li>Gain percentages start at <strong>0.00%</strong>.</li>
                            <li>Only registered participants will appear on the leaderboard.</li>
                        </ul>
                    </RuleSection>

                    <div className="lg:col-span-2">
                        <RuleSection title="Prize Pool & Distribution" icon={<TrophyIcon className="h-8 w-8" />}>
                            <p>Total prize pool: <strong>R10,000</strong> shared among the top 5 winners.</p>
                             <ul className="list-decimal list-inside space-y-2 pl-2 font-semibold text-white">
                                <li>1st Place: <span className="text-yellow-300">R5,000 cash</span></li>
                                <li>2nd Place: <span className="text-gray-200">R2,000 cash</span></li>
                                <li>3rd Place: <span className="text-orange-400">R1,500 cash</span></li>
                                <li>4th Place: R1,000 cash</li>
                                <li>5th Place: R500 cash</li>
                            </ul>
                            <p className="mt-2">Winners will be announced after the competition ends.</p>
                        </RuleSection>
                    </div>

                    <div className="lg:col-span-2">
                         <RuleSection title="Account Verification & Security" icon={<ShieldCheckIcon className="h-8 w-8" />}>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-bold text-blue-300">Investor Password Required</p>
                                    <p>Participants must provide their OctaFX demo account investor (read‑only) password during registration. This is required only for verification purposes and will never be used to trade or withdraw funds.</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-100">What is an Investor Password?</p>
                                    <p>It's a read-only password. It allows us to log in to view your trading history and verify your results. It does NOT grant access to place trades or perform any financial transactions. Your account remains secure.</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-100">Privacy Statement:</p>
                                    <p>Your investor password will be stored securely and masked in the admin dashboard. Only verified admin(s) can view it, and it will be used only to confirm account details for this competition.</p>
                                </div>
                            </div>
                        </RuleSection>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RulesPage;