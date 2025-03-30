
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { Edit, Save, User, Phone, Mail, Lock, Check, X } from 'lucide-react'
import { updateUserProfile, updateUserPassword } from '@/services/userService'

export default function Profile() {
  const { user, refreshUserData } = useAuth()
  const { t } = useTranslation()
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' })
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' })
  
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      })
    }
  }, [user])
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setProfileMessage({ type: '', text: '' })
    
    try {
      await updateUserProfile(profileData)
      await refreshUserData()
      setProfileMessage({ 
        type: 'success', 
        text: t('profile.updateSuccess') 
      })
      setIsEditingProfile(false)
    } catch (error) {
      setProfileMessage({ 
        type: 'error', 
        text: error.response?.data?.message || t('profile.updateError') 
      })
    }
  }
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordMessage({ type: '', text: '' })
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ 
        type: 'error', 
        text: t('profile.passwordMismatch') 
      })
      return
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordMessage({ 
        type: 'error', 
        text: t('profile.passwordTooShort') 
      })
      return
    }
    
    try {
      await updateUserPassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
      setPasswordMessage({ 
        type: 'success', 
        text: t('profile.passwordUpdateSuccess') 
      })
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setIsEditingPassword(false)
    } catch (error) {
      setPasswordMessage({ 
        type: 'error', 
        text: error.response?.data?.message || t('profile.passwordUpdateError') 
      })
    }
  }
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold">{t('profile.title')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card-gold">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{t('profile.personalInfo')}</h2>
              {!isEditingProfile ? (
                <button 
                  className="btn-secondary flex items-center gap-2"
                  onClick={() => setIsEditingProfile(true)}
                >
                  <Edit className="w-4 h-4" />
                  {t('profile.edit')}
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    className="btn-secondary flex items-center gap-2"
                    onClick={() => {
                      setIsEditingProfile(false)
                      setProfileData({
                        firstName: user.firstName || '',
                        lastName: user.lastName || '',
                        email: user.email || '',
                        phone: user.phone || ''
                      })
                    }}
                  >
                    <X className="w-4 h-4" />
                    {t('profile.cancel')}
                  </button>
                  <button 
                    className="btn-primary flex items-center gap-2"
                    onClick={handleProfileSubmit}
                  >
                    <Save className="w-4 h-4" />
                    {t('profile.save')}
                  </button>
                </div>
              )}
            </div>
            
            {profileMessage.text && (
              <div className={`mb-6 p-3 rounded-md ${
                profileMessage.type === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
              }`}>
                <div className="flex items-center gap-2">
                  {profileMessage.type === 'success' ? (
                    <Check className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span>{profileMessage.text}</span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="flex items-center gap-2 text-sm font-medium">
                    <User className="w-4 h-4 text-gold-500" />
                    {t('profile.firstName')}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    className="input-primary w-full"
                    disabled={!isEditingProfile}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="flex items-center gap-2 text-sm font-medium">
                    <User className="w-4 h-4 text-gold-500" />
                    {t('profile.lastName')}
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    className="input-primary w-full"
                    disabled={!isEditingProfile}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="w-4 h-4 text-gold-500" />
                  {t('profile.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="input-primary w-full"
                  disabled={!isEditingProfile}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="w-4 h-4 text-gold-500" />
                  {t('profile.phone')}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="input-primary w-full"
                  disabled={!isEditingProfile}
                  required
                />
              </div>
            </form>
          </div>
          
          <div className="card-gold mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{t('profile.security')}</h2>
              {!isEditingPassword ? (
                <button 
                  className="btn-secondary flex items-center gap-2"
                  onClick={() => setIsEditingPassword(true)}
                >
                  <Edit className="w-4 h-4" />
                  {t('profile.changePassword')}
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    className="btn-secondary flex items-center gap-2"
                    onClick={() => {
                      setIsEditingPassword(false)
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      })
                    }}
                  >
                    <X className="w-4 h-4" />
                    {t('profile.cancel')}
                  </button>
                  <button 
                    className="btn-primary flex items-center gap-2"
                    onClick={handlePasswordSubmit}
                  >
                    <Save className="w-4 h-4" />
                    {t('profile.save')}
                  </button>
                </div>
              )}
            </div>
            
            {passwordMessage.text && (
              <div className={`mb-6 p-3 rounded-md ${
                passwordMessage.type === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
              }`}>
                <div className="flex items-center gap-2">
                  {passwordMessage.type === 'success' ? (
                    <Check className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span>{passwordMessage.text}</span>
                </div>
              </div>
            )}
            
            {isEditingPassword && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="currentPassword" className="flex items-center gap-2 text-sm font-medium">
                    <Lock className="w-4 h-4 text-gold-500" />
                    {t('profile.currentPassword')}
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="input-primary w-full"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="flex items-center gap-2 text-sm font-medium">
                    <Lock className="w-4 h-4 text-gold-500" />
                    {t('profile.newPassword')}
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="input-primary w-full"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-medium">
                    <Lock className="w-4 h-4 text-gold-500" />
                    {t('profile.confirmPassword')}
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="input-primary w-full"
                    required
                  />
                </div>
              </form>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="card-gold">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-primary-200 dark:bg-primary-700 mx-auto flex items-center justify-center">
                <User className="w-12 h-12 text-primary-500 dark:text-primary-400" />
              </div>
              
              <h2 className="text-xl font-semibold mt-4">
                {user?.firstName} {user?.lastName}
              </h2>
              
              <p className="text-primary-500 dark:text-primary-400 mt-1">
                {user?.email}
              </p>
              
              <div className="mt-6 pt-6 border-t border-primary-200 dark:border-primary-700">
                <div className="flex justify-between mb-2">
                  <span className="text-primary-500 dark:text-primary-400">
                    {t('profile.memberSince')}
                  </span>
                  <span className="font-medium">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                  </span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-primary-500 dark:text-primary-400">
                    {t('profile.appointmentsBooked')}
                  </span>
                  <span className="font-medium">
                    {user?.appointmentsCount || 0}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-primary-500 dark:text-primary-400">
                    {t('profile.loyaltyPoints')}
                  </span>
                  <span className="font-medium text-gold-600">
                    {user?.loyaltyPoints || 0} {t('profile.points')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card-gold mt-6">
            <h3 className="text-lg font-semibold mb-4">{t('profile.preferences')}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-primary-600 dark:text-primary-400">
                    {t('profile.emailNotifications')}
                  </span>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border rounded-full appearance-none cursor-pointer peer border-primary-300 dark:border-primary-600 checked:right-0 checked:border-gold-500 dark:checked:border-gold-500 checked:bg-gold-500"
                    defaultChecked={true}
                  />
                  <label
                    htmlFor="emailNotifications"
                    className="block h-full overflow-hidden rounded-full cursor-pointer bg-primary-200 dark:bg-primary-700 peer-checked:bg-gold-200 dark:peer-checked:bg-gold-900/30"
                  ></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-primary-600 dark:text-primary-400">
                    {t('profile.smsNotifications')}
                  </span>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                  <input
                    type="checkbox"
                    id="smsNotifications"
                    className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border rounded-full appearance-none cursor-pointer peer border-primary-300 dark:border-primary-600 checked:right-0 checked:border-gold-500 dark:checked:border-gold-500 checked:bg-gold-500"
                    defaultChecked={true}
                  />
                  <label
                    htmlFor="smsNotifications"
                    className="block h-full overflow-hidden rounded-full cursor-pointer bg-primary-200 dark:bg-primary-700 peer-checked:bg-gold-200 dark:peer-checked:bg-gold-900/30"
                  ></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-primary-600 dark:text-primary-400">
                    {t('profile.remindersBefore')}
                  </span>
                </div>
                <select className="input-primary">
                  <option value="1">{t('profile.oneHour')}</option>
                  <option value="3">{t('profile.threeHours')}</option>
                  <option value="24">{t('profile.oneDay')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
