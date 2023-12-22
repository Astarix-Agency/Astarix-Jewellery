import { Bracelets } from '../data'
import {Link,useNavigate} from 'react-router-dom'
import { TbAugmentedReality } from "react-icons/tb";
const earings = () => {
    
const Handle3D=(link3D)=>{
    const navigate=useNavigate();
    navigate(link3D,{state:{reload:true}})

}
    return (
        <div className="earing-head">
            {
                Bracelets.map((earing) => {
                    return (
                        <>
                        
                        <div key={earing.id} className='earing-info'>
                            <div className="earing-logo">
                                <img src={earing.image} alt='earing' />
                            </div>
                            <div className='basic-desc'>
                                <h2 className='earing-name'>
                                    {earing.name}
                                </h2>
                                <div className='price-desc'>
                                <p className='earing-desc'>
                                    {earing.desc}
                                </p>
                                <p className='earing-price'>
                                    {earing.price}
                                </p>
                                </div>
                            </div>
                            <div className="ar-3d">
                                
                            <Link to={earing.link3D} onClick={() => Handle3D(earing.link3D)}><TbAugmentedReality size={'50px'} color='black' /></Link>
                            </div>

                        </div>
                        
                        </>
                    )
                })
            }
        </div>
    )
}
export default earings;