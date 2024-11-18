import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaClipboard } from 'react-icons/fa';
import About from './components/About';
import Features from './components/Features';
import WhyUseSelection from './components/WhyUseSelection';

const escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

const unescapeHtml = (safe) => {
    return safe
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "'");
};

const App = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');

    const handleEscape = () => {
        setOutputText(escapeHtml(inputText));
    };

    const handleUnescape = () => {
        setOutputText(unescapeHtml(inputText));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(outputText)
            .then(() => {
                alert('Output copied to clipboard!');
            })
            .catch(err => {
                console.error('Error copying text: ', err);
            });
    };

    return (
        <div className="app max-w-lg mx-auto p-5">
            <h1 className="text-2xl font-bold text-center mb-4">HTML Escape and Unescape Tool</h1>
            <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text here..."
                rows="5"
            />
            <div className="flex justify-center mb-4">
                <motion.button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 flex items-center"
                    onClick={handleEscape}
                    whileHover={{ scale: 1.1 }}
                >
                    Escape <FaArrowRight className="ml-2" />
                </motion.button>
                <motion.button
                    className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
                    onClick={handleUnescape}
                    whileHover={{ scale: 1.1 }}
                >
                    Unescape <FaArrowLeft className="ml-2" />
                </motion.button>
            </div>
            <h2 className="text-xl font-semibold mb-2">Output:</h2>
            <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={outputText}
                readOnly
                rows="5"
            />
            <div className="flex justify-center mb-4">
                <motion.button
                    className="bg-purple-500 text-white px-4 py-2 rounded flex items-center"
                    onClick={handleCopy}
                    whileHover={{ scale: 1.1 }}
                >
                    Copy Output <FaClipboard className="ml-2" />
                </motion.button>
            </div>
            <About />
            <Features />
            <WhyUseSelection />
        </div>
    );
};

export default App;
