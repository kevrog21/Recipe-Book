import axios from 'axios'

export default axios.create({
    baseURL: "https://bastebook.com:5000/recipes",
    headers: {
        "Content-type": "application/json"
    }
})