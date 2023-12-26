import React, { useEffect } from 'react';
import * as deepar from 'deepar';
import {Link,useNavigate} from 'react-router-dom'
const DeepARComponent = (props) => {
  const navigate=useNavigate();
  const handleClose=()=>
  {
    navigate('/',{state:{reload:true}});

  }
  const handle3D=()=>
  {
    navigate(`${props.ThreeD}`,{state:{reload:true}});

  }
  const arrow='<-'
  useEffect(() => {
    const initializeDeepAR = async () => {
      try {
        const deepAR = await deepar.initialize({
          licenseKey: 'bb083aea903eaccffb0572950babc1abbe3440a5d7927b2f45427ba04ea741c48b12ad91c858aa93',
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
          <button className='view-ar' onClick={handle3D}><Link to={props.ThreeD}>View in 3D</Link></button>
        </div>
    </>
  );
};

export default DeepARComponent;
