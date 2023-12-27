import React, { useEffect } from 'react';
import * as deepar from 'deepar';
import {Link,useNavigate} from 'react-router-dom'
const DeepARComponent = (props) => {
  const navigate=useNavigate();
  const handleClose=()=>
  {
    navigate('/',{state:{reload:true}});

  }
  
  const arrow='<-'
  useEffect(() => {
    const initializeDeepAR = async () => {
      try {
        const deepAR = await deepar.initialize({
          licenseKey: '8f06fff3c7f2ea62499be74656cd913c81a3702be39cbe36128e3d0dfc39d417d674fd06f7cf9a1d',
          previewElement: document.querySelector('#deepar-div'),
          effect: `/AR/${props.Model}.deepar`
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
    <>
      {/* Your JSX content here */}
      <div id="deepar-div" style={{ width: '100%', height: '700px' }}>
      </div>
      <div className="controls">
          <button className='back-btn' onClick={handleClose}><Link to='/'>{arrow} Back</Link></button>
          
        </div>
    </>
  );
};

export default DeepARComponent;
