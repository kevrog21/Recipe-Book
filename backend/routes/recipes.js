import { Router } from "express"
import Recipe from '../models/recipes.model.js'
import cloudinary from 'cloudinary'
import cors from 'cors'
import express from "express"
import dotenv from 'dotenv'
// import bodyParser from "body-parser"

dotenv.config()

const router = Router()

router.use(express.static("public"))
router.use(express.json())
// router.use(bodyParser.raw({ type: 'multipart/form-data' }))


// const express = require("express")
// const app = express()
// app.use(express.static("public"))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))


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

// const signatureResponse = await axios.get("http://localhost:5000/get-signature")

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



router.post("/do-something-with-photo", async (req, res) => {
    // based on the public_id and the version that the (potentially malicious) user is submitting...
    // we can combine those values along with our SECRET key to see what we would expect the signature to be if it was innocent / valid / actually coming from Cloudinary
    const expectedSignature = cloudinary.utils.api_sign_request({ public_id: req.body.public_id, version: req.body.version }, cloudinaryConfig.api_secret)
  
    // We can trust the visitor's data if their signature is what we'd expect it to be...
    // Because without the SECRET key there's no way for someone to know what the signature should be...
    if (expectedSignature === req.body.signature) {
      // Do whatever you need to do with the public_id for the photo
      // Store it in a database or pass it to another service etc...
      await fse.ensureFile("./data.txt")
      const existingData = await fse.readFile("./data.txt", "utf8")
      await fse.outputFile("./data.txt", existingData + req.body.public_id + "\n")
    }
  })

// const signatureResponse = await axios.get("http://localhost:5000/get-signature")

// app.get("/get-signature", (req, res) => {
//     const timestamp = Math.round(new Date().getTime() / 1000)
//     const signature = cloudinary.utils.api_sign_request(
//       {
//         timestamp: timestamp
//       },
//       cloudinaryConfig.api_secret
//     )
//     res.json({ timestamp, signature })
//   })


router.route('/test-endpoint').get((req, res) => {
    res.json({message: 'This is a test endpoint'})
})

router.route('/upload-image').post((req, res) => {
    console.log(req.body)

    // const body = {
    //     file: req.body.file,
    //     timestamp: req.body.timestamp,
    //     api_key: req.body.api_key,
    //     signature: req.body.signature
    // }
    const formData = parseFormData(req.body.toString())

    console.log("formData", formData)

    const options = {
        headers: { "Content-Type": "multipart/form-data" },
        api_key: formData.api_key
    }

    console.log(options)

    cloudinary.uploader.upload(req.body, options)
        .then(data => console.log(data))
        .catch(error => console.error(error))
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




