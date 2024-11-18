import React from 'react';
import { FaShieldAlt, FaUser Friends, FaClock } from 'react-icons/fa';

const WhyUseSelection = () => {
    return (
        <section className="my-8">
            <h2 className="text-xl font-bold text-center mb-4">Why Use Selection?</h2>
            <div className="flex flex-col md:flex-row justify-around">
                <div className="flex flex-col items-center mb-4 md:mb-0">
                    <FaShieldAlt className="text-blue-500 text-4xl mb-2" />
                    <h3 className="font-bold">Safety</h3>
                    <p className="text-center">Encode HTML characters to prevent XSS attacks.</p>
                </div>
                <div className="flex flex-col items-center mb-4 md:mb-0">
                    <FaUser Friends className="text-blue-500 text-4xl mb-2" />
                    <h3 className="font-bold">Community</h3>
                    <p className="text-center">Built by developers for developers.</p>
                </div>
                <div className="flex flex-col items-center">
                    <FaClock className="text-blue-500 text-4xl mb-2" />
                    <h3 className="font-bold">Efficiency</h3>
                    <p className="text-center">Quickly escape and unescape HTML content.</p>
                </div>
            </div>
        </section>
    );
};

export default WhyUseSelection;
