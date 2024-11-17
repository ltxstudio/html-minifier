import { useState } from 'react';
import { minifyHTML } from './htmlMinifier';
import { FaArrowRight, FaClipboard } from 'react-icons/fa'; // React icons
import { motion } from 'framer-motion';

function App() {
  const [inputHtml, setInputHtml] = useState('');
  const [minifiedHtml, setMinifiedHtml] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleMinify = () => {
    setMinifiedHtml(minifyHTML(inputHtml));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(minifiedHtml);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl w-full space-y-6 bg-white p-8 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-center text-indigo-600">HTML Minifier Tool</h1>

        <div className="space-y-4">
          <textarea
            value={inputHtml}
            onChange={(e) => setInputHtml(e.target.value)}
            placeholder="Enter HTML here..."
            rows="8"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <motion.button
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md flex items-center justify-center space-x-2 hover:bg-indigo-700 transition duration-200"
            onClick={handleMinify}
            whileHover={{ scale: 1.05 }}
          >
            <span>Minify</span>
            <FaArrowRight />
          </motion.button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Minified HTML</h2>
          <textarea
            value={minifiedHtml}
            readOnly
            rows="8"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100"
          />
          
          <div className="flex justify-between items-center">
            <motion.button
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800"
              onClick={handleCopy}
              whileHover={{ scale: 1.05 }}
            >
              <FaClipboard />
              <span>{isCopied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
