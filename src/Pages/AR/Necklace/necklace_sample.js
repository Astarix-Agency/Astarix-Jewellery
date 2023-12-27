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
          licenseKey: '7bfd3466084e77afcf7c2615b54ba7f452de93638926cd9eebccbdcdee0a238465db251fc346fa39',
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
