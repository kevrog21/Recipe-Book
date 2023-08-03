import React, { useState, useEffect } from 'react' 
import { useParams, Link } from 'react-router-dom' 
import axios from 'axios'
import arrow from '../assets/arrow.svg'

export default function EditRecipeForm(props) {

    const {recipeId} = useParams()
    const { mongoData, selectedRecipe } = props
    const [currentRecipe, setCurrentRecipe] = useState(selectedRecipe)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (mongoData.length > 0) {
            const recipe = mongoData.find(recipe => recipe._id === recipeId)
            setCurrentRecipe(recipe)
            setIsLoading(false)
        }
    }, [mongoData, recipeId])


    if (isLoading) {
        return (
            <main>
                Loading...
            </main>
        )
    } else {
        return (
            <main>
                Here is the edit recipe page for {currentRecipe.recipeName}
            </main>
        )
    }
}