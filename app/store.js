import { configureStore } from '@reduxjs/toolkit' 
import UserReducer from '../src/features/auth/UserSlice.js'
import TaskReducer from '../src/features/tasks/TaskSlice.js'

export const store = configureStore({
    reducer: {
        user: UserReducer,
        task: TaskReducer,
    }
})

