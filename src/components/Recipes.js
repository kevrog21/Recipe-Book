import { Routes, Route, useParams, Link, useLocation} from 'react-router-dom'
import { useEffect, useState, } from 'react'
import plusIcon from '../assets/plus-icon.svg'
import AllMongoRecipes from './AllMongoRecipes'
import MongoFavorites from './MongoFavorites'
import MongoRequests from './MongoRequests'
import RecipeSectionTemplate from './RecipeSectionTemplate'

export default function Recipes(props) {
    const { data, mongoData, handleFavoriteToggle, handleRequestToggle, updateScrollOnClick, handleMongoFavoriteToggle, handleMongoRequestToggle, defaultTagWords, moreTagWords } = props

    const allTagWords = [...defaultTagWords, ...moreTagWords]

    useEffect(() => {
        window.scrollTo(0, props.homeScreenScrollPositionY)
    }, [props.homeScreenScrollPositionY])

    const recipePageSectionElements = allTagWords.map((tag, index) => {
        return (
            <RecipeSectionTemplate
                key={tag+index}
                title={tag}
                index={index}
                data={mongoData}
                handleCardClick={updateScrollOnClick}
                handleMongoFavoriteToggle={handleMongoFavoriteToggle}
                handleMongoRequestToggle={handleMongoRequestToggle}
            />
        )
    })

    return (
        <main>
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

            <MongoFavorites
                title="Favorites"
                index={1}
                data={mongoData}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={updateScrollOnClick}
                handleMongoFavoriteToggle={handleMongoFavoriteToggle}
                handleMongoRequestToggle={handleMongoRequestToggle}
            />

            <MongoRequests
                title="Requests"
                index={2}
                data={mongoData}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={updateScrollOnClick}
                handleMongoFavoriteToggle={handleMongoFavoriteToggle}
                handleMongoRequestToggle={handleMongoRequestToggle}
            />

            {recipePageSectionElements}

            <div className='add-recipes-section'>
                <Link to='/add-recipe'><div className='plus-icon'><img src={plusIcon} ></img></div></Link>
                <div>add recipe</div>
            </div>

            
            {/* Suggested */}
            {/* top-rated - and add the rating in top left of card*/}
            {/* most cooked  - and add the number in top left of card*/}
            {/* Planned Meals - calendar view?*/}
            {/* nutritious */}
            {/* vegetarian */}
            {/* quicky meals */}
        </main>
    )

}