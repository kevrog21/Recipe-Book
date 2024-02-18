import logoWhite from '../assets/bastebook-logo-white.svg'

export default function Footer() {

    const currentYear = new Date().getFullYear();
    
    return (
        <div className='footer-wrapper'>
            <div className='footer-logo-container'>
                <img className='footer-logo' src={logoWhite}></img>
            </div>
            <p className="footer-content">&copy; {`${currentYear}`} Kevin Rogers</p>
        </div>
    )
}