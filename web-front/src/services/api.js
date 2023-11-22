import axios from 'axios'

const api = axios.create({
    
    baseURL: process.env.REACT_APP_URL_BASE, //BASE URL DO BACKEND
    headers: {
        'Content-Type': 'application/json',
    }   
})

export default api