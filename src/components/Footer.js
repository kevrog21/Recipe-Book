import { Link } from 'react-router-dom'
import logoWhite from '../assets/bastebook-logo-white.svg'

export default function Footer() {

    const currentYear = new Date().getFullYear();
    
    return (
        <div className='footer-wrapper'>
            <div className='footer-logo-container'>
                <Link to='/' className='footer-logo'><img  src={logoWhite}></img></Link>
            </div>
            <p className="footer-content">&copy; {`${currentYear}`} Kevin Rogers</p>
        </div>
    )
}