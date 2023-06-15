import mongoose from "mongoose"

const recipeSchema = new mongoose.Schema({
    recipeName: { type: String, required: true, unique: true },
    instructions: { type: String, required: false},
    cooktime: { type: Number, required: false},
    imageId: { type: String, required: false },
    imgTimestamp: { type: String, required: false }
}, {
    timestamps: true,
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe