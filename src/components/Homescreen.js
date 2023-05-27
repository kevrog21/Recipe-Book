import { useState } from 'react'
import AllRecipes from './AllRecipes'
import Requested from './Requested'
import Favorited from './Favorited'
import RecipePage from './RecipePage'
import AddRecipe from './AddRecipe'
import data from '../data'

export default function Homescreen() {

    const [recipes, setRecipes] = useState(data)

    const [selectedRecipe, setSelectedRecipe] = useState()

    const handleSelectedRecipe = (clickedRecipe) => {
        setSelectedRecipe(clickedRecipe)
    }

    const handleFavoriteToggle = (recipeID) => {
        // update database with new value and send an error if unsuccessful
        console.log(recipeID)
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
        // or you can update database with new value if you want the UI to update quicker
    }

    const handleRequestToggle = (recipeID) => {
        console.log(recipeID)
        setRecipes(prevRecipes => {
            return prevRecipes.map(recipe => {
                if (recipe.id === recipeID) {
                    return {
                        ...recipe,
                        isRequested: !recipe.isRequested
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
                    handleStarClick={handleFavoriteToggle}
                    handleBellClick={handleRequestToggle}
                    handleCardClick={handleSelectedRecipe}
                />
                 <Requested
                    title="Requested"
                    index={1}
                    data={recipes}
                    handleStarClick={handleFavoriteToggle}
                    handleBellClick={handleRequestToggle}
                    handleCardClick={handleSelectedRecipe}
                />
                <Favorited 
                    title="Favorites"
                    index={2}
                    data={recipes}
                    handleStarClick={handleFavoriteToggle}
                    handleBellClick={handleRequestToggle}
                    handleCardClick={handleSelectedRecipe}
                />
                {selectedRecipe && <RecipePage
                    index={3}
                    data={recipes}
                    handleStarClick={handleFavoriteToggle}
                    handleBellClick={handleRequestToggle}
                    handleCardClick={handleSelectedRecipe}
                    currentRecipe={selectedRecipe}
                />}
                <AddRecipe />
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