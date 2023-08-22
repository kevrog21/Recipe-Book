import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import recipeRouter from './routes/recipes.js'

import { fileURLToPath } from 'url'

const app = express()

// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')

import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const buildPath = path.resolve(__dirname, '../build')

app.use(express.static(buildPath))

dotenv.config()


// const port = process.env.PORT || 5000

app.use(cors({
    origin: 'http://54.219.239.120',
    credentials: false,
}))
app.use(express.json())

 const uri = process.env.ATLAS_URI
 console.log(uri)
 mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

 const connection = mongoose.connection
 connection.once('open', () => {
     console.log('MongoDB database connection established succesfully')
 })

app.use('/recipes', recipeRouter)
app.use('*', (req, res) => res.status(404).json({error: "not found"}))

app.get("/*", function(req, res) {
    res.sendFile(
        path.join(buildPath, "index.html"),
        function (err) {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            }
        }
    )
})

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`)
// })

export default app