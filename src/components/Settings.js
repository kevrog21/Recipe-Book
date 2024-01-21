import arrow from '../assets/arrow.svg'
import { Link } from 'react-router-dom'

export default function Settings() {
    return (
        <div>
            <main>
                <div>Settings Page</div>
                <div className='customize-homescreen-container'>
                    <div>account</div>
                    <div>appearance</div>
                    <Link to='/settings/appearance'><div>appearance</div></Link>
                    <div></div>
                </div>
            </main>
        </div>
    )
}