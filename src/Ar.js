import React, { useEffect } from 'react';
import * as deepar from 'deepar';

const DeepARComponent = () => {
  useEffect(() => {
    const initializeDeepAR = async () => {
      try {
        const deepAR = await deepar.initialize({
          licenseKey: '441e530e5ddbf508cc370fb2fede9dde9ea3e297534c6ca6e52937d9181cbbb10f3dd181de978028',
          previewElement: document.querySelector('#deepar-div'),
          effect: '/AR/Vendetta.deepar'
        });

        // Add any additional logic or handling here
        console.log('DeepAR initialized:', deepAR);
      } catch (error) {
        console.error('Error initializing DeepAR:', error);
      }
    };

    initializeDeepAR();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
      {/* Your JSX content here */}
      <div id="deepar-div" style={{ width: '100vw', height: '100vh' }}>
        {/* Any additional JSX content for your component */}
      </div>
    </div>
  );
};

export default DeepARComponent;
