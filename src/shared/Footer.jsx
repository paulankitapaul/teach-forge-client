import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <h2 className="text-xl font-bold">Teach Forge</h2>
                    <p className="text-sm text-gray-400">Empowering education, one class at a time.</p>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition">Contact</a>
                </div>
            </div>
            <div className="text-center text-xs text-gray-500 mt-4">
                © {new Date().getFullYear()} Teach Forge. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
