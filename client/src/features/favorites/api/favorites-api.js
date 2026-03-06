import AxiosInstance from "../../../shared/lib/axios-instance";

class FavoritesApi {

    static async getAll() {
        const { data } = await AxiosInstance.get('/favorites')
        return data
    }

    static async add(adId) {
        const { data } = await AxiosInstance.post('/favorites', { adId })
        return data
    }

    static async remove(id) {
        const { data } = await AxiosInstance.delete(`/favorites/${id}`)
        return data
    }

}

export default FavoritesApi