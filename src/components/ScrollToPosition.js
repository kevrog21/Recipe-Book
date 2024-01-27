import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

function ScrollToPosition(props) {
    const location = useLocation()
    // const allHomeScreenCardSectionContainers = Array.from(document.querySelectorAll(".cardSectionContainer"))
    const [prevPath, setPrevPath] = useState('')

    useEffect(() => {
        setPrevPath(location.pathname)

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

    useEffect(() => { 
        console.log(props.scrollPositionsX)

        // const key = '1Favorites';
        // if (props.scrollPositionsX && props.scrollPositionsX.hasOwnProperty(key)) {
        //   const item27 = props.scrollPositionsX[key];
        //   console.log(item27);
        // } else {
        //   console.log(`Key ${key} does not exist in the object.`);
        // }

        // // const item27 = props.scrollPositionsX && props.scrollPositionsX[26]
        // console.log("running item27", props.scrollPositionsX)
    }, [props.scrollPositionsX])


    return (null)
}

export default ScrollToPosition