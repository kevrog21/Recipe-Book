import {Link} from 'react-router-dom'

export default function Header() {
    return (
        <header>
            <Link to='/'><h1 className='app_title'>Recipe<br />Box</h1></Link>
            <div className='hamburger_wrapper'>
                
            </div>


        </header>
    )
}