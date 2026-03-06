import AxiosInstance from "../../../shared/lib/axios-instance";

class OrdersApi {

    static async getOrders(asSeller = false) {
        const { data } = await AxiosInstance.get(`/orders?asSeller=${asSeller}`)
        return data
    }

    static async createOrder(adId) {
        const { data } = await AxiosInstance.post('/orders', {adId})
        return data
    }


    static async cancelOrder(adId) {
        const { data } = await AxiosInstance.patch(`/orders/${adId}/cancel`)
        return data
    }

    static async rejectOrder(adId, rejectComment ) {
        const { data } = await AxiosInstance.patch(`/orders/${adId}/reject`, {rejectComment})
        return data
    }

}

export default OrdersApi