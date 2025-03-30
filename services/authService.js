
import axios from 'axios'

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    return response.data
  } catch (error) {
    throw error
  }
}

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`)
    return true
  } catch (error) {
    console.error('Logout error:', error)
    return false
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email })
    return response.data
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (token, password) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { token, password })
    return response.data
  } catch (error) {
    throw error
  }
}
