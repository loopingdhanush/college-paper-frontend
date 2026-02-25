import api from './api';

export const checkAdmin = async() =>{
    try {
        await api.get("/papers/admin-test");
        return true
    } catch (error) {
        return false
    }
}