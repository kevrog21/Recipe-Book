import { Router } from "express"
import Recipe from '../models/recipes.model.js'
import cloudinary from 'cloudinary'
import cors from 'cors'
import express from "express"
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(express.static("public"))
router.use(express.json())
router.use(cors())

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDINARYSECRET,
    secure: true
  })

const secretPassword = process.env.SECRET_PWORD

router.route('/').get((req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/check-password').post((req, res) => {
    console.log("check password running")
    const password = req.body.password
    const honeyp = req.body.honeyp

    if (password === secretPassword && honeyp === '') {
        res.json({ valid: true })
    } else {
        res.json({ valid: false })
    }
})

router.get("/get-signature", (req, res) => {

    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp
      },
      cloudinaryConfig.api_secret
    )
    res.json({ timestamp, signature })
  })

  router.post("/post-to-cloudinary", (req, res) => {
    console.log('received req')
    cloudinary.v2.uploader.upload(req.body.file.path, {resource_type: "image"})
        .then((result) => {console.log("success", JSON.stringinfy(result, null, 2))
        res.sendStatus(200
    )})
    .catch((error) => {console.log("error", JSON.stringify(error, null, 2))
            res.status(500).json({error: "Upload Failed" })
    })
  })


// router.post("/do-something-with-photo", async (req, res) => {
//     // based on the public_id and the version that the (potentially malicious) user is submitting...
//     // we can combine those values along with our SECRET key to see what we would expect the signature to be if it was innocent / valid / actually coming from Cloudinary
//     const expectedSignature = cloudinary.utils.api_sign_request({ public_id: req.body.public_id, version: req.body.version }, cloudinaryConfig.api_secret)
  
//     // We can trust the visitor's data if their signature is what we'd expect it to be...
//     // Because without the SECRET key there's no way for someone to know what the signature should be...
//     if (expectedSignature === req.body.signature) {
//       // Do whatever you need to do with the public_id for the photo
//       // Store it in a database or pass it to another service etc...
//       await fse.ensureFile("./data.txt")
//       const existingData = await fse.readFile("./data.txt", "utf8")
//       await fse.outputFile("./data.txt", existingData + req.body.public_id + "\n")
//     }
//   })

router.route('/add').post((req, res) => {
    console.log("running this code yooo")
    const recipeName = req.body.recipeName
    const recipeSubName = req.body.recipeSubName
    const ingredients = Array.isArray(req.body.ingredients) ? req.body.ingredients : []
    const instructions = req.body.instructions
    const notes = req.body.notes
    const cooktimeHours = Number(req.body.cooktimeHours)
    const cooktimeMins = Number(req.body.cooktimeMins)
    const totalCooktime = Number(req.body.totalCooktime)
    const originalRecipeLink = req.body.originalRecipeLink
    const nutritionScore = req.body.nutritionScore
    const costScore = req.body.costScore
    const tastinessScore = req.body.tastinessScore
    const tags = Array.isArray(req.body.tags) ? req.body.tags : []
    const imgUrl = req.body.imgUrl
    const password = req.body.password
    const honeyp = req.body.honeyp

    console.log('Recipe Name: ', recipeName,'Recipe Subname: ', recipeSubName, 'ingredients: ', ingredients, 'instructions: ', instructions,'notes: ', notes,'imgUrl: ', imgUrl,'password: ', password,'honeypot: ', honeyp)

    if (password === secretPassword && honeyp === '') {
        const newRecipe = new Recipe({
            recipeName,
            recipeSubName,
            ingredients,
            instructions,
            notes,
            cooktimeHours,
            cooktimeMins,
            totalCooktime,
            originalRecipeLink,
            nutritionScore,
            costScore,
            tastinessScore,
            tags,
            imgUrl
        })
        newRecipe.save()
        .then(() => res.json('Recipe Added!'))
        .catch(err => res.status(400).json('Error: ' + err))
    } else {
        res.status(401).json({ error: 'Incorrect password' })
    }
})

// if (password === secretPassword && honeyp === '') {
//     const newRecipe = new Recipe({
//         recipeName,
//         recipeSubName,
//         ingredients,
//         instructions,
//         notes,
//         cooktime,
//         imageId,
//         imageUrl
//     })
//     newRecipe.save()
//         .then(() => res.json('Recipe Added!'))
//         .catch(err => res.status(400).json('Error: ' + err))
// } else {
//     res.status(401).json({ error: 'Incorrect password' })
// }


// router.route('/add').post((req, res) => {
//     const recipeName = req.body.recipeName
//     const recipeSubName = req.body.recipeSubName
//     const ingredients = req.body.ingredients
//     const instructions = req.body.instructions
//     const notes = req.body.notes
//     const cooktime = Number(req.body.cooktime)
//     const imageUrl = req.body.imageUrl
//     const password = req.body.password
//     const honeyp = req.body.honeyp

//     if (password === secretPassword && honeyp === '') {
//         const newRecipe = new Recipe({
//             recipeName,
//             recipeSubName,
//             ingredients,
//             instructions,
//             notes,
//             cooktime,
//             imageId,
//             imageUrl
//         })
    
//         newRecipe.save()
//             .then(() => res.json('Recipe Added!'))
//             .catch(err => res.status(400).json('Error: ' + err))
//     } else {
//         res.status(401).json({ error: 'Incorrect password' })
//     }
// })

router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(recipe => res.json('Recipe Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            recipe.recipeName = req.body.recipeName
            recipe.instructions = req.body.instructions
            recipe.cooktime = Number(req.body.cooktime)
            recipe.imageId = req.body.imageId
            recipe.imgTimestamp = req.body.imgTimestamp

            recipe.save()
                .then(() => res.json('Recipe updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

export default router




