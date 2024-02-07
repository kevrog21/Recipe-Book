import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

function ScrollToPosition(props) {
    const location = useLocation()

    useEffect(() => {

        const isRecipesScreen = location.pathname === '/recipes'
        const isHomeScreen = location.pathname === '/'

        if (!isRecipesScreen) {
            window.scrollTo(0, 0)
            if (isHomeScreen) {
                props.setScrollPositionsX({})
                props.setScrollPositionY()
            }
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