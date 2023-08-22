import axios from 'axios'

export default axios.create({
    baseURL: "http://54.219.239.120:5000/recipes",
    headers: {
        "Content-type": "application/json"
    }
})