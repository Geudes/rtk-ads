
const AuthStorage = {
    setAccessToken:(token) => localStorage.setItem('accessToken', token),
    getAccessToken:()=> localStorage.getItem('accessToken'),
    setRefreshToken:(token) => localStorage.setItem('refreshToken', token),
    getRefreshToken:()=> localStorage.getItem('refreshToken'),
    setUserStorage:(user) => localStorage.setItem('user', JSON.stringify(user)),
    getUserStorage:()=> {
        const user = localStorage.getItem('user')
        if(user){
            return JSON.parse(user)
        }
    },
    clear:() =>{
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }
}
export default AuthStorage