import { Router } from "express"
import Recipe from '../models/recipes.model.js'

const router = Router()

router.route('/').get((req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const recipeName = req.body.recipeName
    const instructions = req.body.instructions
    const cooktime = Number(req.body.cooktime)

    const newRecipe = new Recipe({
        recipeName,
        instructions,
        cooktime
    })

    newRecipe.save()
        .then(() => res.json('Recipe Added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(recipe => res.json('Recipe Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            recipe.recipeName = req.body.recipeName
            recipe.instructions = req.body.instructions
            recipe.cooktime = Number(req.body.cooktime)

            recipe.save()
                .then(() => res.json('Recipe updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

export default router




