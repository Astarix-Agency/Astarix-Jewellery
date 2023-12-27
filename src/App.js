import './App.css';
import {useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom';
import Home from './component/home'
import {Route,Routes} from 'react-router-dom';
import Necklace_AR from './Pages/AR/Necklace/necklace_sample'
import Earing_AR from './Pages/AR/Earings/earing_sample'
import Earing2_3D from './Pages/3D/Earings/Earing2';
import Earing13D from './Pages/3D/Earings/Earing1';
import Necklace13D from './Pages/3D/Necklace/Nacklace1'
import Necklace23D from './Pages/3D/Necklace/Neacklace2'
import Necklace33D from './Pages/3D/Necklace/Necklace3'
import Bracelet from './Pages/3D/Bracelets/Bracelet1'
import Ring from './Pages/3D/Rings/Ring1'

function App() {
  const navigate=useNavigate()
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.reload) {
    navigate('/',{replace:false},{state:null})
      window.location.reload();
    }
  }, [location]);
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/ring1/1' element={<Ring/>}/>
        <Route path='/earing1/1' element={<Earing13D/>}/>
        <Route path='/bracelet1/1' element={<Bracelet/>}/>
        <Route path='/earing2/2' element={<Earing2_3D/>}/>
        <Route path='/necklace1/1' element={<Necklace13D/>}/>
        <Route path='/necklace2/2' element={<Necklace23D/>}/>
        <Route path='/necklace3/3' element={<Necklace33D/>}/>
        <Route path='/earing1/ar' element={<Earing_AR Model='Earing1' ThreeD='/earing1/1'/>}/>
        <Route path='/earing2/ar' element={<Earing_AR Model='Earing2' ThreeD='/earing2/2'/>}/>
       
        <Route path='/necklace1/ar' element={<Necklace_AR Model='Necklace1' ThreeD='/necklace1/1'/>}/>
        <Route path='/necklace2/ar' element={<Necklace_AR Model='Necklace2' ThreeD='/necklace2/2'/>}/>
        <Route path='/necklace3/ar' element={<Necklace_AR Model='Necklace3' ThreeD='/necklace3/3'/>}/>
      </Routes>
    </>
  );
}

export default App;
