import { useEffect } from "react";
import { useLocation } from 'react-router-dom'

function ScrollToTop(props, { history }) {
    const location = useLocation()

    useEffect(() => {
        const isHomeScreen = location.pathname === '/'

        if (!isHomeScreen) {
            window.scrollTo(0, 0)
        } else {
            window.scrollTo(0, props.homeScreenScrollPositionY)
        }
    }, [location])

    return (null)
}

export default ScrollToTop