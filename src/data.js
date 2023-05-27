import axios from 'axios'

// export default data = axios.get()

//get rid of this file after connecting to database. (will import data in Homescreen component)

export default [{
        id: '01',
        uniqueIdentifier: 1,
        recipeHeader: 'Tucci Meal',
        recipeSubheader: '',
        recipeImage: 'tucci-meal-img.jpg',
        cookTimeMins: 90,
        isFavorited: false,
        isRequested: false,
        ingredients: [{
            measurement: '2 tablespoons',
            ingredientName: 'butter',
            ingredientNote: '',
            isOptional: false
        }],
        instructions: 'paste instructions here',
        notes: [
            'Note 1 is here',
            'Note 2 then goes here'
        ],
        stats: [{
            overallScore: 8,
            nutrition: 9,
            cookTime: 7,
            cleanup: 5,
            cost: 10,
            totalTimesCooked: 0,
            lastCooked: '5/21/23'
        }],
        tags: ['vegetarian', 'cozy meal', 'Dairy Free', "Healthy"],
        author: 'Kevin'
    },

    {
        id: '02',
        uniqueIdentifier: 2,
        recipeHeader: 'Steak Kabobs',
        recipeSubheader: '',
        recipeImage: 'steak-kabobs-img.jpg',
        cookTimeMins: 60,
        isFavorited: false,
        isRequested: true,
        ingredients: [{
            measurement: '2 tablespoons', 
            ingredientName: 'butter',
            ingredientNote: '',
            isOptional: false
        }],
        instructions: 'paste instructions here',
        notes: [
            'Note 1 is here',
            'Note 2 then goes here'
        ],
        stats: [{
            overallScore: 8,
            nutrition: 9,
            cookTime: 7,
            cleanup: 5,
            cost: 10,
            totalTimesCooked: 0,
            lastCooked: '5/21/23'
        }],
        tags: ['Summer Meal', 'cozy meal', 'Dairy Free', "Healthy"],
        author: 'Kevin'
    },

    {
        id: '03',
        uniqueIdentifier: 3,
        recipeHeader: 'Shrimp Orzo',
        recipeSubHeader: '',
        recipeImage: 'shrimp-orzo.jpg',
        cookTimeMins: 60,
        isFavorited: true,
        isRequested: true,
        ingredients: [{
            measurement: '2 tablespoons', 
            ingredientName: 'butter',
            ingredientNote: '',
            isOptional: false
        }],
        instructions: 'paste instructions here',
        notes: [
            'Note 1 is here',
            'Note 2 then goes here'
        ],
        stats: [{
            overallScore: 8,
            nutrition: 9,
            cookTime: 7,
            cleanup: 5,
            cost: 10,
            totalTimesCooked: 0,
            lastCooked: '5/21/23'
        }],
        tags: ['vegetarian', 'cozy meal', 'Dairy Free', "Healthy"],
        author: 'Kevin'
    },
    {
        id: '04',
        uniqueIdentifier: 4,
        recipeHeader: 'Chicken',
        recipeSubheader: 'w/ rice and veggies',
        recipeImage: 'BBQ-chicken_breast-with-veggies.jpg',
        cookTimeMins: 60,
        isFavorited: true,
        isRequested: true,
        ingredients: [{
            measurement: '2 tablespoons', 
            ingredientName: 'butter',
            ingredientNote: '',
            isOptional: false
        }],
        instructions: 'paste instructions here',
        notes: [
            'Note 1 is here',
            'Note 2 then goes here'
        ],
        stats: [{
            overallScore: 8,
            nutrition: 9,
            cookTime: 7,
            cleanup: 5,
            cost: 10,
            totalTimesCooked: 0,
            lastCooked: '5/21/23'
        }],
        tags: ['vegetarian', 'cozy meal', 'Dairy Free', "Healthy"],
        author: 'Lizzie'
    },
    {
        id: '05',
        uniqueIdentifier: 5,
        recipeHeader: 'Grilled Cheese',
        recipeSubheader: 'w/ Tomato Soup',
        recipeImage: 'grilled-cheese-tomato-soup.jpg',
        cookTimeMins: 90,
        isFavorited: true,
        isRequested: true,
        ingredients: [{
            measurement: '2 tablespoons',
            ingredientName: 'butter',
            ingredientNote: '',
            isOptional: false
        }],
        instructions: 'paste instructions here',
        notes: [
            'Note 1 is here',
            'Note 2 then goes here'
        ],
        stats: [{
            overallScore: 8,
            nutrition: 9,
            cookTime: 7,
            cleanup: 5,
            cost: 10,
            totalTimesCooked: 0,
            lastCooked: '5/21/23'
        }],
        tags: ['vegetarian', 'cozy meal', 'Dairy Free', "Healthy"],
        author: 'Lizzie'
    },
    {
        id: '06',
        uniqueIdentifier: 6,
        recipeHeader: 'Grilled Cheese',
        recipeSubheader: 'w/ Tomato Soup',
        recipeImage: 'grilled-cheese-tomato-soup2.jpg',
        cookTimeMins: 90,
        isFavorited: true,
        isRequested: false,
        ingredients: [{
            measurement: '2 tablespoons',
            ingredientName: 'butter',
            ingredientNote: '',
            isOptional: false
        }],
        instructions: 'paste instructions here',
        notes: [
            'Note 1 is here',
            'Note 2 then goes here'
        ],
        stats: [{
            overallScore: 8,
            nutrition: 9,
            cookTime: 7,
            cleanup: 5,
            cost: 10,
            totalTimesCooked: 0,
            lastCooked: '5/21/23'
        }],
        tags: ['vegetarian', 'cozy meal', 'Dairy Free', "Healthy"]
    }
]