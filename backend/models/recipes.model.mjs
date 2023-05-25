import mongoose from "mongoose"

const Schema = mongoose.Schema

const recipeSchema = new Schema({
    recipeName: { type: String, required: true, unique: true },
    instructions: {type: String, required: false},
    cooktime: {type: Number, required: false} 
}, {
    timestamps: true,
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe