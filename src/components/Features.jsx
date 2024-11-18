import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Features = () => {
    const features = [
        "Easy to use interface",
        "Real-time escape and unescape",
        "Responsive design for all devices",
        "Copy output to clipboard",
        "Lightweight and fast performance",
    ];

    return (
        <section className="my-8">
            <h2 className="text-xl font-bold text-center mb-4">Features</h2>
            <ul className="list-disc list-inside">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-2">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        {feature}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Features;
