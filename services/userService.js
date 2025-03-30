
import axios from 'axios'

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/users`

export const updateUserProfile = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, userData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateUserPassword = async (passwordData) => {
  try {
    const response = await axios.put(`${API_URL}/password`, passwordData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateUserPreferences = async (preferences) => {
  try {
    const response = await axios.put(`${API_URL}/preferences`, preferences)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserLoyaltyPoints = async () => {
  try {
    const response = await axios.get(`${API_URL}/loyalty-points`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getAllUsers = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: { page, limit }
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateUserRole = async (id, role) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/role`, { role })
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
