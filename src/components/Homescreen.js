import { useState } from 'react'
import AllRecipes from './AllRecipes'
import Requested from './Requested'
import Favorited from './Favorited'
import data from '../data'

export default function Homescreen() {

    const [recipes, setRecipes] = useState(data)

    const handleFavoriteToggle = (recipeID) => {
        console.log(recipeID)
        setRecipes(prevRecipes => {
            console.log('I ran')
            return prevRecipes.map(recipe => {
                if (recipe.id === recipeID) {
                    console.log('and then I ran!!')
                    return {
                        ...recipe,
                        isFavorited: !recipe.isFavorited
                    }
                }
                console.log(recipe.id)
                return recipe
            })
        })
    }

    const handleRequestToggle = (recipeID) => {
        console.log(recipeID)
        setRecipes(prevRecipes => {
            console.log('hello')
            return prevRecipes.map(recipe => {
                if (recipe.id === recipeID) {
                    console.log('and then I ran!!')
                    return {
                        ...recipe,
                        isRequested: !recipe.isRequested
                    }
                }
                console.log(recipe.id)
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
                    handleStarClick={handleFavoriteToggle}
                    handleBellClick={handleRequestToggle}
                />
                 <Requested
                    title="Requested"
                    index={1}
                    data={recipes}
                    handleStarClick={handleFavoriteToggle}
                    handleBellClick={handleRequestToggle}
                />
                <Favorited 
                    title="Favorites"
                    index={2}
                    data={recipes}
                    handleStarClick={handleFavoriteToggle}
                    handleBellClick={handleRequestToggle}
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