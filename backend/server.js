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
     console.log('MongoDB database connection established succesfully! 12345')
 })

app.use('/recipe-data', recipeRouter)

// app.get("/*", function(req, res) {
//     res.sendFile(
//         path.join(buildPath, "index.html"),
//         function (err) {
//             if (err) {
//                 console.log(err)
//                 res.status(500).send(err)
//             }
//         }
//     )
// })

const validRoutes = [
    '/',
    '/recipes',
    '/settings',
    '/blog',
    /^\/[a-zA-Z0-9-_]+$/,
]

function isValidRoute(url) {
    return validRoutes.some(route => {
        if (route instanceof RegExp) {
            return route.test(url)
        }
        return route === url
    })
}

app.get("*", (req, res) => {
    if (req.accepts('html') && isValidRoute(req.path)) {
        res.sendFile(
            path.join(buildPath, "index.html")
        )
    } else {
        res.status(404).json({ error: 'Not Found' })
    }
})

// app.use('*', (req, res) => res.status(404).json({error: "not found"}))

export default app