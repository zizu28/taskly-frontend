import axios from 'axios'

const IMAGE_API_URL = 'http://localhost:5000/image/upload'

export const uploadImage = async (files, token) => {
    if (!files || !files[0]) {
        throw new Error('Image file not provided')
    }

    if (!token) {
        throw new Error('Token not provided')
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }
    
    try {
        const formData = new FormData();
        formData.append('image', files[0]);
        formData.append('upload_preset', 'qmmfblrn')
        const res = await axios.post(IMAGE_API_URL, formData)
        const data = res.data
        return data.secure_url
    } catch (error) {
        throw new Error(error.message)
    }
    
}
