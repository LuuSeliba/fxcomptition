
import React from 'react';
import { WhatsAppIcon } from '../components/icons';

const ContactCard: React.FC<{ icon: React.ReactNode; title: string; text: React.ReactNode; link: string; linkText: string; }> = ({ icon, title, text, link, linkText }) => (
    <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center flex flex-col items-center">
        <div className="text-blue-400 mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <div className="text-gray-400 mb-6">{text}</div>
        <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
            {linkText}
        </a>
    </div>
);

const ContactPage: React.FC = () => {
    return (
        <div className="py-16 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">Get In Touch</h1>
                    <p className="mt-4 text-lg text-gray-400">We're here to help! Reach out with any questions.</p>
                </div>
                <div className="flex justify-center">
                    <div className="max-w-md w-full">
                        <ContactCard 
                            icon={<WhatsAppIcon className="h-12 w-12"/>}
                            title="Contact via WhatsApp"
                            text={
                                <>
                                    Join our community group to connect with other traders. For direct inquiries, message us at <span className="font-semibold text-white">+27 68 890 9658</span>.
                                </>
                            }
                            link="https://chat.whatsapp.com/J5nyjbjYscdKWCJNMcLEkm?mode=wwt"
                            linkText="Join Community Group"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;