import { Necklaces } from '../data'
import {Link,useNavigate} from 'react-router-dom'
import { TbAugmentedReality } from "react-icons/tb";
import { TbAugmentedReality2 } from "react-icons/tb";
const necklace = () => {
    
const Handle3D=(link3D)=>{
    const navigate=useNavigate();
    navigate(link3D,{state:{reload:true}})

}
    return (
        <>
            <div className="ornament-head">
                
            </div>
            <div className="earing-head">
                {
                    Necklaces.map((Necklace)=>{
                        return(
                            <div key={Necklace.id} className='earing-info'>
                            <div className="earing-logo">
                                <img src={Necklace.image} alt='earing' />
                            </div>
                            <div className='basic-desc'>
                                <h2 className='earing-name'>
                                    {Necklace.name}
                                </h2>
                                <div className='price-desc'>
                                <p className='earing-desc'>
                                    {Necklace.desc}
                                </p>
                                <p className='earing-price'>
                                    {Necklace.price}
                                </p>
                                </div>
                            </div>
                            <div className="ar-3d">
                                <Link to={Necklace.linkAR}><TbAugmentedReality2 size={'50px'} color='black' /></Link>
                                <Link to={Necklace.link3D} onClick={() => Handle3D(Necklace.link3D)}><TbAugmentedReality size={'50px'} color='black' /></Link>
                            </div>

                        </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default necklace;
