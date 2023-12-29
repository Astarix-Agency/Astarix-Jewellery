import React, { useEffect,useState } from 'react';
import * as deepar from 'deepar';
import {Link,useNavigate} from 'react-router-dom'
const DeepARComponent = (props) => {
  const navigate=useNavigate();
  const [ipad, setIpad] = useState(true);

  const handleClose=()=>
  {
    navigate('/',{state:{reload:true}});

  }
  
  const arrow='<-'
  useEffect(() => {
    const initializeDeepAR = async () => {
      try {
        const deepAR = await deepar.initialize({
          licenseKey: 'edf77692c644bf8c020f2968a7d1bd0d3ba09371816d3757133868e3b7ad1a392768d1374dcc7947',
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
    function handleResize() {
      if (window.innerHeight >= 1000) {
        setIpad(true);
      } else {
        setIpad(false);
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 
  return (
    <>
      {/* Your JSX content here */}
      <div id="deepar-div" style={{ width: '100%', height: ipad?'1000px':'700px' }}>
      </div>
      <div className="controls">
          <button className='back-btn' onClick={handleClose}><Link to='/'>{arrow} Back</Link></button>
          
        </div>
    </>
  );
};

export default DeepARComponent;
