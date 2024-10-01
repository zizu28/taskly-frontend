import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadImage } from "./CloudinaryImageService.js";

const initialState = {
    images: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const ImageUpload = createAsyncThunk('image/uploadImage', async (files, ThunkAPI) => {
    
    const user = JSON.parse(localStorage.getItem('User'))
    if(!user){
        throw new Error("User data not found in local storage.")
    }

    const token = user.token
    try {
      const imageUrl = await uploadImage(files, token)
      return imageUrl
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
      ThunkAPI.rejectWithValue(message)
    }
  })

const ImageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        reset: state => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(ImageUpload.pending, state => {
                state.isLoading = true
            })
            .addCase(ImageUpload.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.images.push(action.payload)
            })
            .addCase(ImageUpload.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })  
    }
})

export const { reset } = ImageSlice.actions
export default ImageSlice.reducer

export const SelectImages = state => state.image