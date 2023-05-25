import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import recipeRouter from './routes/recipes.mjs'

// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established succesfully')
})

app.use('/recipes', recipeRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
