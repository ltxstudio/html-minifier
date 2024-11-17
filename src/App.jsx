import React, { useState } from "react";
import { minify } from "html-minifier-terser";
import { FaRegCopy, FaPlay, FaRegArrowAltCircleDown, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

function App() {
  const [inputHtml, setInputHtml] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    collapseInlineStyles: true,
    preserveLineBreaks: false,
    minifyCSS: true,
    minifyJS: true,
  });

  const handleInputChange = (e) => {
    setInputHtml(e.target.value);
  };

  const handleMinify = () => {
    setLoading(true);
    try {
      const minified = minify(inputHtml, {
        collapseWhitespace: options.collapseWhitespace,
        removeComments: options.removeComments,
        removeRedundantAttributes: options.removeRedundantAttributes,
        useShortDoctype: options.useShortDoctype,
        removeEmptyAttributes: options.removeEmptyAttributes,
        collapseInlineStyles: options.collapseInlineStyles,
        preserveLineBreaks: options.preserveLineBreaks,
        minifyCSS: options.minifyCSS,
        minifyJS: options.minifyJS,
      });
      setOutputHtml(minified);
    } catch (error) {
      setOutputHtml("Error minifying HTML");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputHtml).then(() => {
      alert("Minified HTML copied to clipboard!");
    });
  };

  const handleReset = () => {
    setInputHtml("");
    setOutputHtml("");
    setOptions({
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      collapseInlineStyles: true,
      preserveLineBreaks: false,
      minifyCSS: true,
      minifyJS: true,
    });
  };

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  const handleDownload = () => {
    const blob = new Blob([outputHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "minified.html";
    link.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">HTML Minifier Tool</h1>

        {/* Input HTML */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <textarea
            value={inputHtml}
            onChange={handleInputChange}
            placeholder="Enter HTML here"
            rows={10}
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          ></textarea>
        </motion.div>

        {/* Minifier Options */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">Minifier Options</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                name="collapseWhitespace"
                checked={options.collapseWhitespace}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Collapse Whitespace
            </label>
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                name="removeComments"
                checked={options.removeComments}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Remove Comments
            </label>
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                name="removeRedundantAttributes"
                checked={options.removeRedundantAttributes}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Remove Redundant Attributes
            </label>
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                name="useShortDoctype"
                checked={options.useShortDoctype}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Use Short Doctype
            </label>
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                name="removeEmptyAttributes"
                checked={options.removeEmptyAttributes}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Remove Empty Attributes
            </label>
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                name="collapseInlineStyles"
                checked={options.collapseInlineStyles}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Collapse Inline Styles
            </label>
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                name="preserveLineBreaks"
                checked={options.preserveLineBreaks}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Preserve Line Breaks
            </label>
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                name="minifyCSS"
                checked={options.minifyCSS}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Minify CSS
            </label>
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                name="minifyJS"
                checked={options.minifyJS}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Minify JS
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between gap-4">
          <motion.button
            onClick={handleMinify}
            className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            whileTap={{ scale: 0.95 }}
          >
            <FaPlay /> Minify
          </motion.button>

          <motion.button
            onClick={handleReset}
            className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            whileTap={{ scale: 0.95 }}
          >
            <FaTimes /> Reset
          </motion.button>
        </div>

        {/* Minified HTML Output */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <textarea
            value={outputHtml}
            readOnly
            placeholder="Minified HTML will appear here"
            rows={10}
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          ></textarea>
        </motion.div>

        {/* Action Buttons for Output */}
        {outputHtml && !loading && (
          <div className="mt-4 flex justify-between gap-4">
            <motion.button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            >
              <FaRegCopy /> Copy Output
            </motion.button>

            <motion.button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            >
              <FaRegArrowAltCircleDown /> Download Minified HTML
            </motion.button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-4 flex justify-center items-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-solid border-current border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
