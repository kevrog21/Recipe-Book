import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import recipeRouter from './routes/recipes.js'

// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')

dotenv.config()

const app = express()
// const port = process.env.PORT || 5000

app.use(cors())
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

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`)
// })

export default app