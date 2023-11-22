import { Link } from 'react-router-dom'

export default function NavMenu(props) {

function closeNavMenu() {
    props.setIsNavMenuOpen(false)
}

    return (
        <div className='nav-menu-container' onClick={closeNavMenu}>
            <div id='nav-menu' className=''>
                <div id='nav-search-bar'>search...</div>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Home</div></Link>
                <Link to='/add-recipe' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Add Recipe</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Grocery List</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>All Recipes</div></Link>
                <Link to='/blog' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Blog</div></Link>
                <Link to='/settings' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Settings</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Account</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Shop</div></Link>
            </div>
        </div>
    )
}