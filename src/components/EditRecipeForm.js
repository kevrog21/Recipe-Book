import React, { useState, useEffect } from 'react' 
import { useParams, Link } from 'react-router-dom'
import { useNavigateToLink } from './ToHomePage'
import axios from 'axios'
import arrow from '../assets/arrow.svg'
import arrowLight from '../assets/arrow-grey.svg'
import trashIcon from '../assets/trash-icon.svg'
import closeIcon from '../assets/close-x.svg'

export default function EditRecipeForm(props) {

    const {recipeId} = useParams()
    const { mongoData, selectedRecipe } = props
    const [currentRecipe, setCurrentRecipe] = useState(selectedRecipe)
    const [imageObject, setImageObject] = useState({})
    const [imgPreview, setImgPreview] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [finalDataObject, setFinalDataObject] = useState({})
    const navigate = useNavigateToLink()

    const defaultTagWords = ['main', 'starter', 'dessert', 'breakfast', 'lunch', 'dinner', 'brunch', 'drinks', 
    'winter meals', 'summer meals', 'sides', 'quick', 'vegetarian', 'vegan', 'gluten free', 'dairy free', 'basics']
    const moreTagWords = ['BBQ', 'seafood', 'holiday', 'halloween', 'thanksgiving', 'christmas', 'hanukkah', '4th of july', 
'cost friendly', 'something light', 'pasta', 'healthy', "dad's recipe" , 'the balcony', 'snacks']
    const [tagWords, setTagWords] = useState([defaultTagWords])
    const [selectedTagWords, setSelectedTagWords] = useState([])
    const [showMoreTags, setShowMoreTags] = useState(false)

    const [editFormData, setEditFormData] = useState({
        recipeName: '',
        recipeSubName: '',
        ingredients: [],
        instructions: '',
        notes: '',
        cooktimeHours: 0,
        cooktimeMins: 0,
        difficultyRating: 'easy',
        originalRecipeLink: '',
        nutritionScore: 0,
        costScore: 0,
        tastinessScore: 0,
        tags: [],
        password: '',
        honeyp: ''
    })

    useEffect(() => {
        if (currentRecipe) {
            setEditFormData({
                recipeName: currentRecipe.recipeName,
                recipeSubName: currentRecipe.recipeSubName,
                ingredients: currentRecipe.ingredients,
                instructions: currentRecipe.instructions,
                notes: currentRecipe.notes,
                cooktimeHours: currentRecipe.cooktimeHours,
                cooktimeMins: currentRecipe.cooktimeMins,
                originalRecipeLink: currentRecipe.originalRecipeLink,
                nutritionScore: currentRecipe.nutritionScore,
                costScore: currentRecipe.costScore,
                tastinessScore: currentRecipe.tastinessScore,
                tags: currentRecipe.tags,

                imgUrl: currentRecipe.imgUrl,

                isFavorited: currentRecipe.isFavorited,
                isRequested: currentRecipe.isRequested,
                totalCooktime: ((parseInt(currentRecipe.cooktimeHours) * 60) + parseInt(currentRecipe.cooktimeMins)),
                difficultyRating: currentRecipe.difficultyRating ? currentRecipe.difficultyRating : 'easy',
                cookingHistoryArray: currentRecipe.cookingHistoryArray,

                password: '',
                honeyp: ''
            })

            setSelectedTagWords(currentRecipe.tags)
        }
    }, [currentRecipe])

    const [currentIngredientsObj, setCurrentIngredientsObj] = useState({
        ingredientMeasurement: '',
        ingredientName: '',
        ingredientExtraDetail: ''
    })
    const [ingredientPreviews, setIngredientPreviews] = useState([])
    const [duplicateIngredients, setDuplicateIngredients] = useState(false)

    useEffect(() => {
        if (currentRecipe && !isLoading) {
            const ingredientMeasurementPreview = document.getElementById("ingredient-measurement-preview")
            const ingredientNamePreview = document.getElementById("ingredient-name-preview")
            const ingredientExtraDetailPreview = document.getElementById("ingredient-extra-detail-preview")
            ingredientMeasurementPreview.textContent = currentIngredientsObj.ingredientMeasurement
            ingredientNamePreview.textContent = currentIngredientsObj.ingredientName
            ingredientExtraDetailPreview.textContent = currentIngredientsObj.ingredientExtraDetail
        }
    }, [currentIngredientsObj, isLoading])

    useEffect(() => {
        const previews = editFormData.ingredients.map((ingredient) => {
            return (
                <div key={ingredient.ingredientMeasurement + ingredient.ingredientName + ingredient.ingredientExtraDetail}
                     className='ingredient-preview-element'>
                    <span className='ingredient-measurement-preview'>{ingredient.ingredientMeasurement}</span>
                    <span className='ingredient-name-preview'>{ingredient.ingredientName}</span>
                    <span className='ingredient-extra-detail-preview'>{ingredient.ingredientExtraDetail}</span>
                    <span className='delete-ingredient-btn' onMouseDown={() => deleteIngredient(ingredient)}>delete</span>
                </div>
            )
        })
        setIngredientPreviews(previews)
        const uniqueKeys = new Set(previews.map((preview) => preview.key))
        if (uniqueKeys.size !== previews.length) {
            setDuplicateIngredients(true)
        } else {
            setDuplicateIngredients(false)
        }
    }, [editFormData.ingredients])

    const deleteIngredient = (ingredientToDelete) => {
        setEditFormData((prevData) => ({
            ...prevData,
            ingredients: prevData.ingredients.filter(
                (ingredient) => ingredient !== ingredientToDelete
            )
        }))
    }

    useEffect(() => {
        if (mongoData.length > 0) {
            const recipe = mongoData.find(recipe => recipe._id === recipeId)
            setCurrentRecipe(recipe)
            setIsLoading(false)
        }
    }, [mongoData, recipeId])

    const handleIngredientChange = (e) => {
        const { name, value } = e.target
        setCurrentIngredientsObj((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleIngredientsEnterKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddClick()
        }
    }

    const handleAddClick = (e) => {
        console.log(editFormData.ingredients)
        if (currentIngredientsObj.ingredientMeasurement !== '' || 
            currentIngredientsObj.ingredientName !== '' || 
            currentIngredientsObj.ingredientExtraDetail !== '') {
                console.log('running this code')
                setEditFormData((prevData) => ({
                    ...prevData,
                    ingredients: [...prevData.ingredients, currentIngredientsObj]
                }))
                console.log(editFormData.ingredients)
                setCurrentIngredientsObj(() => ({
                    ingredientMeasurement: '',
                    ingredientName: '',
                    ingredientExtraDetail: ''
                }))
        } else {
            console.log('nothing to add. add some stuff yo!')
        }
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setImageObject({
            file: selectedImage
        })
        console.log(selectedImage)
    }

    useEffect(() => {
        if (imageObject.file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImgPreview(reader.result)
            }
            reader.readAsDataURL(imageObject.file)

            document.getElementById("edit-image-prompt").classList.add("hide")
            document.getElementById("recipe-title-preview").classList.add("white-text")
            document.getElementById("recipe-subtitle-preview").classList.add("white-text")
            document.getElementById("preview-gradient").classList.remove("hide")
        }
    }, [imageObject])

    function handleImageButtonClick() {
        const imageInput = document.getElementById("imageInput")
        imageInput.click()
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    useEffect(() => {
        showMoreTags ? 
        setTagWords([...defaultTagWords ,...moreTagWords]) : 
        setTagWords(defaultTagWords)
    }, [showMoreTags])

    const handleTagClick = (word) => {
        setEditFormData((prevData) => {
            const tags = prevData.tags
            const isTagIncluded = tags.includes(word)

            if (isTagIncluded) {
                const updatedTags = tags.filter((tag) => tag !== word)

                return {
                    ...prevData,
                    tags: updatedTags
                }
            } else {
                const updatedTags = [...tags, word]

                return {
                    ...prevData,
                    tags: updatedTags
                }
            }
        })
        setSelectedTagWords((prevSelectedTagWords) => {
            const isSelected = prevSelectedTagWords.includes(word)

            if (isSelected) {
                return prevSelectedTagWords.filter((selectedWord) => selectedWord !== word)
            } else {
                return [...prevSelectedTagWords, word]
            }
        })
    }
    
    const handleTagToggle = () => {
        setShowMoreTags(!showMoreTags)
    }

    const api_key = "124659146613462"
    const cloud_name = "dot31xj56"

    const handleSubmit = async (e) => {
        e.preventDefault()

        const options = {
            method: "POST",
            body: JSON.stringify(editFormData),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch("http://bastebook.com:5000/recipes/check-password", options)
            const data = await response.json()

            if (data.valid === false) {
                throw new Error("Invalid Password")
            }
            console.log('Password is Valid')
            resetError()
        } catch (error) {
            console.error(error)
            showError("Invalid password. Please try again.")
            return
        }
        console.log('only log this if password is valid')

        if (imageObject.file) {
            try {
                const signatureResponse = await axios.get("http://bastebook.com:5000/recipes/get-signature")
                const data = new FormData()
                data.append("file", imageObject.file)
                data.append("api_key", api_key)
                data.append("signature", signatureResponse.data.signature)
                data.append("timestamp", signatureResponse.data.timestamp)

                const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: function (e) {
                    console.log(e.loaded / e.total)
                    }
                })

                console.log(cloudinaryResponse.data)

                const photoData = {
                    public_id: cloudinaryResponse.data.public_id,
                    version: cloudinaryResponse.data.version,
                    signature: cloudinaryResponse.data.signature
                }
                console.log(editFormData)

                setFinalDataObject(() => {
                    if (currentIngredientsObj.ingredientMeasurement == '' && 
                    currentIngredientsObj.ingredientName == '' && 
                    currentIngredientsObj.ingredientExtraDetail == '') {
                        return {
                            ...editFormData,
                            imageId: cloudinaryResponse.data.public_id,
                            imgUrl: cloudinaryResponse.data.secure_url,
                            signature: cloudinaryResponse.data.signature
                        }
                    } else {
                        return {
                            ...editFormData,
                            imageId: cloudinaryResponse.data.public_id,
                            imgUrl: cloudinaryResponse.data.secure_url,
                            signature: cloudinaryResponse.data.signature,
                            ingredients: [...editFormData.ingredients, currentIngredientsObj]
                        }
                    }
                })

            } catch (error) {
                console.log(error)
            }
            console.log("image code ran")
        } else {
            setFinalDataObject(() => {
                console.log('running this code')
                if (currentIngredientsObj.ingredientMeasurement == '' && 
                currentIngredientsObj.ingredientName == '' && 
                currentIngredientsObj.ingredientExtraDetail == '') {
                    console.log('shouldnt add this code to data object')
                    return {
                        ...editFormData,
                        imgUrl: currentRecipe.imgUrl
                    }
                } else {
                    console.log('should add this code to data object')
                    return {
                        ...editFormData,
                        imgUrl: currentRecipe.imgUrl,
                        ingredients: [...editFormData.ingredients, currentIngredientsObj]
                    }
                }
            })
        }
    }

    const showError = (message) => {
        const errorElement = document.getElementById('error-message')
        errorElement.textContent = message
    }

    const resetError = () => {
        const errorElement = document.getElementById('error-message')
        errorElement.textContent = ''
    }

    const showDeletionError = (message) => {
        const deletionErrorEl = document.getElementById('deletion-error-message')
        deletionErrorEl.textContent = message
    }

    const resetDeletionError = () => {
        const deletionErrorEl = document.getElementById('deletion-error-message')
        deletionErrorEl.textContent = ''
    }

    useEffect(() => {
        if (Object.keys(finalDataObject).length !== 0) {
            console.log(finalDataObject)
        fetch(`http://bastebook.com:5000/recipes/update/${currentRecipe._id}`, {
                method: "POST",
                body: JSON.stringify(finalDataObject), 
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    res.json()
                    if (res.ok) {
                        console.log('successfully edited!')
                        mountThenRemoveSuccessMessage()
                        setEditFormData({
                            recipeName: currentRecipe.recipeName,
                            recipeSubName: currentRecipe.recipeSubName,
                            ingredients: currentRecipe.ingredients,
                            instructions: currentRecipe.instructions,
                            notes: currentRecipe.notes,
                            cooktimeHours: currentRecipe.cooktimeHours,
                            cooktimeMins: currentRecipe.cooktimeMins,
                            originalRecipeLink: currentRecipe.originalRecipeLink,
                            nutritionScore: currentRecipe.nutritionScore,
                            costScore: currentRecipe.costScore,
                            tastinessScore: currentRecipe.tastinessScore,
                            tags: currentRecipe.tags,

                            imgUrl: currentRecipe.imgUrl,

                            isFavorited: currentRecipe.isFavorited,
                            isRequested: currentRecipe.isRequested,
                            totalCooktime: ((parseInt(currentRecipe.cooktimeHours) * 60) + parseInt(currentRecipe.cooktimeMins)),
                            difficultyRating: currentRecipe.difficultyRating ? currentRecipe.difficultyRating : 'easy',
                            cookingHistoryArray: currentRecipe.cookingHistoryArray,

                            password: '',
                            honeyp: ''
                        })
                        setImageObject({})
                        setImgPreview(null)
                        setCurrentIngredientsObj({
                            ingredientMeasurement: '',
                            ingredientName: '',
                            ingredientExtraDetail: ''
                        })
                        setSelectedTagWords([])
                        props.retrieveRecipes()
                    }
                })
                .then(data => console.log(data))
            } else {
                console.log('should be running this')
            }
    }, [finalDataObject])

    const checkKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') e.preventDefault()
    }

    function mountThenRemoveSuccessMessage() {
        const successMessageEl = document.getElementById('success-message')
        successMessageEl.classList.remove('hide')
        setTimeout(() => {
            successMessageEl.classList.add('hide')
        }, 5000)
    }

    const [deletionFormData, setDeletionFormData] = useState({
        honeyp: '',
        password: ''
    })

    const handleDeleteFormChange = (e) => {
        const { name, value } = e.target
        setDeletionFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false)
    const [isDeletionFormShowing, setIsDeletionFormShowing] = useState(false)

    const handleDeleteModalToggle = (e) => {
        setIsDeleteModalShowing(!isDeleteModalShowing)
        setIsDeletionFormShowing(false)
    }

    const handleDeletionFormToggle = (e) => {
        setIsDeletionFormShowing(!isDeletionFormShowing)
    }

    const handleDeleteFormSubmit = async (e) => {
        e.preventDefault()

        const options = {
            method: "POST",
            body: JSON.stringify(deletionFormData),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch("http://bastebook.com:5000/recipes/check-password", options)
            const data = await response.json()

            if (data.valid === false) {
                throw new Error("Invalid Password")
            }
            console.log('Password is Valid')
            resetDeletionError()

            const deletionResponse = await fetch(`http://bastebook.com:5000/recipes/${currentRecipe._id}`, {
                method: "DELETE",
                body: JSON.stringify(deletionFormData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const deletionData = await deletionResponse.json()
            console.log(deletionData)
            // show successful deletion message
            setTimeout(() => {
                navigate('/')
                props.retrieveRecipes()
            }, 1000)

        } catch (error) {
            console.error(error)
            showDeletionError("Invalid password. Please try again.")
            return
        }
        console.log('only log this if password is valid')
    }

    if (isLoading) {
        return (
            <main>
                Loading...
            </main>
        )
    } else {
        return (
            <main>

                <div className='recipe-page-icon-container'>
                    <Link to={`/${currentRecipe._id}`}>
                        <div className='recipe-page-back-arrow-container no-margin'>
                            <img src={arrow} className="arrowHead back-arrowhead"/>
                            <div className='back-arrow'></div>
                        </div>
                    </Link>
                    <div className='delete-icon-container' onClick={handleDeleteModalToggle}>
                        <img src={trashIcon} />
                    </div>
                </div>
                {isDeleteModalShowing && <div className='delete-modal-container' onClick={handleDeleteModalToggle}>
                    <div className='delete-modal' onClick={(e) => e.stopPropagation()}>
                        <div className='close-btn-container' onClick={handleDeleteModalToggle}>
                            <img src={closeIcon} />
                        </div>
                        <div className='delete-modal-text'>Are you sure you want to delete this recipe?</div>
                        <div className='yes-no-btn-container'>
                            <div id='delete-yes' className='delete-modal-btn' onClick={handleDeletionFormToggle}>yes</div>
                            <div id='delete-no' className='delete-modal-btn'onClick={handleDeleteModalToggle}>no</div>
                        </div>

                        {isDeletionFormShowing && <form className='deletion-form' onSubmit={handleDeleteFormSubmit}>
                            <input type="password" id="deletion-password" name="password" className='has-placeholder'
                            placeholder="please enter password to delete" value={deletionFormData.password} onChange={handleDeleteFormChange}></input>
                            <div id="deletion-error-message" className="error"></div>
                            <input type="text" id="deletion-honeyp" name="honeyp" value={deletionFormData.honeyp} onChange={handleDeleteFormChange}></input>
                            <button type="submit" className="delete-recipe-btn" id="submit" >Delete</button>
                        </form>

                        }
                    </div>
                </div>}

                <h2 className='edit-form-title'>Edit Recipe</h2>
                <h4 className='edit-form-subtitle'>make changes and then click save</h4>

                {!Object.keys(imageObject).length > 0 && (<div className='recipe-page-hero' style={{backgroundImage: `linear-gradient(12deg, rgba(0, 0, 0, .95), rgba(0, 0, 0, 0) 45%), url(${editFormData.imgUrl})`}}>
                    <div>
                        <div id='recipe-title-overlay'>{editFormData.recipeName}</div>
                        <div id='recipe-subtitle-overlay'>{editFormData.recipeSubName}</div>
                    </div>
                </div>)}

                <button className={!Object.keys(imageObject).length > 0 ? 'small-img-btn' : 'image-upload-btn'} onClick={handleImageButtonClick} style={{backgroundImage: `url(${imgPreview})`}}>
                    <div id="edit-image-prompt">change recipe image</div>
                    <div id='preview-gradient' className='hide'></div>
                    {Object.keys(imageObject).length > 0 && (<div className="preview-text-container">
                        <div id='recipe-title-preview'>{editFormData.recipeName}</div>
                        <div id='recipe-subtitle-preview'>{editFormData.recipeSubName}</div>
                    </div>)}
                </button>
                <input type="file" id="imageInput" name="image" onChange={handleImageChange}/>

                <form className='edit-recipe-form' onSubmit={handleSubmit} onKeyDown={(e) => checkKeyDown(e)}>

                    <section className='title-section'> 
                            <h4 className='section-title'>Title</h4>
                            <div className='section-arrow-container'>
                                <img src={arrow} className="arrowHead section-arrowhead"/>
                            </div>
                            
                            <div className='section-input-container'>
                                <label htmlFor="recipe-name">Recipe Title:</label>
                                <input type="text" id="recipe-name" name="recipeName" className='has-placeholder'
                                placeholder='Grilled Chicken' value={editFormData.recipeName} onChange={handleInputChange}></input>
                                
                                <label htmlFor="recipe-sub-name">Recipe Subitle:</label>
                                <input type="text" id="recipe-sub-name" className='has-placeholder' name="recipeSubName"
                                value={editFormData.recipeSubName} onChange={handleInputChange}></input>
                            </div>
                    </section>

                    <section className='ingredients-section'>
                        <h4 className='section-title'>Ingredients</h4>
                        <div className='section-arrow-container'>
                            <img src={arrow} className="arrowHead section-arrowhead"/>
                        </div>
                        
                        <div className='section-input-container'>
                            {ingredientPreviews}
                            <div className='current-ingredient-preview'>
                                <span id='ingredient-measurement-preview'></span>
                                <span id='ingredient-name-preview'></span>
                                <span id='ingredient-extra-detail-preview'></span>
                            </div>
                            {duplicateIngredients && <div className='duplicate-alert'>You have the same ingredient on there twice. Not judging, but it's just kinda weird to do that.</div>}
                            <label htmlFor="ingredientMeasurement">Measurement:</label>
                            <input type="text" id="measurement" name="ingredientMeasurement" className='has-placeholder'
                            placeholder='1/2 cup' value={currentIngredientsObj.ingredientMeasurement} onChange={handleIngredientChange} onKeyDown={handleIngredientsEnterKeyDown}></input>
                            <label htmlFor="ingredientName">Ingredient Name:</label>
                            <input type="text" id="ingredient-name" name="ingredientName" className='has-placeholder'
                            placeholder='Diced Carrots' value={currentIngredientsObj.ingredientName} onChange={handleIngredientChange} onKeyDown={handleIngredientsEnterKeyDown}></input>
                            <label htmlFor="ingredientExtraDetail">Extra Detail:</label>
                            <input type="text" id="ingredient-extra-detail" name="ingredientExtraDetail" className='has-placeholder'
                            placeholder='(about 1 large carrot)' value={currentIngredientsObj.ingredientExtraDetail} onChange={handleIngredientChange} onKeyDown={handleIngredientsEnterKeyDown}></input>
                            <div className="add-button" onClick={handleAddClick}>add</div>
                        </div>
                    </section>

                    <section className='instructions-section'>
                        <h4 className='section-title'>Instructions</h4>
                        <div className='section-arrow-container'>
                            <img src={arrow} className="arrowHead section-arrowhead"/>
                        </div>
                        
                        <div className='section-input-container'>
                            <label htmlFor="instructions">Type all instructions:</label>
                            <textarea rows="5" type="text" id="instructions" name="instructions" className='has-placeholder'
                            placeholder='Bring 3 quarts of water to a boil...' value={editFormData.instructions} onChange={handleInputChange}></textarea>
                        </div>
                    </section>

                    <section className='notes-section'>                        
                        <h4 className='section-title'>Notes</h4>
                        <div className='section-arrow-container'>
                            <img src={arrow} className="arrowHead section-arrowhead"/>
                        </div>
                        
                        <div className='section-input-container'>
                            <label htmlFor="notes">Type any notes here:</label>
                            <textarea rows="2" type="text" id="notes" name="notes" className='has-placeholder'
                            placeholder='Lizzie prefers the low sodium soy sauce...' value={editFormData.notes} onChange={handleInputChange}></textarea>
                        </div>
                    </section>

                    <section className='extra-info-section'>
                        <h4 className='section-title'>Extra Info</h4>
                        <div className='section-arrow-container'>
                            <img src={arrow} className="arrowHead section-arrowhead"/>
                        </div>

                        <div className='section-input-container'>
                            <label htmlFor="cooktime-hours">Estimated Total Cooktime (including prep):</label>
                            <input className="cooktime-hours" type="number" min={0} id="cooktime-hours" name="cooktimeHours" 
                            value={editFormData.cooktimeHours} onChange={handleInputChange}></input>
                            <span className="post-input-inline-text">hour(s)</span>
                            <input className="cooktime-mins" type="number" min={0}  max={59} id="cooktime-mins" name="cooktimeMins" 
                            value={editFormData.cooktimeMins} onChange={handleInputChange}></input>
                            <span className="post-input-inline-text">mins</span>
                            <label htmlFor="difficulty-ratinge">Difficulty:</label>
                            <select className="difficulty-rating" id="difficulty-rating" name="difficultyRating" 
                            value={editFormData.difficultyRating} onChange={handleInputChange}>
                                <option value='easy'>Easy</option>
                                <option value='medium'>Medium</option>
                                <option value='hard'>Hard</option>
                            </select>
                            <label htmlFor="nutrition-score">Nutrition Score:</label>
                            <input className="nutrition-score" type="number" min={0} max={10} id="nutrition-score" name="nutritionScore" 
                            value={editFormData.nutritionScore} onChange={handleInputChange}></input>
                            <span className="post-input-inline-text">/10</span>
                            <label htmlFor="cost-score">Cost Score:</label>
                            <input className="cost-score" type="number" min={0} max={10} id="cost-score" name="costScore" 
                            value={editFormData.costScore} onChange={handleInputChange}></input>
                            <span className="post-input-inline-text">/10</span>
                            <label htmlFor="tastiness-score">Tastiness Score:</label>
                            <input className="tastiness-score" type="number" min={0} max={10} id="tastiness-score" name="tastinessScore" 
                            value={editFormData.tastinessScore} onChange={handleInputChange}></input>
                            <span className="post-input-inline-text">/10</span>
                            <label htmlFor="originalRecipeLink">Link to original recipe:</label>
                            <input type="text" id="oringinal-link" name="originalRecipeLink" placeholder='https://examplerecipe.com/'
                            className='has-placeholder' value={editFormData.originalRecipeLink} onChange={handleInputChange}></input>
                        </div>
                    </section>

                    <section>
                        <div className='tags-section'>
                            <h4 className='section-title'>Tags</h4>
                            <div className='section-arrow-container'>
                                <img src={arrow} className="arrowHead section-arrowhead"/>
                            </div>
                            
                            <div className='section-input-container' id='tags-container'>
                                {tagWords.map((word, index) => (
                                    <span key={index} onClick={() => handleTagClick(word)}
                                    className={
                                        word.length > 10
                                        ? selectedTagWords.includes(word) ? 'form-tag  two-column-tag selected' : 'form-tag  two-column-tag'
                                        : selectedTagWords.includes(word) ? 'form-tag  selected' : 'form-tag '
                                    }
                                    >
                                        {word}
                                    </span>
                                ))
                                }
                            </div>
                        </div>
                        <div className='show-more-tags-container' onClick={handleTagToggle}>
                            <div>show {showMoreTags ? 'less' : 'more'}</div>
                            <div className='show-more-arrow-container'>
                                <img src={arrowLight} className={`arrowHead show-more-arrow ${showMoreTags ? 'rotate270' : ''}`}/>
                            </div>
                        </div>
                    </section>

                    <label htmlFor="password">Secret Password:</label>
                    <input type="password" id="password" name="password" className='has-placeholder'
                    placeholder="please re-enter password to save changes" value={editFormData.password} onChange={handleInputChange}></input>
                    <div id="error-message" className="error"></div>
                    <input type="text" id="honeyp" name="honeyp" value={editFormData.honeyp} onChange={handleInputChange}></input>
                    <button type="submit" className="save-recipe-btn" id="submit" >Save</button>
                </form>
                
                {/* <div className='delete-btn-container'>
                    <button type="submit" className="delete-recipe-btn" id="submit" >Delete Recipe</button>
                </div> */}

                <div className='success-message-container'>
                    <div id='success-message' className='success-el hide'>
                        Changes Saved!
                    </div>
                </div>
                <Link to={`/${currentRecipe._id}`}>
                    <div className='back-arrow-container'>
                        <img src={arrow} className="arrowHead back-arrowhead"/>
                        <div className='back-arrow'></div>
                    </div>
                </Link>
            </main>
        )
    }
}