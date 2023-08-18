import { Routes, Route, useParams, Link} from 'react-router-dom'
import AllRecipes from './AllRecipes'
import Requested from './Requested'
import Favorited from './Favorited'
import RecipePage from './RecipePage'
import AddRecipe from './AddRecipe'
import plusIcon from '../assets/plus-icon.svg'
import AllMongoRecipes from './AllMongoRecipes'
import MongoFavorites from './MongoFavorites'
import MongoRequests from './MongoRequests'
import AllVegetarian from './AllVegetarian'
import AllDesserts from './AllDesserts'
import Basics from './Basics'
import AllBBQRecipes from './BBQ'

export default function Homescreen(props) {
    const { data, mongoData, handleFavoriteToggle, handleRequestToggle, handleSelectedRecipe, handleMongoFavoriteToggle, handleMongoRequestToggle } = props

    return (
        <main>
            {/* nav menu */}
            {/* Howdy, Kevin || welcome stranger */}
            {/* <AllRecipes 
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
            /> */}
            {/* {selectedRecipe && <RecipePage
                index={3}
                data={data}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={handleSelectedRecipe}
                currentRecipe={selectedRecipe}
            />} */}

            <AllMongoRecipes 
                title="All Recipes"
                index={0}
                data={mongoData}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={handleSelectedRecipe}
                handleMongoFavoriteToggle={handleMongoFavoriteToggle}
                handleMongoRequestToggle={handleMongoRequestToggle}
                
            />

            <MongoFavorites
                title="Favorites"
                index={1}
                data={mongoData}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={handleSelectedRecipe}
                handleMongoFavoriteToggle={handleMongoFavoriteToggle}
                handleMongoRequestToggle={handleMongoRequestToggle}
            />

            <MongoRequests
                title="Requests"
                index={2}
                data={mongoData}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={handleSelectedRecipe}
                handleMongoFavoriteToggle={handleMongoFavoriteToggle}
                handleMongoRequestToggle={handleMongoRequestToggle}
            />

            <AllVegetarian
                title="Vegetarian"
                index={3}
                data={mongoData}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={handleSelectedRecipe}
                handleMongoFavoriteToggle={handleMongoFavoriteToggle}
                handleMongoRequestToggle={handleMongoRequestToggle}
            />

            <AllDesserts
                title="Desserts"
                index={4}
                data={mongoData}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={handleSelectedRecipe}
                handleMongoFavoriteToggle={handleMongoFavoriteToggle}
                handleMongoRequestToggle={handleMongoRequestToggle}
            />

            <Basics 
                title="Basics"
                index={5}
                data={mongoData}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={handleSelectedRecipe}
                handleMongoFavoriteToggle={handleMongoFavoriteToggle}
                handleMongoRequestToggle={handleMongoRequestToggle}
            />

            <AllBBQRecipes 
                title="BBQ"
                index={6}
                data={mongoData}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={handleSelectedRecipe}
                handleMongoFavoriteToggle={handleMongoFavoriteToggle}
                handleMongoRequestToggle={handleMongoRequestToggle}
            />

            <div className='add-recipes-section'>
                <Link to='/add-recipe' ><div className='plus-icon'><img src={plusIcon} ></img></div></Link>
                <div>add more recipes</div>
            </div>
          
            {/* <AddRecipe /> */}
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