import http from '../http-common'

class RecipeDataService {
    getAll (page = 0) {
        console.log('getting all recipes!')
        return http.get(`?page=${page}`)
    }

    get(id) {
        return http.get(`/id/${id}`)
    }
}

export default new RecipeDataService()