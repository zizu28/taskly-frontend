import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import taskService from "./TaskService";

const initialState = {
    tasks: [],
    tasksPerPage: 3,
    currentPage: 1,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const createTask = createAsyncThunk("tasks/createTask", async (taskData, thunkAPI) => {
    try {
        const user = JSON.parse(localStorage.getItem('User'))
        if(!user){
            throw new Error("User data not found in local storage.")    
        }

        const token = user.token
        const response = await taskService.createTask(taskData, token)
        return response
    }
    catch (error){
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const getTasks = createAsyncThunk("tasks/getAllTasks", async (_, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem('User'))
      if(!user){
        throw new Error("User data not found in local storage.")    
      }
  
      const token = user.token
      const response = await taskService.getTasks(token)
      return response.tasks
    }
    catch (error){
      const message = (error.response && error.response.data && error.response.data.message) ||
      error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  })

export const getTaskById = createAsyncThunk("tasks/getTaskById", async (id, thunkAPI) => {
    try{
        const user = JSON.parse(localStorage.getItem('User'))
        if(!user){
            throw new Error("User data not found in local storage.")    
        }

        const token = user.token
        const response = await taskService.getTaskById(id, token)
        return response
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const updateTask = createAsyncThunk("tasks/updateTask", async ({id, taskData}, thunkAPI) => {
    try{
        const user = JSON.parse(localStorage.getItem('User'))
        if(!user){
            throw new Error("User data not found in local storage.")    
        }

        const token = user.token
        const response = await taskService.updateTask(id, taskData, token)
        return response
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id, thunkAPI) => {
    try{
        const user = JSON.parse(localStorage.getItem('User'))
        if(!user){
            throw new Error("User data not found in local storage.")    
        }

        const token = user.token
        return await taskService.deleteTask(id, token)
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
        }
    })
    
    export const taskSlice = createSlice({
        name: 'task',
        initialState,
        reducers: {
            onNavigateNext: (state) => {
                state.currentPage += 1
            },
            onNavigatePrevious: (state) => {
                state.currentPage -= 1
            },
            onChangeTasksPerPage: (state, action) => {
                state.tasksPerPage = action.payload
            },
            onClickCurrentPage: (state, action) => {
                state.currentPage = action.payload
            }
        },
        extraReducers: (builder) => {
            builder
            .addCase(createTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks.push(action.payload)
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteTask.pending, (state) => { state.isLoading = true })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = state.tasks.filter(task => task._id !== action.payload.id)
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateTask.pending, (state) => { state.isLoading = true })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = state.tasks.map(task => task._id === action.payload._id ? action.payload : task)
              })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTasks.pending, (state) => { state.isLoading = true })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = action.payload
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTaskById.pending, (state) => { state.isLoading = true })
            .addCase(getTaskById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = action.payload
            })
            .addCase(getTaskById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
        }
    })
    
    export const { onChangeTasksPerPage, onNavigateNext, onNavigatePrevious, onClickCurrentPage } = taskSlice.actions;
    export default taskSlice.reducer;
    
    export const SelectAllTasks = state => state.task.tasks
    export const SelectTaskById = (state, id) => state.task.tasks.find(task => task._id === id)