import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./UserService.js";

const localUser = localStorage.getItem('User')

const initialState = {
    user: localUser ? localUser : '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createUser = createAsyncThunk('auth/register', async (user, ThunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        ThunkAPI.rejectWithValue(message)
    }
})

export const updateUser = createAsyncThunk('auth/update', async (user, ThunkAPI) => {
    try {
        const data = JSON.parse(localStorage.getItem('User'))
        if(!data){
            throw new Error("User data not found in local storage.")
        }
        const token = data.token
        return await authService.updateUser(user, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
        ThunkAPI.rejectWithValue(message)
    }
})

export const deleteUser = createAsyncThunk('auth/delete', async (unused, ThunkAPI) => {
    try {
        const data = JSON.parse(localStorage.getItem('User'))
        if(!data){
            throw new Error("User data not found in local storage.")
        }
        const token = data.token
        return await authService.deleteUser(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
        ThunkAPI.rejectWithValue(message)   
    }
})

export const login = createAsyncThunk('auth/login', async (user, ThunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        ThunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => authService.logout())

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {return initialState}
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(createUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
        .addCase(updateUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false 
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(deleteUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
    }
})

export const actions = UserSlice.actions
export default UserSlice.reducer

export const SelectUser = (state) => state.user.user