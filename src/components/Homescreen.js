import { useState } from 'react'
import AllRecipes from './AllRecipes'
import Requested from './Requested'
import Favorited from './Favorited'
import data from '../data'

export default function Homescreen() {

    const [recipes, setRecipes] = useState(data)

    const handleFavoriteToggle = (recipeID) => {
        setRecipes(prevRecipes => {
            return prevRecipes.map(recipe => {
                if (recipe.id === recipeID) {
                    return {
                        ...recipe,
                        isFavorited: !recipe.isFavorited
                    }
                }
                return recipe
            })
        })
    }


    return (
            <main>
                {/* nav menu */}
                {/* Howdy, Kevin || welcome stranger */}
                <AllRecipes 
                    title="All Recipes"
                    index={0}
                    data={recipes}
                />
                 <Requested
                    title="Requested"
                    index={1}
                    data={recipes}
                />
                <Favorited 
                    title="Favorites"
                    index={2}
                    data={recipes}
                />
                {/* Suggested */}
                {/* top-rated - and add the rating in top left of card*/}
                {/* most cooked  - and add the number in top left of card*/}
                {/* Planned Meals - calendar view?*/}
                {/* nutritious */}
                {/* vegetarian */}
                {/* all sides */}
                {/* all mains */}
                {/* all desserts */}
                {/* all drinks */}
                {/* quicky meals */}

                {/* footer */}
            </main>
    )
}