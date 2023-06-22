import { Link } from 'react-router-dom'

export default function NavMenu(props) {
    return (
        <div className='nav-menu-container'>
            <div id='nav-menu'>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Home</div></Link>
                <Link to='/add-recipe' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Add Recipe</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Grocery List</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>All Recipes</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Blog</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Settings</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Account</div></Link>
                <Link to='/' className='nav-menu-item'><div onClick={props.handleNavItemClick}>Shop</div></Link>
            </div>
        </div>
    )
}