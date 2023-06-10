import { Router } from "express"
import Recipe from '../models/recipes.model.js'
import cloudinary from 'cloudinary'
import cors from 'cors'

const router = Router()

router.use(cors())

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDINARYSECRET,
    secure: true
  })

const secretPassword = process.env.SECRET_PWORD

// router.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', '*')
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE')
//         return res.status(200).json({})
//     }
//     next()
// })

router.route('/').get((req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/get-signature').get((req, res) => {
    console.log('server code started')
        const timestamp = Math.round(new Date().getTime() / 1000)
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp: timestamp
            },
            cloudinaryConfig.api_secret
        )
        res.json({ timestamp, signature })
        console.log('server code finished')
})

router.route('/test-endpoint').get((req, res) => {
    res.json({message: 'This is a test endpoint'})
})

router.route('/upload-image').get((req, res) => {
    cloudinary.v2.uploader.upload(file, options).then()
       
})

router.route('/add').post((req, res) => {
    const recipeName = req.body.recipeName
    const instructions = req.body.instructions
    const cooktime = Number(req.body.cooktime)
    const password = req.body.password
    const honeyp = req.body.honeyp

    if (password === secretPassword && honeyp === '') {
        const newRecipe = new Recipe({
            recipeName,
            instructions,
            cooktime
        })
    
        newRecipe.save()
            .then(() => res.json('Recipe Added!'))
            .catch(err => res.status(400).json('Error: ' + err))
    } else {
        res.status(401).json({ error: 'Incorrect password' })
    }
})

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

            recipe.save()
                .then(() => res.json('Recipe updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

export default router




