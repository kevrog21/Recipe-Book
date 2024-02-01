import axios from 'axios'

export default axios.create({
    baseURL: "https://bastebook.com/recipe-data",
    headers: {
        "Content-type": "application/json"
    }
})