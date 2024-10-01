import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const API_URL = "http://localhost:5000/api/tasks/"

const createTask = async (taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const response = await axios.post(API_URL + "create", taskData, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
    
}

const getTasks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const response = await axios.get(API_URL, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getTaskById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await axios.get(API_URL + id, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateTask = async (id, taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    try {
        const response = await axios.patch(API_URL + `update/${id}`, taskData, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteTask = (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = axios.delete(API_URL + `delete/${id}`, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const taskService = {createTask, getTasks, getTaskById, updateTask, deleteTask}

export default taskService;
