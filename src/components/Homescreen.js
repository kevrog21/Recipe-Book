import { Routes, Route, useParams} from 'react-router-dom'
import AllRecipes from './AllRecipes'
import Requested from './Requested'
import Favorited from './Favorited'
import RecipePage from './RecipePage'
import AddRecipe from './AddRecipe'

export default function Homescreen(props) {
    const { data, handleFavoriteToggle, handleRequestToggle, handleSelectedRecipe } = props

    return (
        <main>
            {/* nav menu */}
            {/* Howdy, Kevin || welcome stranger */}
            <AllRecipes 
                title="All Recipes"
                index={0}
                data={data}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={handleSelectedRecipe}
            />
            <Requested
                title="Requested"
                index={1}
                data={data}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={handleSelectedRecipe}
            />
            <Favorited 
                title="Favorites"
                index={2}
                data={data}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={handleSelectedRecipe}
            />
            {/* {selectedRecipe && <RecipePage
                index={3}
                data={data}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={handleSelectedRecipe}
                currentRecipe={selectedRecipe}
            />} */}
          
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