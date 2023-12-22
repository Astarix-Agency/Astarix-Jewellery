import Logo from '../images/astarix-logo.png'
import { CgProfile } from "react-icons/cg";
import Searchfilter from '../images/search-filter.png'
const header = () => {
    return (
        <>
            <div className="header">
                <div className='logo'>
                    <img src={Logo} alt='logo' />
                </div>
                <div className='profile'>
                    <CgProfile size={'40px'} color='black' />
                </div>
            </div>
            <div className='search-filter'>
                <img src={Searchfilter} alt='search'/>
            </div>
            
        </>
    )
}
export default header