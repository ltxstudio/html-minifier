import { useState } from 'react';
import { minify } from 'html-minifier';
import { FaFileCode, FaQuestionCircle, FaInfoCircle, FaCopy, FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';

function App() {
  const [inputHTML, setInputHTML] = useState('');
  const [outputHTML, setOutputHTML] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  // Minification options state
  const [options, setOptions] = useState({
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true,
    minifyCSS: true,
    removeEmptyAttributes: false,
  });

  // Handle input change
  const handleInputChange = (e) => setInputHTML(e.target.value);

  // Minification process
  const handleMinifyClick = () => {
    setLoading(true);
    const minified = minify(inputHTML, {
      removeComments: options.removeComments,
      collapseWhitespace: options.collapseWhitespace,
      minifyJS: options.minifyJS,
      minifyCSS: options.minifyCSS,
      removeEmptyAttributes: options.removeEmptyAttributes,
    });
    setOutputHTML(minified);
    setLoading(false);
  };

  // Copy to Clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(outputHTML);
    alert('Copied to clipboard!');
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInputHTML(reader.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-4">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center py-6"
        >
          <h1 className="text-3xl font-bold text-blue-600">HTML Minifier Tool</h1>
          <p className="text-gray-600 mt-2">Paste your HTML code below and get a minified version</p>
        </motion.header>

        {/* Minifier options */}
        <div className="flex flex-wrap justify-center space-x-4 mb-6">
          <button
            className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
            onClick={() => setShowAbout(!showAbout)}
          >
            <FaInfoCircle className="mr-2" />
            About
          </button>
          <button
            className="flex items-center bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600"
            onClick={() => setShowFeatures(!showFeatures)}
          >
            <FaFileCode className="mr-2" />
            Features
          </button>
          <button
            className="flex items-center bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600"
            onClick={() => setShowFAQ(!showFAQ)}
          >
            <FaQuestionCircle className="mr-2" />
            FAQ
          </button>
        </div>

        {/* Minifier options */}
        <div className="flex justify-center mb-6 space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.removeComments}
              onChange={() =>
                setOptions({ ...options, removeComments: !options.removeComments })
              }
              className="mr-2"
            />
            Remove Comments
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.collapseWhitespace}
              onChange={() =>
                setOptions({ ...options, collapseWhitespace: !options.collapseWhitespace })
              }
              className="mr-2"
            />
            Collapse Whitespace
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.minifyJS}
              onChange={() => setOptions({ ...options, minifyJS: !options.minifyJS })}
              className="mr-2"
            />
            Minify JS
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.minifyCSS}
              onChange={() => setOptions({ ...options, minifyCSS: !options.minifyCSS })}
              className="mr-2"
            />
            Minify CSS
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.removeEmptyAttributes}
              onChange={() =>
                setOptions({ ...options, removeEmptyAttributes: !options.removeEmptyAttributes })
              }
              className="mr-2"
            />
            Remove Empty Attributes
          </label>
        </div>

        {/* File upload */}
        <div className="flex justify-center mb-6">
          <input
            type="file"
            onChange={handleFileUpload}
            className="file:border file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg"
          />
        </div>

        {/* Input and Output */}
        <div className="flex flex-col lg:flex-row justify-center gap-6 mb-6">
          <motion.textarea
            value={inputHTML}
            onChange={handleInputChange}
            rows="10"
            className="p-4 border border-gray-300 rounded-lg w-full lg:w-1/2 focus:outline-none"
            placeholder="Paste HTML code here..."
          ></motion.textarea>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center w-full lg:w-1/2"
          >
            <button
              className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg mb-4 hover:bg-blue-600"
              onClick={handleMinifyClick}
              disabled={loading}
            >
              {loading ? 'Minifying...' : 'Minify HTML'}
            </button>

            <div className="relative">
              <textarea
                value={outputHTML}
                readOnly
                rows="10"
                className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none"
                placeholder="Minified HTML will appear here"
              ></textarea>
              <button
                className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-lg shadow-md hover:bg-green-600"
                onClick={handleCopy}
              >
                <FaCopy />
              </button>
            </div>
          </motion.div>
        </div>

        {/* About Section */}
        {showAbout && (
          <motion.section
            className="bg-white p-6 rounded-lg shadow-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">About</h2>
            <p className="text-gray-600">
              The HTML Minifier Tool allows you to paste your HTML code and receive a cleaner, minified version. It's perfect for
              web developers who want to optimize their HTML code for performance.
            </p>
          </motion.section>
        )}

        {/* Features Section */}
        {showFeatures && (
          <motion.section
            className="bg-white p-6 rounded-lg shadow-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Features</h2>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Minify HTML, CSS, and JavaScript</li>
              <li>Remove comments and unnecessary spaces</li>
              <li>Customizable minifier options</li>
              <li>Easy-to-use interface with real-time results</li>
              <li>Fast and responsive design</li>
              <li>Free and accessible for everyone</li>
            </ul>
          </motion.section>
        )}

        {/* FAQ Section */}
        {showFAQ && (
          <motion.section
            className="bg-white p-6 rounded-lg shadow-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">FAQ</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold">How does the tool work?</h3>
                <p>
                  Simply paste your HTML code into the input box, press "Minify HTML", and the tool will generate a compact version of your HTML code.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Is it free to use?</h3>
                <p>Yes! This tool is completely free and does not require any registration.</p>
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}

export default App;
