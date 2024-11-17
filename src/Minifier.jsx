import React, { useState } from 'react';
import { minify } from 'html-minifier-terser';

const Minifier = () => {
  const [inputHtml, setInputHtml] = useState('');
  const [outputHtml, setOutputHtml] = useState('');

  const handleInputChange = (e) => {
    setInputHtml(e.target.value);
  };

  const handleMinify = () => {
    try {
      const minified = minify(inputHtml, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      });
      setOutputHtml(minified);
    } catch (error) {
      setOutputHtml('Error minifying HTML');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputHtml);
  };

  return (
    <div className="minifier-container">
      <h1>HTML Minifier Tool</h1>
      <textarea
        value={inputHtml}
        onChange={handleInputChange}
        placeholder="Enter HTML here"
        rows={10}
        cols={50}
      ></textarea>
      <div className="buttons">
        <button onClick={handleMinify}>Minify HTML</button>
        <button onClick={handleCopy} disabled={!outputHtml}>
          Copy Minified HTML
        </button>
      </div>
      <textarea
        value={outputHtml}
        readOnly
        placeholder="Minified HTML will appear here"
        rows={10}
        cols={50}
      ></textarea>
    </div>
  );
};

export default Minifier;
