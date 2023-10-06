import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import recipeRouter from './routes/recipes.js'

import { fileURLToPath } from 'url'

const app = express()

import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const buildPath = path.resolve(__dirname, '../build')

app.use(express.static(buildPath))

dotenv.config()

app.use(cors({
    origin: 'https://bastebook.com',
    credentials: true,
}))
app.use(express.json())

 const uri = process.env.ATLAS_URI
 mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
 console.log('testing 123')

 const connection = mongoose.connection
 connection.once('open', () => {
     console.log('MongoDB database connection established succesfully!')
 })

app.use('/recipes', recipeRouter)

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

app.use('*', (req, res) => res.status(404).json({error: "not found"}))

export default app