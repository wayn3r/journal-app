const url = 'https://api.cloudinary.com/v1_1/wayn3r/image/upload'
const preset = 'curso-react'
export const uploadImage = async image => {
    const form = new FormData()
    form.append('upload_preset', preset)
    form.append('file', image)

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: form,
        })
        if (response.ok) {
            const { secure_url } = await response.json()
            return secure_url
        }
        return null
    } catch (error) {
        throw error
    }
}
