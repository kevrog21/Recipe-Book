export default function Footer() {

    const currentYear = new Date().getFullYear();
    
    return (
        <div className='footer-wrapper'>
            <p className="footer-content">&copy; {`${currentYear}`} Kevin Rogers</p>
        </div>
    )
}