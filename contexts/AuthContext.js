
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { login as loginApi, register as registerApi, logout as logoutApi, getCurrentUser } from '@/services/authService'
import { getCookie, setCookie, deleteCookie } from 'cookies-next'

const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const checkAuth = async () => {
      const token = getCookie('token')
      if (token) {
        try {
          const userData = await getCurrentUser()
          setUser(userData)
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Error fetching user data:', error)
          deleteCookie('token')
        }
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])
  
  const login = async (email, password) => {
    const { token, user } = await loginApi(email, password)
    setCookie('token', token, { maxAge: 60 * 60 * 24 * 7 }) // 1 week
    setUser(user)
    setIsAuthenticated(true)
    return user
  }
  
  const register = async (userData) => {
    const { token, user } = await registerApi(userData)
    setCookie('token', token, { maxAge: 60 * 60 * 24 * 7 }) // 1 week
    setUser(user)
    setIsAuthenticated(true)
    return user
  }
  
  const logout = async () => {
    await logoutApi()
    deleteCookie('token')
    setUser(null)
    setIsAuthenticated(false)
  }
  
  const refreshUserData = async () => {
    try {
      const userData = await getCurrentUser()
      setUser(userData)
      return userData
    } catch (error) {
      console.error('Error refreshing user data:', error)
      throw error
    }
  }
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading, 
      login, 
      register, 
      logout, 
      refreshUserData 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
