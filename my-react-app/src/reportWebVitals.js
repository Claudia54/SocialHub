/**
 * Function responsible for recording application performance metrics using the 'web-vitals' library.
 * @param {Function} onPerfEntry - Callback function to process performance metrics.
 * This function dynamically imports the 'web-vitals' measurement functions and executes them
 * using the provided callback function.
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
