import axios from 'axios'

const api = axios.create({
    
    baseURL: 'http://34.125.24.146:8090/api/', //BASE URL DO BACKEND
    headers: {
        'Content-Type': 'application/json',
    }   
})

export default api