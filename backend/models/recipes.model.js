import mongoose from "mongoose"

const recipeSchema = new mongoose.Schema({
    recipeName: { type: String, required: true, unique: true },
    recipeSubName: { type: String, required: false },
    ingredients: { type: Array, required: false },
    instructions: { type: String, required: false},
    notes: {type: String, required: false},
    cooktimeHours: { type: Number, required: false},
    cooktimeMins: { type: Number, required: false},
    totalCooktime: { type: Number, required: false},
    imageId: { type: String, required: false },
    imgUrl: { type: String, required: false }
}, {
    timestamps: true,
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe