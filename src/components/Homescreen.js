import { Link } from 'react-router-dom'
import AllMongoRecipes from './AllMongoRecipes'


export default function Homescreen(props) {
    const { data, mongoData, handleFavoriteToggle, handleRequestToggle, updateScrollOnClick, handleMongoFavoriteToggle, handleMongoRequestToggle, defaultTagWords, moreTagWords } = props


    return (
        <main>

            <div id='successful-delete-msg' className='hide'>
                <div className='deletion-container'>
                    successfully deleted
                </div>
            </div>

            <div className='home-animation'></div>

            <div className='home-btn-container'>
                <Link to='/recipes' className='recipes-button-container'><button className='recipes-button'>Find Recipes</button></Link>
                <button className='upload-btn'>Upload your favorite recipes</button>
            </div>
            

            <AllMongoRecipes
                title="All Recipes"
                index={0}
                data={mongoData}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={updateScrollOnClick}
                handleMongoFavoriteToggle={handleMongoFavoriteToggle}
                handleMongoRequestToggle={handleMongoRequestToggle}
            />

            <div className='no-ads-text'>
                no ads. just food.
            </div>
        </main>
    )
}