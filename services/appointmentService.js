
import axios from 'axios'

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/appointments`

export const getAvailableTimeSlots = async (date, serviceId) => {
  try {
    const response = await axios.get(`${API_URL}/available`, {
      params: { date, serviceId }
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(API_URL, appointmentData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserAppointments = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getAppointmentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateAppointment = async (id, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updateData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const cancelAppointment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const rescheduleAppointment = async (id, newDate, newTimeSlot) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/reschedule`, {
      date: newDate,
      timeSlot: newTimeSlot
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getWaitlist = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/waitlist`, {
      params: { date }
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const joinWaitlist = async (date, serviceId) => {
  try {
    const response = await axios.post(`${API_URL}/waitlist`, {
      date,
      serviceId
    })
    return response.data
  } catch (error) {
    throw error
  }
}
