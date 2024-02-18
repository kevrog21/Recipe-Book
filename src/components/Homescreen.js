import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PopularRecipes from './PopularRecipes'


export default function Homescreen(props) {
    const { data, mongoData, handleFavoriteToggle, handleRequestToggle, updateScrollOnClick, handleMongoFavoriteToggle, handleMongoRequestToggle, defaultTagWords, moreTagWords } = props

    useEffect(() => {
        props.setPrevPathHome(true)
    }, [])
    

    return (
        <main>

            <div id='successful-delete-msg' className='hide'>
                <div className='deletion-container'>
                    successfully deleted
                </div>
            </div>

            <div className='home-animation'></div>

            <div className='home-btn-container'>
                <Link to='/recipes' className='recipes-button-container'><button className='recipes-button' onClick={props.handleFindRecipesClick}>Find Recipes</button></Link>
                <Link to='/add-recipe' className='upload-button-container'><button className='upload-btn'>Upload your favorite recipes</button></Link>
            </div>
            

            <PopularRecipes
                title="Popular Recipes"
                index={0}
                data={mongoData}
                handleStarClick={handleFavoriteToggle}
                handleBellClick={handleRequestToggle}
                handleCardClick={updateScrollOnClick}
                handleMongoFavoriteToggle={handleMongoFavoriteToggle}
                handleMongoRequestToggle={handleMongoRequestToggle}
            />
            <div className='no-ads-text-conainer'>
                <div className='no-ads-text'>no ads. just food.</div>
                <div className='no-ads-text'>no ads. just food.</div>
                <div className='no-ads-text dark-grey'>no ads. just food.</div>
                <div className='no-ads-text'>no ads. just food.</div>
                <div className='no-ads-text'>no ads. just food.</div>
            </div>
        </main>
    )
}