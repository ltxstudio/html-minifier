import { minify } from 'html-minifier';

export const minifyHTML = (html) => {
  return minify(html, {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    minifyJS: true,
    minifyCSS: true,
    // Add more minifier options as needed
  });
};
