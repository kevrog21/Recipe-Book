import { Link, useLocation } from 'react-router-dom'
import NavMenu from './NavMenu'
import { useState, useEffect } from 'react'
import logo from '../assets/bastebook-logo.svg'
import plusIcon from '../assets/plus-icon.svg'

export default function Header(props) {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const [navMenuInteractedWith, setNavMenuInteractedWith] = useState(false)

    const location = useLocation()

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
        if (location.pathname === '/') {
            window.scrollTo(0, 0)
            props.setScrollPositionY(0)
        }
    }

    return (
        <div>
            <header className={isNavMenuOpen ? 'header-shadow' : ''}>
                <Link to='/' className='logo-container' onClick={handleNavItemClick}><img className='header-logo' src={logo}></img></Link>
                <Link to='/' className='app_title' onClick={handleNavItemClick}><h1>bastebook</h1></Link>
                <div className='hamburger_wrapper' onClick={handleMenuToggle}>
                    <div className={`hamburger-line1 ${isNavMenuOpen ? 'rotate-hamburger-line1' : navMenuInteractedWith ? 'unrotate-hamburger-line1' : ''}`}></div>
                    <div className={`hamburger-line2 ${isNavMenuOpen ? 'rotate-hamburger-line2' : navMenuInteractedWith ? 'unrotate-hamburger-line2' : ''}`}>
                        <div className={`pan-handle ${isNavMenuOpen ? 'show-handle-animation' : ''}`}></div>
                    </div>
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