import { Link } from 'react-router-dom'
import NavMenu from './NavMenu'
import { useState, useEffect } from 'react'

export default function Header() {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const [navMenuInteractedWith, setNavMenuInteractedWith] = useState(false)

    function showAndDisableNavMenu() {
        const container = document.querySelector('.nav-menu-container')
        const navMenu = document.querySelector('#nav-menu')
        const mainEl = document.querySelector('main')

        if (container) {
            if (isNavMenuOpen) {
                container.classList.add('show')
                navMenu.classList.add('show')
                mainEl.classList.add('disable-pointer-events')
                document.documentElement.style.overflow = 'hidden'
                document.body.style.overflow = 'hidden'
                
            } else {
                container.classList.remove('show')
                navMenu.classList.remove('show')
                mainEl.classList.remove('disable-pointer-events')
                document.documentElement.style.overflow = ''
                document.body.style.overflow = ''
            }
        }
    }

    useEffect(() => {
        showAndDisableNavMenu()
    }, [isNavMenuOpen])

    const handleMenuToggle = () => {
        setIsNavMenuOpen((prevIsNavMenuOpen) => !prevIsNavMenuOpen)
        setNavMenuInteractedWith(true)
    }

    const handleNavItemClick = () => {
        setIsNavMenuOpen(false)
    }

    return (
        <div>
            <header>
                <Link to='/' className='app_title'><h1>bastebook</h1></Link>
                <div className='hamburger_wrapper' onClick={handleMenuToggle}>
                    <div className={`hamburger-line1 ${isNavMenuOpen ? 'rotate-hamburger-line1' : navMenuInteractedWith ? 'unrotate-hamburger-line1' : ''}`}></div>
                    <div className={`hamburger-line2 ${isNavMenuOpen ? 'rotate-hamburger-line2' : navMenuInteractedWith ? 'unrotate-hamburger-line2' : ''}`}></div>
                </div>
            </header>
            <NavMenu 
                handleNavItemClick={handleNavItemClick}
                isNavMenuOpen={isNavMenuOpen}
                setIsNavMenuOpen={setIsNavMenuOpen}
                showAndDisableNavMenu={showAndDisableNavMenu}/>
        </div>
    )
}