import React, { useState } from 'react';
import { minify } from 'html-minifier';
import { FaMagic, FaClipboard } from 'react-icons/fa';
import { motion } from 'framer-motion';

function App() {
    const [htmlInput, setHtmlInput] = useState('');
    const [minifiedHtml, setMinifiedHtml] = useState('');

    const handleMinify = () => {
        try {
            const minified = minify(htmlInput, {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true,
            });
            setMinifiedHtml(minified);
        } catch (error) {
            console.error('Error minifying HTML:', error);
            setMinifiedHtml('Error minifying HTML. Please check the input.');
        }
    };

    return (
        <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">HTML Minifier Tool</h1>
            <textarea
                rows="10"
                cols="50"
                placeholder="Paste your HTML code here..."
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                className="border rounded-lg p-2 w-full max-w-xl mb-4"
            />
            <motion.button
                onClick={handleMinify}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <FaMagic className="mr-2" />
                Minify HTML
            </motion.button>
            <h2 className="text-2xl font-semibold mt-6">Minified HTML</h2>
            <textarea
                rows="10"
                cols="50"
                value={minifiedHtml}
                readOnly
                className="border rounded-lg p-2 w-full max-w-xl mt-2"
            />
            <motion.button
                onClick={() => navigator.clipboard.writeText(minifiedHtml)}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <FaClipboard className="mr-2" />
                Copy to Clipboard
            </motion.button>
        </div>
    );
}

export default App;
