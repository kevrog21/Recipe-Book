import { useState, useEffect } from 'react' 
import { Link } from 'react-router-dom'
import axios from 'axios'
import arrow from '../assets/arrow.svg'
// import image from '../assets/grilled-cheese-tomato-soup.jpg'
import { CloudinaryContext, Image } from "cloudinary-react"

export default function AddRecipeForm() {

    const [formData, setFormData] = useState({
        recipeName: '',
        recipeSubName: '',
        ingredients: [{
            measurement: '',
            ingredientName: '',
            ingredientExtraDetail: ''
        }],
        instructions: '',
        cooktime: '',
        password: '',
        honeyp: ''
    })

    const api_key = "124659146613462"
    const cloud_name = "dot31xj56"
    const CLOUDINARY_PRESET = "o6im1opl"

    useEffect(() => {
        const recipeTitlePreview = document.getElementById("recipe-title-preview")
        recipeTitlePreview.textContent = formData.recipeName
    }, [formData.recipeName])

    useEffect(() => {
        const recipeSubitlePreview = document.getElementById("recipe-subtitle-preview")
        recipeSubitlePreview.textContent = formData.recipeSubName
    }, [formData.recipeSubName])

    useEffect(() => {
        console.log('this is running')
        const measurementPreview = document.getElementById("ingredient-measurement-preview")
        measurementPreview.textContent = formData.ingredients.measurement
    }, [formData.ingredients.measurement])

    // const [image, setImage] = useState(null)

    const [imageObject, setImageObject] = useState({})
    const [imgPreview, setImgPreview] = useState(null)
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

        if (name === 'measurement' || name === 'ingredientName' || name === 'ingredientExtraDetail') {
            setFormData((prevData) => ({
                ...prevData,
                ingredients: [{
                    ...prevData.ingredients,
                    [name]: value,
                }]
            }))
        } else {
            const isNumericField = ["cooktime"].includes(name) //returns true if the target name is included in the array
            setFormData((prevData) => ({
                ...prevData,
                [name]: isNumericField ? parseInt(value) : value
            }))
        }
        console.log(formData.ingredients)
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

                setFormData((prevData) => ({
                    ...prevData,
                    imageId: cloudinaryResponse.data.public_id,
                    imgUrl: cloudinaryResponse.data.secure_url,
                    signature: cloudinaryResponse.data.signature

                    // maybe add signature to request to check if matches expected signature
                }))

                console.log(formData)
            } catch (error) {
                console.log(error)
            }
            console.log("image code ran")
        }

        await fetch("http://localhost:5000/recipes/add", options)
            .then(res => {
                res.json()
                if (res.ok) {
                    setFormData({
                        recipeName: '',
                        recipeSubName: '',
                        ingredients: [],
                        instructions: '',
                        cooktime: '',
                        password: '',
                        honeyp: ''
                    })
                    setImageObject({})
                }
            })
            .then(data => console.log(data))



            



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

    useEffect(() => {
        if (imageObject.file) {
            const recipeTitlePreview = document.getElementById("recipe-title-preview")
            const recipeSubitlePreview = document.getElementById("recipe-subtitle-preview")
            const previewGradient = document.getElementById("preview-gradient")
            const uploadImagePrompt = document.getElementById("upload-image-prompt")
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
        // push the new ingredient object to the ingredients array, then reset the value to ''
        console.log(formData.ingredients)
        // const measurement = document.getElementById("measurement")
        // const ingredientName = document.getElementById("ingredient-name")
        // const ingredientExtraDetail = document.getElementById("ingredient-extra-detail")
        console.log(e)
        // const newIngredientObj = {
        //     measurement: e.measurement.value,
        //     name: e.ingredientName.value,
        //     extraDetail: e.ingredientExtraDetail.value
        // }
        // formData.ingredients.push(newIngredientObj)
        // console.log(formData.ingredients)
    }


    return (
        <div>
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
            

            <form className="add-recipe-form" onSubmit={handleSubmit}>

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
                            <div className='ingredients-preview'>
                                <span id='ingredient-measurement-preview'></span>
                                <span id='ingredient-name-preview'>Diced Carrots</span>
                                <span id='ingredient-extra-detail-preview'>(about 1 large carrot)</span>
                            </div>
                            <label htmlFor="measurement">Measurement:</label>
                            <input type="text" id="measurement" name="measurement" className='has-placeholder'
                            placeholder='1/2 cup' value={formData.ingredients.measurement} onChange={handleInputChange}></input>
                            <label htmlFor="ingredientName">Ingredient Name:</label>
                            <input type="text" id="ingredient-name" name="ingredientName" className='has-placeholder'
                            placeholder='Diced Carrots' value={formData.ingredients.ingredientName} onChange={handleInputChange}></input>
                            <label htmlFor="ingredientExtraDetail">Extra Detail:</label>
                            <input type="text" id="ingredient-extra-detail" name="ingredientExtraDetail" className='has-placeholder'
                            placeholder='(about 1 large carrot)' value={formData.ingredients.ingredientExtraDetail} onChange={handleInputChange}></input>
                            <div className="add-button" onClick={handleAddClick}>add</div>
                        </div>

                </section>

                <section className='instructions-section'>
                        
                        <h4 className='section-title'>Instructions</h4>
                        <div className='section-arrow-container'>
                            <img src={arrow} className="arrowHead section-arrowhead"/>
                        </div>
                        
                        <div className='section-input-container'>
                            <label htmlFor="instructions">Type instructions (click 'add' to start a new step)</label>
                            <textarea type="text" id="instructions" name="instructions" className='has-placeholder'
                            placeholder='Bring 3 quarts of water to a boil...' value={formData.instructions} onChange={handleInputChange}></textarea>
                            <div className="add-button">add</div>
                        </div>

                </section>



                {/* <label htmlFor="instructions">Instructions:</label>
                <textarea type="text" id="instructions" name="instructions" value={formData.instructions} onChange={handleInputChange}></textarea>
                <label htmlFor="cooktime">Cooktime:</label> */}
                <input type="number" id="cooktime" name="cooktime" value={formData.cooktime} onChange={handleInputChange}></input>
                <label htmlFor="password">Secret Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange}></input>
                <div id="error-message" className="error"></div>
                <input type="text" id="honeyp" name="honeyp" value={formData.honeyp} onChange={handleInputChange}></input>
                {/* <label htmlFor="image">Upload Image:</label> */}
                {/* <input type="file" id="image" name="image" onChange={handleImageChange}/> */}
                <button type="submit" className="submit-recipe-btn" id="submit" >Submit Recipe</button>
            </form>

            {/* <form className="temp-img-form" onSubmit={handleImageSubmit}>
                <label htmlFor="image">Upload Image:</label>
                <input type="file" id="image" name="image" onChange={handleImageChange}/>

                <button type="submit" className="submit-image-btn" id="submitImage" >Submit Image</button>
            </form> */}

        </div>
    )
}