import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

function ScrollToPosition(props) {
    const location = useLocation()

    useEffect(() => {

        const isHomeScreen = location.pathname === '/'

        if (!isHomeScreen) {
            window.scrollTo(0, 0)

        } else {
            window.scrollTo(0, props.homeScreenScrollPositionY)

            const allHomeScreenCardSectionContainers = Array.from(document.querySelectorAll(".cardsScrollContainer"))
            
            if (props.scrollPositionsX) {
                allHomeScreenCardSectionContainers.forEach(container => {
                    container.scrollLeft = props.scrollPositionsX[container.id]
                })
            }
        }

    }, [location])

    return (null)
}

export default ScrollToPosition