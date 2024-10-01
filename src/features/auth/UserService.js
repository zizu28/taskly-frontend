import axios from 'axios'

const API_URL = "https://taskly-6zh5gocp.b4a.run/api/users/"

const register = async (userData) => {
    const res = await axios.post(API_URL + 'register', userData)
    if(res.data){
        localStorage.setItem('User', JSON.stringify(res.data))
    }
    return res.data
}

const updateUser = async (userData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }
    try {
        const currentUser = JSON.parse(localStorage.getItem('User'))
        if(!currentUser){
            throw new Error("User data not found in local storage.")
        }
        const res = await axios.patch(API_URL + `update/${currentUser._id}`, userData, config);
        if (res.data) {
            localStorage.setItem('User', JSON.stringify(res.data));
        }
        return res.data;
    } catch (error) {
        throw new Error(error.message);
    } 
  }

const deleteUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const currentUser = JSON.parse(localStorage.getItem('User'))
        if(!currentUser){
            throw new Error("User data not found in local storage.")
        }
        const res = await axios.delete(API_URL + `delete/${currentUser._id}`, config)
        if(res.data){
            localStorage.removeItem('User')
        }
        return res.data    
    } catch (error) {
        throw new Error(error.message);
    }
}

const login = async (userData) => {
    const res = await axios.post(API_URL + 'login', userData)
    
    if(res.data){
        localStorage.setItem('User', JSON.stringify(res.data))
    }
    return res.data
}

const logout = () => localStorage.removeItem('User')

export const authService = {register, login, logout, updateUser, deleteUser}