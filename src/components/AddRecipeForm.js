import React, { useState, useEffect } from 'react' 
import { Link } from 'react-router-dom'
import axios from 'axios'
import arrow from '../assets/arrow.svg'
// import image from '../assets/grilled-cheese-tomato-soup.jpg'
import { CloudinaryContext, Image } from "cloudinary-react"

export default function AddRecipeForm(props) {

    const [formData, setFormData] = useState({
        recipeName: '',
        recipeSubName: '',
        ingredients: [],
        instructions: '',
        notes: '',
        cooktimeHours: 0,
        cooktimeMins: 0,
        originalRecipeLink: '',
        nutritionScore: 0,
        costScore: 0,
        tastinessScore: 0,
        tags: [],
        lastCooked: '',
        password: '',
        honeyp: ''
    })
    const [finalDataObject, setFinalDataObject] = useState({})
    const [imageObject, setImageObject] = useState({})
    const [imgPreview, setImgPreview] = useState(null)
    const [currentIngredientsObj, setCurrentIngredientsObj] = useState({
        ingredientMeasurement: '',
        ingredientName: '',
        ingredientExtraDetail: ''
    })
    const [ingredientPreviews, setIngredientPreviews] = useState([])
    const [duplicateIngredients, setDuplicateIngredients] = useState(false)
    const [tagWords, setTagWords] = useState(['breakfast', 'lunch', 'dinner', 'brunch', 'dessert', 'drinks', 'winter meals', 'summer meals',
'appetizer', 'side dish', 'main', 'quick', 'vegetarian', 'Vegan', 'Gluten Free', 'Dairy Free', 'basics', 'seafood'])
    const [selectedTagWords, setSelectedTagWords] = useState([])

    const api_key = "124659146613462"
    const cloud_name = "dot31xj56"
    // const CLOUDINARY_PRESET = "o6im1opl"

    useEffect(() => {
        const recipeTitlePreview = document.getElementById("recipe-title-preview")
        recipeTitlePreview.textContent = formData.recipeName
    }, [formData.recipeName])

    useEffect(() => {
        const recipeSubitlePreview = document.getElementById("recipe-subtitle-preview")
        recipeSubitlePreview.textContent = formData.recipeSubName
    }, [formData.recipeSubName])

    useEffect(() => {
        const ingredientMeasurementPreview = document.getElementById("ingredient-measurement-preview")
        const ingredientNamePreview = document.getElementById("ingredient-name-preview")
        const ingredientExtraDetailPreview = document.getElementById("ingredient-extra-detail-preview")
        ingredientMeasurementPreview.textContent = currentIngredientsObj.ingredientMeasurement
        ingredientNamePreview.textContent = currentIngredientsObj.ingredientName
        ingredientExtraDetailPreview.textContent = currentIngredientsObj.ingredientExtraDetail
    }, [currentIngredientsObj])

    useEffect(() => {
        //map over formData ingredients array and create a preview for each one.
        const previews = formData.ingredients.map((ingredient) => {
            return (
                <div key={ingredient.ingredientMeasurement + ingredient.ingredientName + ingredient.ingredientExtraDetail}
                     className='ingredient-preview-element' onMouseEnter={showDeleteButton} onMouseDown={showDeleteButton} onMouseLeave={hideDeleteButton}>
                    <span className='ingredient-measurement-preview'>{ingredient.ingredientMeasurement}</span>
                    <span className='ingredient-name-preview'>{ingredient.ingredientName}</span>
                    <span className='ingredient-extra-detail-preview'>{ingredient.ingredientExtraDetail}</span>
                    <span className='delete-ingredient-btn hide' onMouseDown={() => deleteIngredient(ingredient)}>delete</span>
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
    }, [formData.ingredients])

    // useEffect(() => {
    //     console.log('this is running')
    //     const measurementPreview = document.getElementById("ingredient-measurement-preview")
    //     measurementPreview.textContent = formData.ingredients.measurement
    // }, [formData.ingredients.measurement])

    // const [image, setImage] = useState(null)

    const [finalImageObject, setFinalImageObject] = useState({})
    const [isInitialRender, setIsInitialRender] = useState(true)

//     useEffect(() => {
//         const postData = async () => {
//             if (!isInitialRender) {
//                 console.log(finalImageObject)

//                 const formData = new FormData()
//                 formData.append("file", finalImageObject.file)
//                 formData.append("api_key", api_key)
//                 formData.append("signature", finalImageObject.signature)
//                 formData.append("timestamp", finalImageObject.timestamp)
//                 // formData.append("upload_preset", 'khjbvoiy' )

//                 console.log("formData entries")
//                 for (const entry of formData.entries()) {
//                     console.log(entry)
//                 }

//                 const requestOptions = {
//                     method: "POST",
//                     body: formData,
//                     headers: { "Content-Type": "multipart/form-data" },
//                     onUploadProgress: function (e) {
//                         console.log(e.loaded / e.total)
//                     }
//                 }

// //https://api.cloudinary.com/v1_1/${cloud_name}/image/upload

//                 console.log("body:", requestOptions.body)
//                 try {
//                     const cloudinaryResponse = await axios.post(`http://localhost:5000/recipes/upload-image`, formData, requestOptions)
//                     const data = await cloudinaryResponse.data.json()
//                     console.log(data)
//                 } catch(error) {
//                     console.error(error)
//                 }
//             } else {
//                 setIsInitialRender(false)
//             }
//         }
//         postData()
//     }, [finalImageObject])

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setImageObject({
            file: selectedImage
        })
        console.log(selectedImage)
    }

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target

    //     const isNumericField = ["cooktime"].includes(name) //returns true if the target name is included in the array

    //     // if (name === 'measurement' || name === 'ingredientName' || name === 'ingredientExtraDetail') {
    //     if (name.startsWith("ingredient")) {
    //         const ingredienIndex = parseInt(name.split("-"[1]))
    //         setFormData((prevData) => {
    //             const updatedIngredients = [...prevData.ingredients]
    //             updatedIngredients[ingredienIndex] = {
    //                 ...updatedIngredients[ingredienIndex],
    //                 [name.split("-")[0]]: value
    //             }
    //             return {
    //             ...prevData,
    //             ingerdients: updatedIngredients
    //             }
    //         })
    //     } else {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             [name]: isNumericField ? parseInt(value) : value
    //         }))
    //     }
    // }

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target

    //     if (name === 'measurement' || name === 'ingredientName' || name === 'ingredientExtraDetail') {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             ingredients: {
    //                 ...prevData.ingredients,
    //                 [name]: value,
    //             }
    //         }))
    //     } else {
    //         const isNumericField = ["cooktime"].includes(name) //returns true if the target name is included in the array
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             [name]: isNumericField ? parseInt(value) : value
    //         }))
    //     }
    // }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        const isNumericField = ["cooktimeHourse", "cooktimeMins", "nutritionScore"].includes(name) //returns true if the target name is included in the array
        setFormData((prevData) => ({
            ...prevData,
            [name]: isNumericField ? parseInt(value) : value
        }))
    }

    const handleIngredientChange = (e) => {
        const { name, value } = e.target
        setCurrentIngredientsObj((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const checkKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') e.preventDefault()
    }

    const showDeleteButton = (e) => {
        e.currentTarget.querySelector(".delete-ingredient-btn").classList.remove("hide")
    }

    const hideDeleteButton = (e) => {
        e.currentTarget.querySelector(".delete-ingredient-btn").classList.add("hide")
    }

    const deleteIngredient = (ingredientToDelete) => {
        setFormData((prevData) => ({
            ...prevData,
            ingredients: prevData.ingredients.filter(
                (ingredient) => ingredient !== ingredientToDelete
            )
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const options = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch("http://localhost:5000/recipes/check-password", options)
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

        // await fetch("http://localhost:5000/recipes/check-password", options)
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.valid === false) {
        //             throw new Error("Invalid Password")
        //         }
        //         // if password is correct, continue with rest of the function
        //         console.log('Password Is Valid')
        //     })
        //     .catch(error => {
        //         console.error(error)
        //     })

             console.log('only log this if password is valid')

        if (imageObject.file) {
            try {
                const signatureResponse = await axios.get("http://localhost:5000/recipes/get-signature")
                const data = new FormData()
                data.append("file", imageObject.file)
                data.append("api_key", api_key)
                data.append("signature", signatureResponse.data.signature)
                data.append("timestamp", signatureResponse.data.timestamp)

                // for (const entry of data.entries()) {
                //     console.log(entry)
                //     }

                // console.log(data)
                // console.log(imageObject)

                const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: function (e) {
                    console.log(e.loaded / e.total)
                    }
                })

                // const cloudinaryResponse = await axios.post("http://localhost:5000/recipes/post-to-cloudinary", data)
                console.log(cloudinaryResponse.data)

                const photoData = {
                    public_id: cloudinaryResponse.data.public_id,
                    version: cloudinaryResponse.data.version,
                    signature: cloudinaryResponse.data.signature
                }
                console.log(formData)

                setFinalDataObject(() => {
                    if (currentIngredientsObj.ingredientMeasurement == '' && 
                    currentIngredientsObj.ingredientName == '' && 
                    currentIngredientsObj.ingredientExtraDetail == '') {
                        return {
                            ...formData,
                            isFavorited: false,
                            isRequested: false,
                            totalCooktime: ((formData.cooktimeHours * 60) + formData.cooktimeMins),
                            imageId: cloudinaryResponse.data.public_id,
                            imgUrl: cloudinaryResponse.data.secure_url,
                            signature: cloudinaryResponse.data.signature
                        }
                    } else {
                        return {
                            ...formData,
                            isFavorited: false,
                            isRequested: false,
                            totalCooktime: ((formData.cooktimeHours * 60) + formData.cooktimeMins),
                            imageId: cloudinaryResponse.data.public_id,
                            imgUrl: cloudinaryResponse.data.secure_url,
                            signature: cloudinaryResponse.data.signature,
                            ingredients: [...formData.ingredients, currentIngredientsObj]
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
                        ...formData,
                        isFavorited: false,
                        isRequested: false,
                        totalCooktime: ((formData.cooktimeHours * 60) + formData.cooktimeMins),
                        imageId: 'no image added',
                        imgUrl: 'no image added',
                        signature: 'no image added'
                    }
                } else {
                    console.log('should add this code to data object')
                    return {
                        ...formData,
                        isFavorited: false,
                        isRequested: false,
                        totalCooktime: ((formData.cooktimeHours * 60) + formData.cooktimeMins),
                        imageId: 'no image added',
                        imgUrl: 'no image added',
                        signature: 'no image added',
                        ingredients: [...formData.ingredients, currentIngredientsObj]
                    }
                }
            })
        }

        // fetch("http://localhost:5000/recipes/add", {
        //     method: "POST",
        //     body: JSON.stringify(formData), 
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then(res => {
        //         res.json()
        //         if (res.ok) {
        //             console.log('successfully posted!')
        //             setFormData({
        //                 recipeName: '',
        //                 recipeSubName: '',
        //                 ingredients: [],
        //                 instructions: '',
        //                 notes: '',
        //                 cooktime: '',
        //                 password: '',
        //                 honeyp: ''
        //             })
        //             setImageObject({})
        //         }
        //     })
        //     .then(data => console.log(data))



            



            // // make a get request to our own server at /get-signature
            // console.log(typeof imageObject.file)
            // signatureResponse = fetch("http://localhost:5000/recipes/get-signature")
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log(data)

            //         console.log(imageObject)
            //         setFinalImageObject((prevData) => ({
            //             ...prevData,
            //             file: imageObject.file,
            //             api_key: api_key,
            //             signature: data.signature,
            //             timestamp: data.timestamp
            //         }))
            //     })
            //     .catch(error => {
            //         console.error(error)
            //     })
            //     console.log("image code ran")
        


        // if (imageObject.file) {
        //     // make a get request to our own server at /get-signature
        //     console.log(imageObject.file)
        //     signatureResponse = fetch("http://localhost:5000/recipes/get-signature")
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data)
        //             new Promise((resolve) => {
        //                 setImageObject((prevData) => ({
        //                     ...prevData,
        //                     file: imageObject.file,
        //                     api_key: api_key,
        //                     signature: data.signature,
        //                     timestamp: data.timestamp
        //                 }))
        //                 resolve()
        //                 return imageObject
        //             })
        //             .then(() => {
        //                 console.log(imageObject)
                        
        //                 const cloudinaryResponse = fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload?upload_preset=khjbvoiy`, {
        //                     method: "POST",
        //                     body: JSON.stringify(imageObject),
        //                     headers: { "Content-Type": "multipart/form-data" },
        //                     onUploadProgress: function (e) {
        //                         console.log(e.loaded / e.total)
        //                     }
        //                 })
        //                 cloudinaryResponse.then(response => response.json())
        //                 cloudinaryResponse.then(data => {
        //                     console.log(data)
        //                 })
        //                 .catch(error => {
        //                     console.error(error)
        //                 })
        //                 console.log(cloudinaryResponse.data)
        //             })

        //         })
        //         .catch(error => {
        //             console.error(error)
        //         })
        //         console.log("image code ran")
        // }

        // fetch("http://localhost:5000/recipes/add", options)
        //     .then(res => {
        //         res.json()
        //         if (res.ok) {
        //             setFormData({
        //                 recipeName: '',
        //                 instructions: '',
        //                 cooktime: '',
        //                 password: '',
        //                 honeyp: ''
        //             })
        //             setImageObject({})
        //         }
        //     })
        //     .then(data => console.log(data))
    }

    const showError = (message) => {
        const errorElement = document.getElementById('error-message')
        errorElement.textContent = message
    }

    const resetError = () => {
        const errorElement = document.getElementById('error-message')
        errorElement.textContent = ''
    }

    // useEffect(() => {
    //     const imageInput = document.getElementById("imageInput")
    //     const fancyImageButton = document.getElementById("image-upload-btn")

    //     fancyImageButton.addEventListener('click', () => {
    //         imageInput.click()
    //     })

    //     // imageInput.addEventListener('change', (event) => {
    //     //     console.log(event.target.files)
    //     // })
    // }, [])
    const recipeTitlePreview = document.getElementById("recipe-title-preview")
    const recipeSubitlePreview = document.getElementById("recipe-subtitle-preview")
    const previewGradient = document.getElementById("preview-gradient")
    const uploadImagePrompt = document.getElementById("upload-image-prompt")

    useEffect(() => {
        if (Object.keys(finalDataObject).length !== 0) {
            console.log(finalDataObject)
        fetch("http://localhost:5000/recipes/add", {
                method: "POST",
                body: JSON.stringify(finalDataObject), 
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    res.json()
                    if (res.ok) {
                        console.log('successfully posted!')
                        setFormData({
                            recipeName: '',
                            recipeSubName: '',
                            ingredients: [],
                            instructions: '',
                            notes: '',
                            cooktimeHours: 0,
                            cooktimeMins: 0,
                            originalRecipeLink: '',
                            nutritionScore: 0,
                            costScore: 0,
                            tastinessScore: 0,
                            tags: [],
                            lastCooked: '',
                            password: '',
                            honeyp: ''
                        })
                        setImageObject({})
                        setImgPreview(null)
                        uploadImagePrompt.classList.remove("hide")
                        recipeTitlePreview.classList.remove("white-text")
                        recipeSubitlePreview.classList.remove("white-text")
                        previewGradient.classList.add("hide")
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

    useEffect(() => {
        if (imageObject.file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImgPreview(reader.result)
            }
            reader.readAsDataURL(imageObject.file)

            uploadImagePrompt.classList.add("hide")
            recipeTitlePreview.classList.add("white-text")
            recipeSubitlePreview.classList.add("white-text")
            previewGradient.classList.remove("hide")
        }
    }, [imageObject])

    function handleImageButtonClick() {
        const imageInput = document.getElementById("imageInput")
        imageInput.click()
    }

    const handleAddClick = (e) => {
        console.log(formData.ingredients)
        if (currentIngredientsObj.ingredientMeasurement !== '' || 
            currentIngredientsObj.ingredientName !== '' || 
            currentIngredientsObj.ingredientExtraDetail !== '') {
                console.log('running this code')
                setFormData((prevData) => ({
                    ...prevData,
                    ingredients: [...prevData.ingredients, currentIngredientsObj]
                }))
                console.log(formData.ingredients)
                setCurrentIngredientsObj(() => ({
                    ingredientMeasurement: '',
                    ingredientName: '',
                    ingredientExtraDetail: ''
                }))
        } else {
            console.log('nothing to add. add some stuff yo!')
        }
    }

    const handleIngredientsEnterKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddClick()
        }
    }

    // const handleTagClick = (e) => {
    //     console.log(e.target)
    //     const { value } = e.target
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         tags: [...prevData.tags, value]
    //     }))
    //     console.log('clicked', formData)
    // }

    // const listOfTagOptions = [
    //     'breakfast',
    //     'lunch',
    //     'dinner',
    //     'dessert',
    //     'brunch',
    //     'supduperecipes'
    // ]

    // useEffect(() => {
    //     const tags = listOfTagOptions.map((word) => {
    //         if (word.length > 10) {
    //             return (
    //                 <span key={word} name={word} value={word}className='tag1 two-column-tag' onClick={() => handleTagClick}>{word}</span>
    //             )
    //         } else {
    //             return (
    //                 <span key={word} name={word} value={word} className='tag1' onClick={() => handleTagClick(word)}>{word}</span>
    //             )
    //         }
    //     })
        
    //     setTagElements(tags)
    // }, [])

    // const useErrorBoundary = () => {
    //     const [hasError, setHasError] = useState(false)

    //     const handleCatchError = (error, errorInfo) => {
    //         setHasError(true)
    //     }
    //     return { hasError, handleCatchError}
    // }

    // const ErrorBoundary = ({ children }) => {
    //     // const {hasError, handleCatchError } = useErrorBoundary()
    //     const [hasError, setHasError] = useState(false)
    //     const handleCatchError = (error, errorInfo) => {
    //         console.error(error, errorInfo)
    //         setHasError(true)
    //     }

    //     if (hasError) {
    //         return <div>pssst... you have two of the same ingredients 
    //             on there. You can delete one of them if you want.. or don't, 
    //             I don't really care. I'm just a robot beep boop bop.</div>
    //     }
    //     return (
    //         <React.fragment>
    //             {children}
    //         </React.fragment>
    //     )
    // }

    const handleTagClick = (word) => {
        setFormData((prevData) => {
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

// const handleTagClick = (e) => {
    //     console.log(e.target)
    //     const { value } = e.target
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         tags: [...prevData.tags, value]
    //     }))
    //     console.log('clicked', formData)
    // }

    return (
        <main>
            <Link to='/'>
                <div className='back-arrow-container'>
                    <img src={arrow} className="arrowHead back-arrowhead"/>
                    <div className='back-arrow'></div>
                </div>
            </Link>
            <h2 className='recipe-form-title'>New Recipe Form</h2>

           
            <button id="image-upload-btn" onClick={handleImageButtonClick} style={{backgroundImage: `url(${imgPreview})`}}>
                <div id="upload-image-prompt">click here to upload image</div>
                <div id='preview-gradient' className='hide'></div>
                <div className="preview-text-container">
                    <div id='recipe-title-preview'></div>
                    <div id='recipe-subtitle-preview'></div>
                </div>
            </button>
            <input type="file" id="imageInput" name="image" onChange={handleImageChange}/>
            

            <form className="add-recipe-form" onSubmit={handleSubmit} onKeyDown={(e) => checkKeyDown(e)}>

                <section className='title-section'>
                        
                        <h4 className='section-title'>Title</h4>
                        <div className='section-arrow-container'>
                            <img src={arrow} className="arrowHead section-arrowhead"/>
                            {/* <div className='section-arrow'></div> */}
                        </div>
                        
                        <div className='section-input-container'>
                            <label htmlFor="recipe-name">Recipe Title:</label>
                            <input type="text" id="recipe-name" name="recipeName" className='has-placeholder'
                            placeholder='Grilled Chicken' value={formData.recipeName} onChange={handleInputChange}></input>
                            
                            <label htmlFor="recipe-sub-name">Recipe Subitle:</label>
                            <input type="text" id="recipe-sub-name" className='has-placeholder' name="recipeSubName"
                            placeholder='with rice & veggies' value={formData.recipeSubName} onChange={handleInputChange}></input>
                        </div>

                </section>

                <section className='ingredients-section'>
                        
                        <h4 className='section-title'>Ingredients</h4>
                        <div className='section-arrow-container'>
                            <img src={arrow} className="arrowHead section-arrowhead"/>
                        </div>
                        
                        <div className='section-input-container'>
                            {/* map over ingredients array to display entered ingredients here */}
                            {/* <div id='ingredient-elements'>{ingredientPreviewEls}</div> */}
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
                            placeholder='Bring 3 quarts of water to a boil...' value={formData.instructions} onChange={handleInputChange}></textarea>
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
                            placeholder='Lizzie prefers the low sodium soy sauce...' value={formData.notes} onChange={handleInputChange}></textarea>
                        </div>

                </section>

                <section className='extra-info-section'>
                        
                        <h4 className='section-title'>Extra Info</h4>
                        <div className='section-arrow-container'>
                            <img src={arrow} className="arrowHead section-arrowhead"/>
                        </div>
                        
                        <div className='section-input-container'>
                            <label htmlFor="cooktime-hours">Estimated Total Cooktime:</label>
                            <input className="cooktime-hours" type="number" min={0} id="cooktime-hours" name="cooktimeHours" 
                            value={formData.cooktimeHours} onChange={handleInputChange}></input>
                            <span className="post-input-inline-text">hour(s)</span>
                            <input className="cooktime-mins" type="number" min={0}  max={59} id="cooktime-mins" name="cooktimeMins" 
                            value={formData.cooktimeMins} onChange={handleInputChange}></input>
                            <span className="post-input-inline-text">mins</span>
                            <label htmlFor="nutrition-score">Nutrition Score:</label>
                            <input className="nutrition-score" type="number" min={0} max={10} id="nutrition-score" name="nutritionScore" 
                            value={formData.nutritionScore} onChange={handleInputChange}></input>
                            <span className="post-input-inline-text">/10</span>
                            <label htmlFor="cost-score">Cost Score:</label>
                            <input className="cost-score" type="number" min={0} max={10} id="cost-score" name="costScore" 
                            value={formData.costScore} onChange={handleInputChange}></input>
                            <span className="post-input-inline-text">/10</span>
                            <label htmlFor="tastiness-score">Tastiness Score:</label>
                            <input className="tastiness-score" type="number" min={0} max={10} id="tastiness-score" name="tastinessScore" 
                            value={formData.tastinessScore} onChange={handleInputChange}></input>
                            <span className="post-input-inline-text">/10</span>
                            <label htmlFor="originalRecipeLink">Link to original recipe:</label>
                            <input type="text" id="oringinal-link" name="originalRecipeLink" placeholder='https://examplerecipe.com/'
                            className='has-placeholder' value={formData.originalRecipeLink} onChange={handleInputChange}></input>
                        </div>

                </section>

                <section className='tags-section'>
                        
                        <h4 className='section-title'>Tags</h4>
                        <div className='section-arrow-container'>
                            <img src={arrow} className="arrowHead section-arrowhead"/>
                        </div>
                        
                        <div className='section-input-container' id='tags-container'>
                            {tagWords.map((word, index) => (
                                <span key={index} onClick={() => handleTagClick(word)}
                                className={
                                    word.length > 10
                                    ? selectedTagWords.includes(word) ? 'tag1 two-column-tag selected' : 'tag1 two-column-tag'
                                    : selectedTagWords.includes(word) ? 'tag1 selected' : 'tag1'
                                }
                                >
                                    {word}
                                </span>
                            ))
                            }
                            
                        </div>

                </section>

                {/* <input type="number" id="cooktime" name="cooktime" value={formData.cooktime} onChange={handleInputChange}></input> */}
                <label htmlFor="password">Secret Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange}></input>
                <div id="error-message" className="error"></div>
                <input type="text" id="honeyp" name="honeyp" value={formData.honeyp} onChange={handleInputChange}></input>
                {/* <input type="file" id="image" name="image" onChange={handleImageChange}/> */}
                <button type="submit" className="submit-recipe-btn" id="submit" >Submit Recipe</button>
            </form>

            <div className='success-el hide'>
                SUCCESS!
            </div>

            {/* <form className="temp-img-form" onSubmit={handleImageSubmit}>
                <label htmlFor="image">Upload Image:</label>
                <input type="file" id="image" name="image" onChange={handleImageChange}/>

                <button type="submit" className="submit-image-btn" id="submitImage" >Submit Image</button>
            </form> */}

        </main>
    )
}