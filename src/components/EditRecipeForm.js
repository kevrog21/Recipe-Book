import React, { useState, useEffect, useRef } from 'react' 
import { useParams, Link } from 'react-router-dom'
import { useNavigateToLink } from './ToHomePage'
import { parseFraction } from './utilityFunctions.js'
import axios from 'axios'
import arrow from '../assets/arrow.svg'
import arrowLight from '../assets/arrow-grey.svg'
import trashIcon from '../assets/trash-icon.svg'
import closeIcon from '../assets/close-x.svg'

export default function EditRecipeForm(props) {

    const { slug } = useParams()
    const { mongoData, selectedRecipe, defaultTagWords, moreTagWords } = props
    const [currentRecipe, setCurrentRecipe] = useState(selectedRecipe)
    const [imageObject, setImageObject] = useState({})
    const [imgPreview, setImgPreview] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [finalDataObject, setFinalDataObject] = useState({})
    const navigate = useNavigateToLink()
    const [notFound, setNotFound] = useState(false)
    const [tagWords, setTagWords] = useState([defaultTagWords])
    const [selectedTagWords, setSelectedTagWords] = useState([])
    const [showMoreTags, setShowMoreTags] = useState(false)
    const [showIngredientsSectionTitle, setShowIngredientsSectionTitle] = useState(false)
    const [userInteractedWithIngredients, setUserInteractedWithIngredients] = useState(false)
    const [invalidQuantityMessage, setInvalidQuantityMessage] = useState(false)
    const [currentInstructionsObj, setCurrentInstructionsObj] = useState({
        instructionText: '',
        instructionSection: ''
    })
    const [showInstructionsSectionTitle, setShowInstructionsSectionTitle] = useState(false)
    const [userInteractedWithInstructions, setUserInteractedWithInstructions] = useState(false)
    const [instructionsPreview, setInstructionsPreview] = useState([])

    const ingredientMeasurementEl = useRef(null)
    const ingredientSectionInput = useRef(null)
    const instructionTextEl = useRef(null)
    const instructionSectionInput = useRef(null)
    const equipmentNameEl = useRef(null)

    const [editIngredientMode, setEditIngredientMode] = useState(false)
    const [editInstructionMode, setEditInstructionMode] = useState(false)
    const [editedIngredientIndex, setEditedIngredientIndex] = useState(null)
    const [editedInstructionIndex, setEditedInstructionIndex] = useState(null)

    const [currentEquipmentObj, setCurrentEquipmentObj] = useState({
        equipmentName: '',
        equipmentLink: ''
    })
    const [equipmentPreview, setEquipmentPreview] = useState([])

    const [recipeVisibility, setRecipeVisibility] = useState('public')

    const [editFormData, setEditFormData] = useState({
        recipeName: '',
        recipeSubName: '',
        slug: '',
        defaultServings: 0,
        recipeYield: '',
        ingredients: [],
        instructions: [],
        notes: '',
        prepTimeHours: 0,
        prepTimeMins: 0,
        cooktimeHours: 0,
        cooktimeMins: 0,
        difficultyRating: 'easy',
        originalRecipeLink: '',
        nutritionScore: 0,
        costScore: 0,
        tastinessScore: 0,
        tags: [],
        equipment: [],
        password: '',
        honeyp: ''
    })

    useEffect(() => {
        if (currentRecipe) {
            setEditFormData({
                recipeName: currentRecipe.recipeName,
                recipeSubName: currentRecipe.recipeSubName,
                slug: currentRecipe.slug,
                defaultServings: currentRecipe.defaultServings,
                ingredients: currentRecipe.ingredients,
                instructions: currentRecipe.instructions,
                notes: currentRecipe.notes,
                prepTimeHours: currentRecipe.prepTimeHours,
                prepTimeMins: currentRecipe.prepTimeMins,
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
                totalCooktime: currentRecipe.totalCooktime,
                difficultyRating: currentRecipe.difficultyRating ? currentRecipe.difficultyRating : 'easy',
                cookingHistoryArray: currentRecipe.cookingHistoryArray,

                createdBy: currentRecipe.createdBy,
                versionOwner: currentRecipe.versionOwner,
                recipeYield: currentRecipe.recipeYield,
                recipeVisibility: currentRecipe.recipeVisibility,
                comments: currentRecipe.comments,
                reviews: currentRecipe.reviews,
                bastebookApproved: currentRecipe.bastebookApproved,
                hasVideo: currentRecipe.hasVideo,
                nutritionFacts: currentRecipe.nutritionFacts,
                equipment: currentRecipe.equipment,
                photoCreds: currentRecipe.photoCreds,

                password: '',
                honeyp: ''
            })

            setSelectedTagWords(currentRecipe.tags)
            setRecipeVisibility(currentRecipe.recipeVisibility)
        }
    }, [currentRecipe])

    useEffect(() => {
        if (userInteractedWithIngredients) {
            if (showIngredientsSectionTitle) {
                ingredientSectionInput.current.focus()
            } else {
                ingredientMeasurementEl.current.focus()
            }
        } else {
            setUserInteractedWithIngredients(true)
        }
        
    }, [showIngredientsSectionTitle])

    useEffect(() => {
        if (userInteractedWithInstructions) {
            if (showInstructionsSectionTitle) {
                instructionSectionInput.current.focus()
            }
        } else {
            setUserInteractedWithInstructions(true)
        }
    }, [showInstructionsSectionTitle, editedInstructionIndex])

    
    useEffect(() => {
        if (mongoData.length > 0) {
            const recipe = mongoData.find(recipe => recipe.slug === slug)
            if (recipe) {
                setCurrentRecipe(recipe)
                console.log('found current recipe its:' , recipe)
            } else {
                console.log('cant find slug called: ', slug)
                setNotFound(true)
            }
            setIsLoading(false)
        } 
    }, [mongoData, slug]) 

    const [currentIngredientsObj, setCurrentIngredientsObj] = useState({
        ingredientQuantity: '',
        ingredientQuantityDecimal: null,
        ingredientMeasurement: '',
        ingredientName: '',
        ingredientExtraDetail: '',
        ingredientSectionName: ''
    })
    const [ingredientPreviews, setIngredientPreviews] = useState([])
    const [duplicateIngredients, setDuplicateIngredients] = useState(false)



    useEffect(() => {
        if (currentRecipe && !isLoading) {
            const ingredientQuantityPreview = document.getElementById("ingredient-quantity-preview")
            const ingredientMeasurementPreview = document.getElementById("ingredient-measurement-preview")
            const ingredientNamePreview = document.getElementById("ingredient-name-preview")
            const ingredientExtraDetailPreview = document.getElementById("ingredient-extra-detail-preview")
            const ingredientSectionPreview = document.getElementById("ingredient-section-preview")
            ingredientQuantityPreview.textContent = currentIngredientsObj.ingredientQuantity
            ingredientMeasurementPreview.textContent = currentIngredientsObj.ingredientMeasurement
            ingredientNamePreview.textContent = currentIngredientsObj.ingredientName
            ingredientExtraDetailPreview.textContent = currentIngredientsObj.ingredientExtraDetail
            if (ingredientSectionPreview) {
                ingredientSectionPreview.textContent = currentIngredientsObj.ingredientSectionName
            }
        }
    }, [currentIngredientsObj, isLoading])

    useEffect(() => {
        const previews = editFormData.ingredients.map((ingredient, index) => {
            return (
                <div key={index}
                     className={`ingredient-preview-element ${index === editedIngredientIndex ? 'now-editing' : ''}`} onMouseEnter={showControlBtns} onMouseDown={showControlBtns} onMouseLeave={hideControlBtns}>
                    {!ingredient.ingredientSectionName && <span><div className='bullet-point'></div></span>}
                    <div className='ingredient-txt-wrapper'>
                        
                        {ingredient.ingredientSectionName && <span className='ingredient-section-preview'>{ingredient.ingredientSectionName}</span>}
                        {ingredient.ingredientQuantity && <span className='ingredient-quantity-preview'>{ingredient.ingredientQuantity}</span>}
                        {ingredient.ingredientMeasurement && <span className='ingredient-measurement-preview'>{ingredient.ingredientMeasurement}</span>}
                        {ingredient.ingredientName && <span className='ingredient-name-preview'>{ingredient.ingredientName}</span>}
                        {ingredient.ingredientExtraDetail && <span className='ingredient-extra-detail-preview'>{ingredient.ingredientExtraDetail}</span>}
                    </div> 
                    <span className='ingredient-controls-container controls-container hide'>
                        <span className='reorder-btn-container'>
                            <div className='reorder-btn rotate180' onMouseDown={(e) => handleReorderIngredientUp(index, e)}>
                                <div className='reorder-arrow'></div>
                            </div>
                            <div className='reorder-btn' onMouseDown={(e) => handleReorderIngredientDown(index, e)}>
                                <div className='reorder-arrow '></div>
                            </div>
                        </span>
                        <span className='edit-btn' onMouseDown={() => handleEditIngredientClick(index)}>edit</span>
                        <span className='delete-btn' onMouseDown={() => deleteIngredient(ingredient)}>delete</span>
                    </span>
                    
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
    }, [editFormData.ingredients, editedIngredientIndex])

    let currentStep = 0

    useEffect(() => {
        const previews = editFormData.instructions.map((instruction, index) => {
            if (instruction.instructionSection === '') {
                currentStep++
                return (
                    <div key={index} className='instruction-text-container'>
                        <div className={`instruction-step-label ${index === editedInstructionIndex ? 'now-editing' : ''}`} onMouseEnter={showControlBtns} onMouseDown={showControlBtns} onMouseLeave={hideControlBtns}>Step: {currentStep}
                            <span className='instruction-controls-container controls-container hide'>
                                <span className='reorder-btn-container'>
                                    <div className='reorder-btn rotate180' onMouseDown={(e) => handleReorderInstructionUp(index, e)}>
                                        <div className='reorder-arrow'></div>
                                    </div>
                                    <div className='reorder-btn' onMouseDown={(e) => handleReorderInstructionDown(index, e)}>
                                        <div className='reorder-arrow '></div>
                                    </div>
                                </span>
                                <span className='edit-btn' onMouseDown={() => handleEditInstructionClick(index)}>edit</span>
                                <span className='delete-btn' onMouseDown={() => deleteInstruction(instruction)}>delete</span>
                            </span>
                            <div className='instruction-text'>{instruction.instructionText}</div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div key={index} className={`instruction-section-header ${index === editedInstructionIndex ? 'now-editing' : ''}`} onMouseEnter={showControlBtns} onMouseDown={showControlBtns} onMouseLeave={hideControlBtns}>{instruction.instructionSection}
                        <div className='section-label-container'>
                            <span className='instruction-controls-container controls-container hide'>
                                <span className='reorder-btn-container '>
                                    <div className='reorder-btn rotate180' onMouseDown={(e) => handleReorderInstructionUp(index, e)}>
                                        <div className='reorder-arrow'></div>
                                    </div>
                                    <div className='reorder-btn' onMouseDown={(e) => handleReorderInstructionDown(index, e)}>
                                        <div className='reorder-arrow '></div>
                                    </div>
                                </span>
                                <span className='edit-btn ' onMouseDown={() => handleEditInstructionClick(index)}>edit</span>
                                <span className='delete-btn ' onMouseDown={() => deleteInstruction(instruction)}>delete</span>
                            </span>
                        </div>
                    </div>
                )
            }
        })
        setInstructionsPreview(previews)
    }, [editFormData.instructions, editedInstructionIndex])

    useEffect(() => {
        const previews = editFormData.equipment ? editFormData.equipment.map((equipment, index) => {
            return (
                <div key={index}>
                    <span className='weight600'>{equipment.equipmentName}</span> - <span>{equipment.equipmentLink}</span>
                </div>
            )
        }) : ''
        setEquipmentPreview(previews)
    }, [editFormData.equipment, currentRecipe])

    const handleAddIngredientClick = (e) => {
        console.log(editFormData.ingredients)
        if (currentIngredientsObj.ingredientQuantity !== '' || 
            currentIngredientsObj.ingredientMeasurement !== '' || 
            currentIngredientsObj.ingredientName !== '' || 
            currentIngredientsObj.ingredientExtraDetail !== '' || 
            currentIngredientsObj.ingredientSectionName !== '') {
                console.log('adding now')
                setEditFormData((prevData) => ({
                    ...prevData,
                    ingredients: [...prevData.ingredients, currentIngredientsObj]
                }))
                console.log(editFormData.ingredients)
                setCurrentIngredientsObj(() => ({
                    ingredientQuantity: '',
                    ingredientQuantityDecimal: null,
                    ingredientMeasurement: '',
                    ingredientName: '',
                    ingredientExtraDetail: '',
                    ingredientSectionName: ''
                }))
                ingredientMeasurementEl.current.focus()
                setShowIngredientsSectionTitle(false)
        }
    }

    useEffect(() => {
        if (currentIngredientsObj.ingredientSectionName) {
            setShowIngredientsSectionTitle(true)
        } else {
            setShowIngredientsSectionTitle(false)
        }
    }, [currentIngredientsObj])

    useEffect(() => {
        if (currentInstructionsObj.instructionSection) {
            setShowInstructionsSectionTitle(true)
        } else {
            setShowInstructionsSectionTitle(false)
        }
    }, [currentInstructionsObj])

    const handleAddIngredientSectionClick = (e) => {
        if (!showIngredientsSectionTitle) {
            handleAddIngredientClick()
            setShowIngredientsSectionTitle(prevState => !prevState)
        } else {
            setShowIngredientsSectionTitle(prevState => !prevState)
            setCurrentIngredientsObj((prevState) => ({
                ...prevState,
                ingredientSectionName: ''
            }))
        }
    }

    const handleEditIngredientClick = (index) => {
        setEditIngredientMode(true)
        setEditedIngredientIndex(index)
        setCurrentIngredientsObj({
            ingredientQuantity: editFormData.ingredients[index].ingredientQuantity,
            ingredientQuantityDecimal: editFormData.ingredients[index].ingredientQuantityDecimal,
            ingredientMeasurement: editFormData.ingredients[index].ingredientMeasurement,
            ingredientName: editFormData.ingredients[index].ingredientName,
            ingredientExtraDetail: editFormData.ingredients[index].ingredientExtraDetail,
            ingredientSectionName: editFormData.ingredients[index].ingredientSectionName
        })
    }

    const cancelEditIngredientClick = () => {
        setEditInstructionMode(false)
        setEditedInstructionIndex(null)
        setCurrentIngredientsObj({
            ingredientQuantity: '',
            ingredientQuantityDecimal: null,
            ingredientMeasurement: '',
            ingredientName: '',
            ingredientExtraDetail: '',
            ingredientSectionName: ''
        })
    }

    const handleEditIngredientSubmit = () => {
        setEditFormData((prevData) => {
            const updatedIngredients = prevData.ingredients.map((ingredient, index) => {
                if (index === editedIngredientIndex) {
                    const parsedQuantity = currentIngredientsObj.ingredientQuantity ? parseFraction(currentIngredientsObj.ingredientQuantity, setInvalidQuantityMessage) : null
                    return {
                        ingredientQuantity: parsedQuantity > 0 ? currentIngredientsObj.ingredientQuantity : '',
                        ingredientQuantityDecimal: currentIngredientsObj.ingredientQuantity ? parseFraction(currentIngredientsObj.ingredientQuantity, setInvalidQuantityMessage) : null,
                        ingredientMeasurement: currentIngredientsObj.ingredientMeasurement,
                        ingredientName: currentIngredientsObj.ingredientName,
                        ingredientExtraDetail: currentIngredientsObj.ingredientExtraDetail,
                        ingredientSectionName: currentIngredientsObj.ingredientSectionName
                    }
                }
                return ingredient
            })
            
            return {
                ...prevData,
                ingredients: updatedIngredients
            }
        })
        setEditIngredientMode(false)
        setEditedIngredientIndex(null)
        setShowIngredientsSectionTitle(false)
        setCurrentIngredientsObj({
            ingredientQuantity: '',
            ingredientQuantityDecimal: null,
            ingredientMeasurement: '',
            ingredientName: '',
            ingredientExtraDetail: '',
            ingredientSectionName: ''
        })
        ingredientMeasurementEl.current.focus()
    }

    const handleIngredientsAddSectionKeydown = (e) => {
        if (e.key === 'Enter') {
            handleAddIngredientClick()
            setShowIngredientsSectionTitle(false)
        }
    }

    const deleteIngredient = (ingredientToDelete) => {
        setEditFormData((prevData) => ({
            ...prevData,
            ingredients: prevData.ingredients.filter(
                (ingredient) => ingredient !== ingredientToDelete
            )
        }))
    }

    const handleIngredientChange = (e) => {
        const currentIngredientContainerEl = document.getElementById('current-ingredient-preview')
        currentIngredientContainerEl.classList.remove('hide')
        const { name, value } = e.target
        console.log(e.target)
        if (name === 'ingredientQuantity') {
            setCurrentIngredientsObj((prevData) => ({
                ...prevData,
                [name]: value,
                ingredientQuantityDecimal: parseFraction(value, setInvalidQuantityMessage)
            }))
        } else {
            setCurrentIngredientsObj((prevData) => ({
                ...prevData,
                [name]: value
            }))
        }
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
                setCurrentIngredientsObj({
                    ingredientQuantity: '',
                    ingredientQuantityDecimal: null,
                    ingredientMeasurement: '',
                    ingredientName: '',
                    ingredientExtraDetail: '',
                    ingredientSectionName: ''
                })
                setCurrentInstructionsObj({
                    instructionText: '',
                    instructionSection: ''
                })
        } else {
            console.log('nothing to add. add some stuff yo!')
        }
    }

    const handleInstructionsChange = (e) => {
        const { name, value } = e.target
        setCurrentInstructionsObj((prevDate) => ({
            ...prevDate,
            [name]: value
        }))
    }

    const handleInstructionsAddSectionKeydown = (e) => {
        if (e.key === 'Enter') {
            handleAddInstructionClick()
            setShowInstructionsSectionTitle(false)
        }
    }

    const handleAddInstructionClick = (e) => {
        if (currentInstructionsObj.instructionText !== '' ||
            currentInstructionsObj.instructionSection !== '') {
            setEditFormData((prevData) => ({
                ...prevData,
                instructions: [...prevData.instructions, currentInstructionsObj]
            }))
            setCurrentInstructionsObj({
                instructionText: '',
                instructionSection: ''
            })
            setShowInstructionsSectionTitle(false)
            instructionTextEl.current.focus()
        }
    }

    const handleAddInstructionSectionClick = (e) => {
        if (!showInstructionsSectionTitle) {
            handleAddInstructionClick()
            setShowInstructionsSectionTitle(prevState => !prevState)
        } else {
            setShowInstructionsSectionTitle(prevState => !prevState)
        }
    }

    const handleEditInstructionClick = (index) => {
        setEditInstructionMode(true)
        setEditedInstructionIndex(index)
        setCurrentInstructionsObj({
            instructionText: editFormData.instructions[index].instructionText,
            instructionSection: editFormData.instructions[index].instructionSection
        })
    }

    const handleEditInstructionSubmit = () => {
        setEditFormData((prevData) => {
            const updatedInstructions = prevData.instructions.map((instruction, index) => {
                if (index === editedInstructionIndex) {
                    return {
                        instructionText: currentInstructionsObj.instructionText,
                        instructionSection: currentInstructionsObj.instructionSection
                    }
                }
                return instruction
            })
            
            return {
                ...prevData,
                instructions: updatedInstructions
            }
        })
        setEditInstructionMode(false)
        setEditedInstructionIndex(null)
        setShowInstructionsSectionTitle(false)
        setCurrentInstructionsObj({
            instructionText: '',
            instructionSection: ''
        })
        instructionTextEl.current.focus()
    }

    const cancelEditInstructionClick = () => {
        setEditInstructionMode(false)
        setEditedInstructionIndex(null)
        setCurrentInstructionsObj({
            instructionText: '',
            instructionSection: ''
        })
    }

    const deleteInstruction = (instructionToDelete) => {
        setEditFormData((prevData) => ({
            ...prevData,
            instructions: prevData.instructions.filter(
                (instruction) => instruction !== instructionToDelete
            )
        }))
    }

    const handleEditClick = (index) => {
        setEditInstructionMode(true)
        setEditedInstructionIndex(index)
        setCurrentInstructionsObj({
            instructionText: editFormData.instructions[index].instructionText,
            instructionSection: editFormData.instructions[index].instructionSection
        })
    }

    const handleEditSubmit = () => {
        console.log(editFormData)
        setEditFormData((prevData) => {
            const updatedInstructions = prevData.instructions.map((instruction, index) => {
                if (index === editedInstructionIndex) {
                    return {
                        instructionText: currentInstructionsObj.instructionText,
                        instructionSection: currentInstructionsObj.instructionSection
                    }
                }
                return instruction
            })
            
            return {
                ...prevData,
                instructions: updatedInstructions
            }
        })
        setEditInstructionMode(false)
        setEditedInstructionIndex(null)
        setShowInstructionsSectionTitle(false)
        setCurrentInstructionsObj({
            instructionText: '',
            instructionSection: ''
        })
        instructionTextEl.current.focus()
    }

    const handleEquipmentChange = (e) => {
        const { name, value } = e.target
        setCurrentEquipmentObj((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleAddEquipmentClick = (e) => {
        setEditFormData((prevData) => ({
            ...prevData,
            equipment: [...prevData.equipment, currentEquipmentObj]
        }))
        setCurrentEquipmentObj(() => ({
            equipmentName: '',
            equipmentLink: ''
        }))
        equipmentNameEl.current.focus()
    }

    const handleEquipmentEnterKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddEquipmentClick() 
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

    const handleInstructionTextKeydown = (e) => {
        if (!editInstructionMode) {
            if (e.key === 'Enter' && !e.ctrlKey) {
                e.preventDefault()
                handleAddInstructionClick()
            } if (e.key === 'Enter' && e.ctrlKey) {
                const { selectionStart, selectionEnd, value } = e.target
                const textBeforeCursor = value.slice(0, selectionStart)
                const textAfterCursor = value.slice(selectionEnd)
                const newText = textBeforeCursor + '\n' + textAfterCursor
                e.target.value = newText
    
                setCurrentInstructionsObj({
                    instructionText: newText,
                    instructionSection: ''
                })
                e.preventDefault()
            }
        }
    }

    const shiftIngredientUp = (index) => {
        if (index > 0) {
            setEditFormData((prevData) => {
                const newFormData = { ...prevData }
                const ingredients = newFormData.ingredients.slice()

                const movedIngredient = ingredients.splice(index, 1)[0]
                ingredients.splice(index - 1, 0, movedIngredient)

                newFormData.ingredients = ingredients
                
                return newFormData
            })
        }
    }

    const shifIngredientDown = (index) => {
        setEditFormData((prevData) => {
            if (index < prevData.ingredients.length - 1) {
                
                const newFormData = { ...prevData }
                const ingredients = newFormData.ingredients.slice()

                const movedIngredient = ingredients.splice(index, 1)[0]
                ingredients.splice(index + 1, 0, movedIngredient)

                newFormData.ingredients = ingredients
                
                return newFormData
                
            }
            return prevData
        })
    }

    const handleReorderIngredientUp = (index, e) => {
        setEditIngredientMode(false)
        setEditedIngredientIndex(null)
        cancelEditIngredientClick()
        shiftIngredientUp(index) 
    }

    const handleReorderIngredientDown = (index, e) => {
        setEditIngredientMode(false)
        setEditedIngredientIndex(null)
        cancelEditIngredientClick()
        shifIngredientDown(index)
    }


    const shiftInstructionUp = (index) => {
        if (index > 0) {
            setEditFormData((prevData) => {
                const newFormData = { ...prevData }
                const instructions = newFormData.instructions.slice()

                const movedInstruction = instructions.splice(index, 1)[0]
                instructions.splice(index - 1, 0, movedInstruction)

                newFormData.instructions = instructions
                
                return newFormData
            })
        }
    }

    const shifInstructionDown = (index) => {
        
        setEditFormData((prevData) => {
            if (index < prevData.instructions.length - 1) {
                const newFormData = { ...prevData }
                const instructions = newFormData.instructions.slice()

                const movedInstruction = instructions.splice(index, 1)[0]
                instructions.splice(index + 1, 0, movedInstruction)

                newFormData.instructions = instructions
                
                return newFormData
            }
            return prevData
        })
    }

    const handleReorderInstructionUp = (index, e) => {
        setEditInstructionMode(false)
        setEditedInstructionIndex(null)
        cancelEditInstructionClick()
        shiftInstructionUp(index) 
    }

    const handleReorderInstructionDown = (index, e) => {
        setEditInstructionMode(false)
        setEditedInstructionIndex(null)
        cancelEditInstructionClick()
        shifInstructionDown(index)
    }

    const showControlBtns = (e) => {
        e.currentTarget.querySelector(".controls-container").classList.remove("hide")
    }

    const hideControlBtns = (e) => {
        e.currentTarget.querySelector(".controls-container").classList.add("hide")
    }

    const numberOfInstructionHeaders = editFormData.instructions.filter(instructionObj => instructionObj.instructionSection !== '').length

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

    const tagWordElements = tagWords && tagWords.map((word, index) => (
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

    const handleVisibilityChange = (event) => {
        const { name, value } = event.target
        setRecipeVisibility(value)
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
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
            const response = await fetch("https://bastebook.com/recipe-data/check-passwords", options)
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
                const signatureResponse = await axios.get("https://bastebook.com/recipe-data/get-signature")
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
                    if (editInstructionMode || editIngredientMode || currentIngredientsObj.ingredientQuantity == '' &&
                    currentIngredientsObj.ingredientMeasurement == '' && 
                    currentIngredientsObj.ingredientName == '' && 
                    currentIngredientsObj.ingredientExtraDetail == '' && 
                    currentIngredientsObj.ingredientSectionName == '' &&
                    currentInstructionsObj.instructionText == '' &&
                    currentInstructionsObj.instructionSection == '') {
                        return {
                            ...editFormData,
                            imageId: cloudinaryResponse.data.public_id,
                            imgUrl: cloudinaryResponse.data.secure_url,
                            signature: cloudinaryResponse.data.signature
                        }
                    } else if (currentInstructionsObj.instructionText !== '' ||
                            currentInstructionsObj.instructionSection !== '') {
                        return {
                            ...editFormData,
                            imageId: cloudinaryResponse.data.public_id,
                            imgUrl: cloudinaryResponse.data.secure_url,
                            signature: cloudinaryResponse.data.signature,
                            instructions: [...editFormData.instructions, currentInstructionsObj]
                        }
                    } else if (currentInstructionsObj.instructionText == '' &&
                            currentInstructionsObj.instructionSection == '') {
                        return {
                            ...editFormData,
                            imageId: cloudinaryResponse.data.public_id,
                            imgUrl: cloudinaryResponse.data.secure_url,
                            signature: cloudinaryResponse.data.signature,
                            ingredients: [...editFormData.ingredients, currentIngredientsObj]
                        }
                    }
                    else {
                        return {
                            ...editFormData,
                            imageId: cloudinaryResponse.data.public_id,
                            imgUrl: cloudinaryResponse.data.secure_url,
                            signature: cloudinaryResponse.data.signature,
                            instructions: [...editFormData.instructions, currentInstructionsObj],
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
                if (editInstructionMode || editIngredientMode || currentIngredientsObj.ingredientQuantity == '' &&
                currentIngredientsObj.ingredientMeasurement == '' && 
                currentIngredientsObj.ingredientName == '' && 
                currentIngredientsObj.ingredientExtraDetail == '' &&
                currentIngredientsObj.ingredientSectionName == '' &&
                currentInstructionsObj.instructionText == '' &&
                currentInstructionsObj.instructionSection == '') {
                    return {
                        ...editFormData,
                        imgUrl: currentRecipe.imgUrl
                    }
                } else if (currentInstructionsObj.instructionText !== '' ||
                    currentInstructionsObj.instructionSection !== '') {
                    return {
                        ...editFormData,
                        imgUrl: currentRecipe.imgUrl,
                        instructions: [...editFormData.instructions, currentInstructionsObj]
                    }
                } else if (currentInstructionsObj.instructionText == '' &&
                    currentInstructionsObj.instructionSection == '') {
                    return {
                        ...editFormData,
                        imgUrl: currentRecipe.imgUrl,
                        ingredients: [...editFormData.ingredients, currentIngredientsObj]
                    }
                } else {
                    return {
                        ...editFormData,
                        imgUrl: currentRecipe.imgUrl,
                        ingredients: [...editFormData.ingredients, currentIngredientsObj],
                        instructions: [...editFormData.instructions, currentInstructionsObj]
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
        fetch(`https://bastebook.com/recipe-data/update/${currentRecipe._id}`, {
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
                            slug: currentRecipe.slug,
                            defaultServings: currentRecipe.defaultServings,
                            ingredients: currentRecipe.ingredients,
                            instructions: currentRecipe.instructions,
                            notes: currentRecipe.notes,
                            prepTimeHours: currentRecipe.prepTimeHours,
                            prepTimeMins: currentRecipe.prepTimeMins,
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
                            totalCooktime: currentRecipe.totalCooktime,
                            difficultyRating: currentRecipe.difficultyRating ? currentRecipe.difficultyRating : 'easy',
                            cookingHistoryArray: currentRecipe.cookingHistoryArray,

                            createdBy: currentRecipe.createdBy,
                            versionOwner: currentRecipe.versionOwner,
                            recipeYield: currentRecipe.recipeYield,
                            recipeVisibility: currentRecipe.recipeVisibility,
                            comments: currentRecipe.comments,
                            reviews: currentRecipe.reviews,
                            bastebookApproved: currentRecipe.bastebookApproved,
                            hasVideo: currentRecipe.hasVideo,
                            nutritionFacts: currentRecipe.nutritionFacts,
                            equipemnt: currentRecipe.equipemnt,
                            photoCreds: currentRecipe.photoCreds,

                            password: '',
                            honeyp: ''
                        })
                        setImageObject({})
                        setImgPreview(null)
                        setCurrentIngredientsObj({
                            ingredientQuantity: '',
                            ingredientQuantityDecimal: null,
                            ingredientMeasurement: '',
                            ingredientName: '',
                            ingredientExtraDetail: '',
                            ingredientSectionName: ''
                        })
                        setCurrentInstructionsObj({
                            instructionText: '',
                            instructionSection: ''
                        })
                        setCurrentEquipmentObj({
                            equipmentName: '',
                            equipmentLink: ''
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
            const response = await fetch("https://bastebook.com/recipe-data/check-passwords", options)
            const data = await response.json()

            if (data.valid === false) {
                throw new Error("Invalid Password")
            }
            console.log('Password is Valid')
            resetDeletionError()

            const deletionResponse = await fetch(`https://bastebook.com/recipe-data/${currentRecipe._id}`, {
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
                props.mountThenRemoveDeletionMessage()
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
            <main className='loading-message'>
                Loading...
            </main>
        )
    } else if (notFound) {
        return (
            <main className='loading-message'>404 not found</main>
        )
    } else {
        return (
            <main>

                <div className='recipe-page-icon-container'>
                    <Link to={`/${currentRecipe.slug}`}>
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
                <h4 className='edit-form-subtitle'>make changes and then click save!</h4>

                {!Object.keys(imageObject).length > 0 && (<div className='recipe-page-hero' style={{backgroundImage: `linear-gradient(12deg, rgba(0, 0, 0, .95), rgba(0, 0, 0, 0) 45%), url(${editFormData.imgUrl})`}}>
                    <div>
                        <div id='recipe-title-overlay'>{editFormData.recipeName}</div>
                        <div id='recipe-subtitle-overlay'>{editFormData.recipeSubName}</div>
                    </div>
                </div>)}

                <button className={!Object.keys(imageObject).length > 0 ? 'small-img-btn' : 'image-upload-btn'} onClick={handleImageButtonClick} style={{backgroundImage: imgPreview ? `url(${imgPreview})` : "none"}}>
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

                    <section className='title-section'> 
                            <h4 className='section-title'>Info</h4>
                            <div className='section-arrow-container'>
                                <img src={arrow} className="arrowHead section-arrowhead"/>
                            </div>


                            
                            
                            <div className='section-input-container'>
                                <label htmlFor="preptime-hours">Prep Time:</label>
                                <input className="cooktime-hours" type="number" min={0} id="preptime-hours" name="prepTimeHours" 
                                value={editFormData.prepTimeHours} onChange={handleInputChange}></input>
                                <span className="post-input-inline-text">hour(s)</span>
                                <input className="cooktime-mins" type="number" min={0}  max={59} id="preptime-mins" name="prepTimeMins" 
                                value={editFormData.prepTimeMins} onChange={handleInputChange}></input>
                                <span className="post-input-inline-text">mins</span>
                                <label htmlFor="cooktime-hours">Cook Time:</label>
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
                                <label htmlFor="serving-size-input">Servings:</label>
                                <input className="default-servings" id="serving-size-input" type="number" min={0} name="defaultServings" 
                                value={editFormData.defaultServings} onChange={handleInputChange}></input>
                                <label htmlFor="recipe-yield">Yield</label>
                                <input type="text" className='has-placeholder' name="recipeYield"
                                placeholder='about 24 cookies' value={editFormData.recipeYield ?? ''} onChange={handleInputChange}></input>
                            </div>
                    </section>




                    <section className='ingredients-section'>
                        <h4 className='section-title'>Ingredients</h4>
                        <div className='section-arrow-container'>
                            <img src={arrow} className="arrowHead section-arrowhead"/>
                        </div>
                        
                        <div className='section-input-container'>
                            {ingredientPreviews}
                            <div id='current-ingredient-preview' className='hide'>
                                <span id='ingredient-quantity-preview'></span>
                                <span id='ingredient-measurement-preview'></span>
                                <span id='ingredient-name-preview'></span>
                                <span id='ingredient-extra-detail-preview'></span>
                                <span id='ingredient-section-preview'></span>
                            </div>
                            {duplicateIngredients && <div className='duplicate-alert'>You have the same ingredient on there twice. Not judging, but it's just kinda weird to do that.</div>}
                            <label htmlFor="ingredientQuantity" className={`${showIngredientsSectionTitle ? 'disable-input' : ''}`}>Quantity: {invalidQuantityMessage && <span className='invalid-quantity'>*invalid quantity. Too many spaces</span>}</label>
                            <input type="text" id="quantity" name="ingredientQuantity" className={`has-placeholder ${showIngredientsSectionTitle ? 'disable-input' : ''}`} disabled={showIngredientsSectionTitle}
                            ref={ingredientMeasurementEl} placeholder='1/2' value={currentIngredientsObj.ingredientQuantity} onChange={handleIngredientChange} onKeyDown={handleIngredientsEnterKeyDown}></input>
                            <label htmlFor="ingredientMeasurement" className={`${showIngredientsSectionTitle ? 'disable-input' : ''}`}>Measurement:</label>
                            <input type="text" id="measurement" name="ingredientMeasurement" className={`has-placeholder ${showIngredientsSectionTitle ? 'disable-input' : ''}`} disabled={showIngredientsSectionTitle}
                            placeholder='cup' value={currentIngredientsObj.ingredientMeasurement} onChange={handleIngredientChange} onKeyDown={handleIngredientsEnterKeyDown}></input>
                            <label htmlFor="ingredientName" className={`${showIngredientsSectionTitle ? 'disable-input' : ''}`}>Ingredient Name:</label>
                            <input type="text" id="ingredient-name" name="ingredientName" className={`has-placeholder ${showIngredientsSectionTitle ? 'disable-input' : ''}`} disabled={showIngredientsSectionTitle}
                            placeholder='Diced Carrots' value={currentIngredientsObj.ingredientName} onChange={handleIngredientChange} onKeyDown={handleIngredientsEnterKeyDown}></input>
                            <label htmlFor="ingredientExtraDetail" className={`${showIngredientsSectionTitle ? 'disable-input' : ''}`}>Extra Detail:</label>
                            <input type="text" id="ingredient-extra-detail" name="ingredientExtraDetail" className={`has-placeholder ${showIngredientsSectionTitle ? 'disable-input' : ''}`} disabled={showIngredientsSectionTitle}
                            placeholder='(about 1 large carrot)' value={currentIngredientsObj.ingredientExtraDetail} onChange={handleIngredientChange} onKeyDown={handleIngredientsEnterKeyDown}></input>
                            {showIngredientsSectionTitle && <div><label htmlFor="ingredientSectionName">Ingredient Section Name:</label>
                            <input type="text" id="ingredient-section-name" name="ingredientSectionName" className='has-placeholder'
                            placeholder='Marinade Ingredients' ref={ingredientSectionInput} value={currentIngredientsObj.ingredientSectionName} onChange={handleIngredientChange} onKeyDown={handleIngredientsAddSectionKeydown}></input></div>}
                            <div className='ingredients-button-container'>
                                <div className="add-button" onClick={editIngredientMode ? handleEditIngredientSubmit : handleAddIngredientClick}>{editIngredientMode ? 'Update' : showIngredientsSectionTitle ? 'add section' : 'add ingredient'}</div>
                                <div className="add-ingredients-header" onClick={editIngredientMode ? cancelEditIngredientClick : handleAddIngredientSectionClick}>{showIngredientsSectionTitle || editIngredientMode ? 'cancel' : '+ ingredient section'}</div>
                            </div>
                        </div>
                    </section>

                    <section className='instructions-section'>
                        <h4 className='section-title'>Instructions</h4>
                        <div className='section-arrow-container'>
                            <img src={arrow} className="arrowHead section-arrowhead"/>
                        </div>
                        
                        <div className='section-input-container'>
                            {instructionsPreview}
                            {showInstructionsSectionTitle && <div>
                                <label htmlFor="instructionSection">Section Name:</label>
                                <input type="text" id="instruction-section-name" name="instructionSection" className='has-placeholder'
                                placeholder='Marinade Ingredients' ref={instructionSectionInput} value={currentInstructionsObj.instructionSection} onChange={handleInstructionsChange} onKeyDown={handleInstructionsAddSectionKeydown}></input>
                            </div>}
                            <label htmlFor="instructions" className={`${showInstructionsSectionTitle ? 'disable-input' : ''}`}>{editInstructionMode ? 'Editing ' : ''}Step {(editInstructionMode ? '' : editFormData.instructions.length + 1 - numberOfInstructionHeaders)}:</label>
                            <textarea rows="4" type="text" id="instructions" name="instructionText" ref={instructionTextEl} className={`has-placeholder ${showInstructionsSectionTitle ? 'disable-input' : ''}`} onKeyDown={handleInstructionTextKeydown}
                            placeholder='Bring 3 quarts of water to a boil...' value={currentInstructionsObj.instructionText} onChange={handleInstructionsChange} disabled={showInstructionsSectionTitle}></textarea>
                            <div className='ingredients-button-container'>
                                <div className="add-button" onClick={editInstructionMode ? handleEditInstructionSubmit : handleAddInstructionClick}>{editInstructionMode ? 'Update' : showInstructionsSectionTitle ? 'add section' : 'add step'}</div>
                                <div className="add-ingredients-header" onClick={editInstructionMode ? cancelEditInstructionClick : handleAddInstructionSectionClick}>{showInstructionsSectionTitle || editInstructionMode ? 'cancel' : '+ section header'}</div>
                            </div>
                        </div>
                    </section>

                    <section className='notes-section'>                        
                        <h4 className='section-title'>Notes</h4>
                        <div className='section-arrow-container'>
                            <img src={arrow} className="arrowHead section-arrowhead"/>
                        </div>
                        
                        <div className='section-input-container'>
                            <label htmlFor="notes">Type any notes here:</label>
                            <textarea rows="3" type="text" id="notes" name="notes" className='has-placeholder'
                            placeholder='Lizzie prefers the low sodium soy sauce...' value={editFormData.notes} onChange={handleInputChange}></textarea>
                        </div>
                    </section>

                    <section className='extra-info-section'>
                        <h4 className='section-title'>Extra Info</h4>
                        <div className='section-arrow-container'>
                            <img src={arrow} className="arrowHead section-arrowhead"/>
                        </div>

                        <div className='section-input-container'>
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
                                {tagWordElements}
                            </div>
                        </div>
                        <div className='show-more-tags-container' onClick={handleTagToggle}>
                            <div>show {showMoreTags ? 'less' : 'more'}</div>
                            <div className='show-more-arrow-container'>
                                <img src={arrowLight} className={`arrowHead show-more-arrow ${showMoreTags ? 'rotate270' : ''}`}/>
                            </div>
                        </div>
                    </section>

                    <section> 
                        <div className='equipment-section'>
                            <h4 className='section-title'>Equipment</h4>
                            <div className='section-arrow-container'>
                                <img src={arrow} className="arrowHead section-arrowhead"/>
                            </div>
                            
                            <div className='section-input-container'>
                                <div className='equipmentPreview'>{equipmentPreview}</div>
                                <label htmlFor="equipment-name">Equipment Name:</label>
                                <input type="text" id="equipment-name" name="equipmentName" className='has-placeholder' ref={equipmentNameEl}
                                placeholder='Blender' value={currentEquipmentObj.equipmentName} onChange={handleEquipmentChange}></input>
                                <label htmlFor="equipment-link">Equipment Link:</label>
                                <input type="text" id="equipment-link" name="equipmentLink" className='has-placeholder'
                                placeholder='www.example.com' value={currentEquipmentObj.equipmentLink} onChange={handleEquipmentChange} onKeyDown={handleEquipmentEnterKeyDown}></input>
                                <div className="add-button" onClick={handleAddEquipmentClick}>add equipment</div>
                            </div>
                        </div>  
                    </section>

                    <div>
                        <div className='visibility-label'>Recipe Visibility:</div>
                        <div className='visibility-btn-container'>
                            <label className='radio-btn-container'>
                                <input className='radio-btn' type='radio' name='recipeVisibility' value='public' 
                                checked={recipeVisibility === 'public'} onChange={handleVisibilityChange}></input>
                                public
                                <div className='visibility-sub-text'>everyone can see it</div>
                            </label>
                            <label className='radio-btn-container'>
                                <input className='radio-btn' type='radio' name='recipeVisibility' value='private' 
                                checked={recipeVisibility === 'private'} onChange={handleVisibilityChange}></input>
                            private<div className='visibility-sub-text'>only your friends can see it</div>
                            </label>
                            <label className='radio-btn-container'>
                                <input className='radio-btn' type='radio' name='recipeVisibility' value='secret' 
                                checked={recipeVisibility === 'secret'} onChange={handleVisibilityChange}></input>
                            secret<div className='visibility-sub-text'>only you can see it</div>
                            </label>
                        </div>
                    </div>

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
                <Link to={`/${currentRecipe.slug}`}>
                    <div className='back-arrow-container'>
                        <img src={arrow} className="arrowHead back-arrowhead"/>
                        <div className='back-arrow'></div>
                    </div>
                </Link>
            </main>
        )
    }
}