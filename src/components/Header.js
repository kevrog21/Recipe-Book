import { Link } from 'react-router-dom'
import NavMenu from './NavMenu'
import { useState, useEffect } from 'react'

export default function Header() {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)

    useEffect(() => {
        const container = document.querySelector('.nav-menu-container')
        const navMenu = document.querySelector('#nav-menu')

        if (container) {
            if (isNavMenuOpen) {
                container.classList.add('show')
                navMenu.classList.add('show')
            } else {
                container.classList.remove('show')
                navMenu.classList.remove('show')
            }
        }
    }, [isNavMenuOpen])

    const handleMenuToggle = () => {
        setIsNavMenuOpen((prevIsNavMenuOpen) => !prevIsNavMenuOpen)
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
            <NavMenu handleNavItemClick={handleNavItemClick}/>
        </div>
    )
}