import './App.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from './component/home';
import { Route, Routes } from 'react-router-dom';
import Necklace_AR from './Pages/AR/Necklace/necklace_sample';
import Earing_AR from './Pages/AR/Earings/earing_sample';
import Earing2_3D from './Pages/3D/Earings/Earing2';
import Earing13D from './Pages/3D/Earings/Earing1';
import Earing33D from './Pages/3D/Earings/Earing3';
import Necklace13D from './Pages/3D/Necklace/Necklace1';
import Necklace23D from './Pages/3D/Necklace/Necklace2';
import Bracelet from './Pages/3D/Bracelets/Bracelet1';
import Ring from './Pages/3D/Rings/Ring1';
import { useState } from 'react';

function App() {
  const [ipad, setIpad] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.reload) {
      navigate('/', { replace: false }, { state: null });
      window.location.reload();
    }
    function handleResize() {
      setIpad(window.innerWidth >= 1000);
    }
  
    handleResize();
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location],[]);

  const getModifiedModel = (baseModel) => {
    return ipad ? `${baseModel}_ipad` : baseModel;
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ring1/1' element={<Ring />} />
        <Route path='/earing1/1' element={<Earing13D />} />
        <Route path='/earing3/3' element={<Earing33D />} />
        <Route path='/bracelet1/1' element={<Bracelet />} />
        <Route path='/earing2/2' element={<Earing2_3D />} />
        <Route path='/necklace1/1' element={<Necklace13D />} />
        <Route path='/necklace2/2' element={<Necklace23D />} />
        <Route path='/earing1/ar' element={<Earing_AR Model={getModifiedModel('Earing1')} ThreeD='/earing1/1' />} />
        <Route path='/earing2/ar' element={<Earing_AR Model={getModifiedModel('Earing2')} ThreeD='/earing2/2' />} />
        <Route path='/earing3/ar' element={<Earing_AR Model={getModifiedModel('Earing3')} ThreeD='/earing2/2' />} />
        <Route path='/necklace1/ar' element={<Necklace_AR Model='Necklace1' ThreeD='/necklace2/2' />} />
        <Route path='/necklace2/ar' element={<Necklace_AR Model='Necklace2' ThreeD='/necklace3/3' />} />
      </Routes>
    </>
  );
}

export default App;
