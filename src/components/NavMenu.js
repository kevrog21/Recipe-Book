import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function NavMenu(props) {

    function closeNavMenu() {
        props.setIsNavMenuOpen(false)
    }

    useEffect(() => {
        props.showAndDisableNavMenu()
    }, [props.isNavMenuOpen])

    return (
        <div className='nav-menu-container' onClick={closeNavMenu} style={props.isNavMenuOpen ? {} : {pointerEvents: 'none'}}>
            <div id='nav-menu' className=''>
                <div id='nav-search-bar'>search...</div>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Home</div></Link>
                <Link to='/recipes' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Recipes</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Meal Planning</div></Link>
                {/* <Link to='/add-recipe' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Add Recipe</div></Link> */}
                {/* <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Grocery List</div></Link> */}
                
                <Link to='/settings' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Profile</div></Link>
                <Link to='/settings' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Settings</div></Link>
                {/* <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Account</div></Link> */}
                <Link to='/blog' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Blog</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>About</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Donate</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Shop</div></Link>
            </div>
        </div>
    )
}