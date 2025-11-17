import React from 'react';
import { Link } from 'react-router-dom';
import { useCountdown } from '../hooks/useCountdown';
import { ChevronDownIcon } from '../components/icons';
import { useCompetition } from '../context/CompetitionContext';

const CountdownDisplay: React.FC<{ targetDate: string }> = ({ targetDate }) => {
    const { days, hours, minutes, seconds } = useCountdown(targetDate);

    const timeUnit = (label: string, value: number) => (
        <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-bold text-white tracking-widest">{value.toString().padStart(2, '0')}</span>
            <span className="text-sm md:text-base text-blue-300 uppercase">{label}</span>
        </div>
    );

    return (
        <div className="flex justify-center space-x-4 md:space-x-8 my-8">
            {timeUnit('Days', days)}
            {timeUnit('Hours', hours)}
            {timeUnit('Minutes', minutes)}
            {timeUnit('Seconds', seconds)}
        </div>
    );
};

const FAQItem: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border-b-2 border-gray-700 py-4">
            <button
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <ChevronDownIcon className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="mt-4 text-gray-400 space-y-3">
                    {answer}
                </div>
            )}
        </div>
    );
};

const HomePage: React.FC = () => {
    const { spotsFilled, totalSpots } = useCompetition();

    const competitionStartDate = "2025-11-30T00:00:00";
    const faqs = [
        {
            q: "How does the competition work?",
            a: <p>This is a <strong>demo trading competition</strong>. Participants trade on OctaFX demo accounts with an exact balance of <strong>R2,000</strong>. The trader with the <strong>highest percentage gain</strong> at the end of the one-month competition wins. All trading is done on demo accounts — <strong>no real money is at risk</strong>.</p>
        },
        {
            q: "What is a demo account?",
            a: <p>A demo account is a <strong>practice trading account</strong> provided by brokers. It is funded with virtual money, allowing you to trade in real market conditions <strong>without any financial risk</strong>. For this competition, only <strong>OctaFX demo accounts</strong> are accepted.</p>
        },
        {
            q: "How do I register?",
            a: (
                <>
                    <p>To participate, you must register with your:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>Username and Full Name (full name is kept private)</li>
                        <li>Email and WhatsApp number</li>
                        <li>OctaFX demo <strong>account number</strong></li>
                        <li>OctaFX demo <strong>investor (read-only) password</strong></li>
                        <li>Trading platform (MT4 or MT5)</li>
                        <li>Proof of payment of the R300 entry fee</li>
                    </ul>
                    <p>After registration, the admin will verify your account and confirm your spot.</p>
                </>
            )
        },
        {
            q: "How is the winner determined?",
            a: <p>The winner is the participant with the <strong>highest percentage gain</strong> on their verified demo account during the competition period. Consistent and smart trading strategies will increase your chances of winning.</p>
        },
        {
            q: "What are the prizes?",
            a: (
                <>
                    <p>The <strong>total prize pool is R10,000</strong>, shared among <strong>5 winners</strong>:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>1st Place: R5,000 cash</li>
                        <li>2nd Place: R2,000 cash</li>
                        <li>3rd Place: R1,500 cash</li>
                        <li>4th Place: R1,000 cash</li>
                        <li>5th Place: R500 cash</li>
                    </ul>
                </>
            )
        },
        {
            q: "What are the trading rules?",
            a: (
                 <>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>Only <strong>OctaFX demo accounts</strong> allowed, with an exact balance of <strong>R2,000</strong>.</li>
                        <li>Maximum <strong>lot size per trade: 0.3</strong>.</li>
                        <li>Only standard instruments are allowed (forex pairs).</li>
                        <li>No real money accounts or other brokers allowed.</li>
                        <li>Any suspicious activity or violation of rules may result in <strong>disqualification</strong>.</li>
                    </ul>
                </>
            )
        },
        {
            q: "How is the leaderboard updated?",
            a: <p>The leaderboard is <strong>updated daily by the admin</strong> only. Gains start at <strong>0.00%</strong>, and only verified participants appear.</p>
        },
        {
            q: "Is my investor (read-only) password safe?",
            a: <p>Yes. The <strong>investor password is read-only</strong>, which means it cannot be used to place trades or withdraw funds. It is stored securely and is only used for account verification.</p>
        },
        {
            q: "Can I see my competitors’ trades?",
            a: <p>No, competitors’ live trades are <strong>not publicly visible</strong>. The leaderboard only shows <strong>percentage gain</strong>, not individual trades.</p>
        },
        {
            q: "When are the winners announced?",
            a: <p>Winners will be announced <strong>immediately after the competition ends</strong>, once all accounts and gains are verified by the admin.</p>
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <div className="relative text-center py-20 md:py-32 px-4 bg-gradient-to-br from-gray-900 via-blue-900/40 to-gray-900 overflow-hidden">
                 <div className="absolute inset-0 bg-black opacity-30"></div>
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,119,255,0.2),_transparent_40%)]"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight animate-text-glow">
                        Forex Demo Trading Competition
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
                        Prove your skills. Compete for cash prizes. Zero risk.
                    </p>
                    <CountdownDisplay targetDate={competitionStartDate} />
                    <div className="mt-8 flex justify-center gap-4">
                        <Link to="/auth" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-blue-500/50">
                            Join Now
                        </Link>
                        <Link to="/about" className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>

            {/* Competition Details Section */}
            <div className="py-16 bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-white">The Ultimate Trading Challenge</h2>
                        <p className="mt-4 text-lg text-gray-400">Compete, learn, and win without risking your capital.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-center">
                            <h3 className="text-xl font-bold text-blue-400">Huge Prize Pool</h3>
                            <p className="mt-2 text-gray-300">The prize pool grows with every participant. The winner takes the majority share of the entry fees!</p>
                        </div>
                        <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-center">
                            <h3 className="text-xl font-bold text-blue-400">Risk-Free Trading</h3>
                            <p className="mt-2 text-gray-300">Trade on a demo account with virtual funds. Sharpen your strategy without any financial risk.</p>
                        </div>
                        <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-center">
                            <h3 className="text-xl font-bold text-blue-400">Prove Your Skills</h3>
                            <p className="mt-2 text-gray-300">Show the community you have what it takes to be a top trader and get recognized for your talent.</p>
                        </div>
                    </div>
                     <div className="mt-12 text-center">
                        <div className="inline-block bg-gray-900 rounded-full px-6 py-3">
                            <p className="text-2xl font-bold text-white"><span className="text-blue-400">{spotsFilled} / {totalSpots}</span> Spots Filled</p>
                            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(spotsFilled / totalSpots) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-16 bg-gray-900">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-center mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => <FAQItem key={index} question={faq.q} answer={faq.a} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;