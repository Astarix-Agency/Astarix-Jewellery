import Header from './header';
import Earing from './earings';
import Necklace from './necklace';
import Ring from './ring';
import Bracelet from './bracelet';
import { useState } from 'react';

const Home = () => {
    const [earing, setEaring] = useState(false);
    const [necklace, setNecklace] = useState(false);
    const [bracelet, setbracelet] = useState(false);
    const [ring, setring] = useState(false);
    const [All, setAll] = useState(true); 

    const showAll = () => {
        setAll(true);
        setEaring(false);
        setNecklace(false);
        setring(false);
        setbracelet(false);
    };

    const showEaring = () => {
        setAll(false);
        setEaring(true);
        setNecklace(false);
        setring(false);
        setbracelet(false);
    };
    const showbracelet = () => {
        setAll(false);
        setEaring(false);
        setNecklace(false);
        setring(false);
        setbracelet(true);
    };
    const showRing = () => {
        setAll(false);
        setEaring(false);
        setNecklace(false);
        setring(true);
        setbracelet(false);
    };

    const showNecklace = () => {
        setAll(false);
        setEaring(false);
        setNecklace(true);
        setring(false);
        setbracelet(false);
    };

    return (
        <>
            <Header />
            <div className='tags'>
                <button onClick={showAll}>All</button>
                <button onClick={showEaring}>Earings</button>
                <button onClick={showNecklace}>Necklaces</button>
                <button onClick={showbracelet}>Bracelet</button>
                <button onClick={showRing}>Rings</button>
            </div>
            <div className="earing">
                <div className="ornament-head">
                    <div>
                    <h1>{All ? 'All' : earing ? 'Earrings' : necklace?'Necklace':bracelet?'Bracelet':'Rings'}</h1>
                    </div>
                </div>
                {All && 
                <>
                    <Earing/>
                    <Necklace/>
                    <Bracelet/>
                    <Ring/>
                </>}
                {earing && <Earing />}
                {necklace && <Necklace />}
                {bracelet && <Bracelet />}
                {ring && <Ring />}
            </div>
        </>
    );
};

export default Home;
