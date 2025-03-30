
import axios from 'axios'

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/services`

export const getServices = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getServiceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createService = async (serviceData) => {
  try {
    const response = await axios.post(API_URL, serviceData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateService = async (id, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updateData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteService = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
