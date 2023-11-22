import { Link } from 'react-router-dom'
import NavMenu from './NavMenu'
import { useState, useEffect } from 'react'

export default function Header() {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)

    useEffect(() => {
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
                <Link to='/' className='app_title'><h1>bastebook</h1></Link>
                <div className='hamburger_wrapper' onClick={handleMenuToggle}>
                    <div className={`hamburger-line1 ${isNavMenuOpen ? 'rotate-hamburger-line1' : ''}`}></div>
                    <div className={`hamburger-line2 ${isNavMenuOpen ? 'rotate-hamburger-line2' : ''}`}></div>
                </div>
            </header>
            <NavMenu 
                handleNavItemClick={handleNavItemClick}
                setIsNavMenuOpen={setIsNavMenuOpen}/>
        </div>
    )
}