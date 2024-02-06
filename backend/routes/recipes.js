import { Router } from "express"
import Recipe from '../models/recipes.model.js'
import cloudinary from 'cloudinary'
import cors from 'cors'
import express from "express"
import dotenv from 'dotenv'
import favicon from 'serve-favicon'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const router = Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

router.use(express.static("public"))
router.use(express.json())
router.use(cors())

// router.use('/favicon.svg', express.static('/favicon.svg'))

// router.use(favicon.default(__dirname + './public/favicon.svg'))
// console.log(favicon.default)
router.use(favicon(path.join(__dirname, '..', '..', 'public', 'favicon.svg')))
console.log(path.join(__dirname, '..', '..', 'public', 'favicon.svg'))

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

router.route('/check-passwords').post((req, res) => {
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

router.route('/add').post((req, res) => {
    const recipeName = req.body.recipeName
    const recipeSubName = req.body.recipeSubName
    const defaultServings = Number(req.body.defaultServings)
    const ingredients = Array.isArray(req.body.ingredients) ? req.body.ingredients : []
    const instructions = Array.isArray(req.body.instructions) ? req.body.instructions : []
    const notes = req.body.notes
    const prepTimeHours = Number(req.body.prepTimeHours)
    const prepTimeMins = Number(req.body.prepTimeMins)
    const cooktimeHours = Number(req.body.cooktimeHours)
    const cooktimeMins = Number(req.body.cooktimeMins)
    const totalCooktime = Number(req.body.totalCooktime)
    const difficultyRating = req.body.difficultyRating
    const originalRecipeLink = req.body.originalRecipeLink
    const nutritionScore = req.body.nutritionScore
    const costScore = req.body.costScore
    const tastinessScore = req.body.tastinessScore
    const tags = Array.isArray(req.body.tags) ? req.body.tags : []
    const imgUrl = req.body.imgUrl
    const password = req.body.password
    const honeyp = req.body.honeyp
    const isFavorited = req.body.isFavorited
    const isRequested = req.body.isRequested
    const cookingHistoryArray = req.body.cookingHistoryArray
    const createdBy = req.body.createdBy
    const versionOwner = req.body.versionOwner
    const recipeYield = req.body.recipeYield
    const recipeVisibility = req.body.recipeVisibility
    const comments = Array.isArray(req.body.comments) ? req.body.comments : []
    const reviews = Array.isArray(req.body.reviews) ? req.body.reviews : []
    const bastebookApproved = req.body.bastebookApproved
    const hasVideo = req.body.hasVideo
    const nutritionFacts = req.body.nutritionFacts
    const equipment = Array.isArray(req.body.equipment) ? req.body.equipment : []
    const photoCreds = req.body.photoCreds

    const timeScore = 
        req.body.totalCooktime <= 30 ? 10 : 
        req.body.totalCooktime <= 45 ? 9 :
        req.body.totalCooktime <= 60 ? 8 :
        req.body.totalCooktime <= 75 ? 7 :
        req.body.totalCooktime <= 90 ? 6 :
        req.body.totalCooktime <= 105 ? 5 :
        req.body.totalCooktime <= 120 ? 4 :
        req.body.totalCooktime <= 135 ? 3 :
        req.body.totalCooktime <= 150 ? 2 :
        req.body.totalCooktime <= 175 ? 1 : 0

    if (password === secretPassword && honeyp === '') {
        const newRecipe = new Recipe({
            recipeName,
            recipeSubName,
            defaultServings,
            ingredients,
            instructions,
            notes,
            prepTimeHours,
            prepTimeMins,
            cooktimeHours,
            cooktimeMins,
            totalCooktime,
            difficultyRating,
            originalRecipeLink,
            nutritionScore,
            costScore,
            tastinessScore,
            timeScore,
            tags,
            imgUrl,
            isFavorited,
            isRequested,
            cookingHistoryArray,
            createdBy,
            versionOwner,
            recipeYield,
            recipeVisibility,
            comments,
            reviews,
            bastebookApproved,
            hasVideo,
            nutritionFacts,
            equipment,
            photoCreds,
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
            // recipe.recipeName = req.body.recipeName
            // recipe.instructions = req.body.instructions
            // recipe.cooktime = Number(req.body.cooktime)
            // recipe.imageId = req.body.imageId
            // recipe.imgTimestamp = req.body.imgTimestamp
            // recipe.isFavorited = !req.body.isFavorited

            recipe.recipeName = req.body.recipeName
            recipe.recipeSubName = req.body.recipeSubName
            recipe.defaultServings =  Number(req.body.defaultServings)
            recipe.ingredients = Array.isArray(req.body.ingredients) ? req.body.ingredients : []
            recipe.instructions = Array.isArray(req.body.instructions) ? req.body.instructions : []
            recipe.notes = req.body.notes
            recipe.prepTimeHours = Number(req.body.prepTimeHours)
            recipe.prepTimeMins = Number(req.body.prepTimeMins)
            recipe.cooktimeHours = Number(req.body.cooktimeHours)
            recipe.cooktimeMins = Number(req.body.cooktimeMins)
            recipe.totalCooktime = Number((parseInt(req.body.prepTimeHours) * 60) + parseInt(req.body.prepTimeMins) + (parseInt(req.body.cooktimeHours) * 60) + parseInt(req.body.cooktimeMins))
            recipe.difficultyRating = req.body.difficultyRating
            recipe.originalRecipeLink = req.body.originalRecipeLink
            recipe.nutritionScore = parseInt(req.body.nutritionScore)
            recipe.costScore = parseInt(req.body.costScore)
            recipe.tastinessScore = parseInt(req.body.tastinessScore)
            recipe.tags = Array.isArray(req.body.tags) ? req.body.tags : []
            recipe.imgUrl = req.body.imgUrl
            recipe.isFavorited = req.body.isFavorited
            recipe.isRequested = req.body.isRequested
            recipe.cookingHistoryArray = req.body.cookingHistoryArray
            recipe.createdBy = req.body.createdBy
            recipe.versionOwner = req.body.versionOwner
            recipe.recipeYield = req.body.recipeYield
            recipe.recipeVisibility = req.body.recipeVisibility
            recipe.comments = Array.isArray(req.body.comments) ? req.body.comments : []
            recipe.reviews = Array.isArray(req.body.reviews) ? req.body.reviews : []
            recipe.bastebookApproved = req.body.bastebookApproved
            recipe.hasVideo = req.body.hasVideo
            recipe.nutritionFacts = req.body.nutritionFacts
            recipe.equipment = Array.isArray(req.body.equipment) ? req.body.equipment : []
            recipe.photoCreds = req.body.photoCreds

            recipe.timeScore = 
                req.body.totalCooktime <= 30 ? 10 : 
                req.body.totalCooktime <= 45 ? 9 :
                req.body.totalCooktime <= 60 ? 8 :
                req.body.totalCooktime <= 75 ? 7 :
                req.body.totalCooktime <= 90 ? 6 :
                req.body.totalCooktime <= 105 ? 5 :
                req.body.totalCooktime <= 120 ? 4 :
                req.body.totalCooktime <= 135 ? 3 :
                req.body.totalCooktime <= 150 ? 2 :
                req.body.totalCooktime <= 175 ? 1 : 0

            recipe.save()
                .then(() => res.json('Recipe updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/toggleFavorite/:id').post((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            recipe.recipeName = req.body.recipeName
            recipe.isFavorited = !req.body.isFavorited

            recipe.save()
                .then(() => res.json('toggled!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/toggleRequest/:id').post((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            recipe.recipeName = req.body.recipeName
            recipe.isRequested = !req.body.isRequested

            recipe.save()
                .then(() => res.json('toggled!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/addCookedDate/:id').post((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            recipe.recipeName = req.body.recipeName
            recipe.cookingHistoryArray = req.body.cookingHistoryArray

            recipe.save()
                .then(() => res.json('added!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

export default router




