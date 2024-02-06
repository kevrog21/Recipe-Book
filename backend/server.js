import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import recipeRouter from './routes/recipes.js'
import favicon from 'serve-favicon'
import { fileURLToPath } from 'url'

const app = express()

import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const buildPath = path.resolve(__dirname, '../build')

app.use(express.static(buildPath))

dotenv.config()

// app.use('/favicon.svg', express.static(path.join(__dirname, '..', 'public', 'favicon.svg')))
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.svg')))
// console.log(favicon)
console.log(path.join(__dirname, '..', 'public', 'favicon.svg'))

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

app.use('/recipe-data', recipeRouter)

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