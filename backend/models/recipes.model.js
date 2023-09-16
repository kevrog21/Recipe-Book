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
    difficultyRating: { type: String, required: false},
    originalRecipeLink: { type: String, required: false },
    nutritionScore: { type: Number, required: false},
    costScore: { type: Number, required: false},
    tastinessScore: { type: Number, required: false},
    timeScore: { type: Number, required: false},
    tags: { type: Array, required: false },
    imageId: { type: String, required: false },
    imgUrl: { type: String, required: false },
    isFavorited: { type: Boolean, default: false },
    isRequested: { type: Boolean, default: false },
    cookingHistoryArray: { type: Array, required: false }
}, {
    timestamps: true,
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe