import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

function ScrollToPosition(props) {
    const location = useLocation()
    const allHomeScreenCardSectionContainers = Array.from(document.querySelectorAll(".cardSectionContainer"))
    const [prevPath, setPrevPath] = useState('')

    useEffect(() => {
        setPrevPath(location.pathname)

        const isHomeScreen = location.pathname === '/'

        if (!isHomeScreen) {
            window.scrollTo(0, 0)

            if (prevPath === '/') {
                const initialScrollPositions = allHomeScreenCardSectionContainers.reduce((acc, sectionContainer) => {
                    const distanceScrolled = sectionContainer.scrollLeft

                    acc[sectionContainer.id] = distanceScrolled
                    return acc
                  }, {})

                  props.setScrollPositionY(window.scrollY)
                  
                  props.setScrollPositionsX(initialScrollPositions)
            }
        } else {
            window.scrollTo(0, props.homeScreenScrollPositionY)
            console.log("scroll to top logs", props.scrollPositionsX)
        }

        console.log("allHomeScreenCardSectionContainers", allHomeScreenCardSectionContainers)

    }, [location])

    useEffect(() => { 
        console.log(props.scrollPositionsX)

        const key = '1Favorites';
        if (props.scrollPositionsX && props.scrollPositionsX.hasOwnProperty(key)) {
          const item27 = props.scrollPositionsX[key];
          console.log(item27);
        } else {
          console.log(`Key ${key} does not exist in the object.`);
        }

        // // const item27 = props.scrollPositionsX && props.scrollPositionsX[26]
        // console.log("running item27", props.scrollPositionsX)
    }, [props.scrollPositionsX])


    return (null)
}

export default ScrollToPosition