import Card from './Card'
import AllRecipes from './AllRecipes'
import Requested from './Requested'
import Favorited from './Favorited'
import Data from '../data.js'

export default function Homescreen() {




    return (
            <main>
                <AllRecipes 
                    title="All Recipes"
                    index={0}
                />
                <Requested
                    title="Requested"
                    index={1}
                />
                <Favorited 
                    title="Favorites"
                    index={2}
                />
            </main>
    )
}