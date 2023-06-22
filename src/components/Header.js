import { Link } from 'react-router-dom'
import NavMenu from './NavMenu'
import { useState } from 'react'

export default function Header() {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)

    const handleMenuToggle = () => {
        setIsNavMenuOpen(!isNavMenuOpen)
    }

    const handleNavItemClick = () => {
        setIsNavMenuOpen(false)
    }

    return (
        <div>
            <header>
                <Link to='/' className='app_title'><h1>Recipe<br />Box</h1></Link>
                <div className='hamburger_wrapper' onClick={handleMenuToggle}>
                    <div id='hamburger-line1'></div>
                    <div id='hamburger-line2'></div>
                </div>
            </header>
            {isNavMenuOpen && <NavMenu handleNavItemClick={handleNavItemClick}/>}
        </div>

        
        
    )
}