import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react' 
import RecipeDataService from '../services/recipeList'
import axios from 'axios'
import { CloudinaryContext, Image } from "cloudinary-react"

const RecipesList = props => {

    const [recipeData, setRecipeData] = useState([])

    // useEffect(() => {
    //     const testResponse = fetch('http://localhost:5000/recipes/test-endpoint')
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //     })
    // }, [])

    useEffect(() => {
        retrieveRecipes()
    }, [])

    const retrieveRecipes = () => {
        RecipeDataService.getAll()
            .then(response => {
                console.log(response.data)
                setRecipeData(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const list = recipeData ? recipeData.map(recipe => <h4 key={recipe._id}>{recipe.recipeName}</h4>) : ""

    const [formData, setFormData] = useState({
        recipeName: '',
        instructions: '',
        cooktime: '',
        password: '',
        honeyp: ''
    })




    const api_key = "124659146613462"
    const cloud_name = "dot31xj56"
    // const CLOUDINARY_PRESET = "khjbvoiy"

    // const [image, setImage] = useState(null)

    const [imageObject, setImageObject] = useState({})
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

    const handleInputChange = (e) => {
        const { name, value } = e.target

        const isNumericField = ["cooktime"].includes(name) //returns true if the target name is included in the array
        setFormData((prevData) => ({
            ...prevData,
            [name]: isNumericField ? parseInt(value) : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // const options = {
        //     method: "POST",
        //     body: JSON.stringify(formData),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // }

        // if image, get signature and add it to form data to be sent to the server.

        // check if a file is included in form

        // let signatureResponse = {}

        if (imageObject.file) {
            try {
                const signatureResponse = await axios.get("http://localhost:5000/recipes/get-signature")
                const data = new FormData()
                data.append("file", document.querySelector("#image").files[0])
                data.append("api_key", api_key)
                data.append("signature", signatureResponse.data.signature)
                data.append("timestamp", signatureResponse.data.timestamp)

                for (const entry of data.entries()) {
                    console.log(entry)
                    }

                // console.log(data)
                // console.log(imageObject)

                const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: function (e) {
                    console.log(e.loaded / e.total)
                    }
                })
                console.log(cloudinaryResponse.data)

            //     setFinalImageObject((prevData) => ({
            //         ...prevData,
            //         file: imageObject.file,
            //         api_key: api_key,
            //         signature: data.signature,
            //         timestamp: data.timestamp
            //     }))
            // } catch (error) {
            //     console.log(error)
            // }
            // console.log("image code ran")

            const photoData = {
                public_id: cloudinaryResponse.data.public_id,
                version: cloudinaryResponse.data.version,
                signature: cloudinaryResponse.data.signature
              }

            } catch (error) {
                console.log(error)
            }
            console.log("image code ran")
        }



            



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
        //             setImage(null)
        //         }
        //     })
        //     .then(data => console.log(data))
    }

    return (
        <div>
            <h2>Add Recipes</h2>
            {list}

            <CloudinaryContext cloudName="dot31xj56">
                <div>
                    <Image publicId="sample" width="50" />
                </div>
                <Image publicId="sample" width="0.5" />
            </CloudinaryContext>

            <form className="add-recipe-form" onSubmit={handleSubmit}>
                <label htmlFor="recipe-name">Recipe Name:</label>
                <input type="text" id="recipe-name" name="recipeName" value={formData.recipeName} onChange={handleInputChange}></input>
                <label htmlFor="instructions">Instructions:</label>
                <textarea type="text" id="instructions" name="instructions" value={formData.instructions} onChange={handleInputChange}></textarea>
                <label htmlFor="cooktime">Cooktime:</label>
                <input type="number" id="cooktime" name="cooktime" value={formData.cooktime} onChange={handleInputChange}></input>
                <label htmlFor="password">Secret Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange}></input>
                <input type="text" id="honeyp" name="honeyp" value={formData.honeyp} onChange={handleInputChange}></input>
                <label htmlFor="image">Upload Image:</label>
                <input type="file" id="image" name="image" onChange={handleImageChange}/>
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

export default RecipesList