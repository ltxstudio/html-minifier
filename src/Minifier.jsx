import React, { useState } from "react";
import { minify } from "html-minifier-terser";
import { FaRegCopy, FaPlay, FaRegArrowAltCircleDown } from "react-icons/fa";
import { motion } from "framer-motion";

const Minifier = () => {
  const [inputHtml, setInputHtml] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputHtml(e.target.value);
  };

  const handleMinify = () => {
    setLoading(true);
    try {
      const minified = minify(inputHtml, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      });
      setOutputHtml(minified);
    } catch (error) {
      setOutputHtml("Error minifying HTML");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputHtml);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          HTML Minifier Tool
        </h1>

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
            onClick={handleCopy}
            disabled={!outputHtml}
            className="flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition disabled:bg-gray-400 cursor-not-allowed"
            whileTap={{ scale: 0.95 }}
          >
            <FaRegCopy /> Copy Minified HTML
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

        {/* Download Button */}
        {outputHtml && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-center"
          >
            <a
              href={`data:text/html;charset=utf-8,${encodeURIComponent(outputHtml)}`}
              download="minified.html"
              className="flex justify-center items-center gap-2 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            >
              <FaRegArrowAltCircleDown /> Download Minified HTML
            </a>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-4 flex justify-center items-center text-blue-500">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-current border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Minifier;
