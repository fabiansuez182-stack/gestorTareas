const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`

export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  const response = await fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    throw new Error('Error al subir el archivo a Cloudinary')
  }

  const data = await response.json()
  return data.secure_url
}
