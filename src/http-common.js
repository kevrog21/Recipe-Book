import axios from 'axios'

export default axios.create({
    baseURL: "https://bastebook.com/recipes",
    headers: {
        "Content-type": "application/json"
    }
})