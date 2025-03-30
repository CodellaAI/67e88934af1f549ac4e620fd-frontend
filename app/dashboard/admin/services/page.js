
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { Edit, Plus, Scissors, Trash } from 'lucide-react'
import { Dialog } from '@headlessui/react'
import { getServices, createService, updateService, deleteService } from '@/services/serviceService'

export default function Services() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { t } = useTranslation()
  
  const [services, setServices] = useState([])
  const [isServicesLoading, setIsServicesLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentService, setCurrentService] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    isActive: true
  })
  
  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/dashboard')
    }
  }, [user, isLoading, router])
  
  useEffect(() => {
    const fetchServices = async () => {
      setIsServicesLoading(true)
      try {
        const data = await getServices()
        setServices(data)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setIsServicesLoading(false)
      }
    }
    
    if (user && user.role === 'admin') {
      fetchServices()
    }
  }, [user])
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const openAddDialog = () => {
    setCurrentService(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      isActive: true
    })
    setIsDialogOpen(true)
  }
  
  const openEditDialog = (service) => {
    setCurrentService(service)
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
      isActive: service.isActive
    })
    setIsDialogOpen(true)
  }
  
  const openDeleteDialog = (service) => {
    setCurrentService(service)
    setIsDeleteDialogOpen(true)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const serviceData = {
      ...formData,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration)
    }
    
    try {
      if (currentService) {
        // Update existing service
        await updateService(currentService._id, serviceData)
        setServices(services.map(s => 
          s._id === currentService._id ? { ...s, ...serviceData } : s
        ))
      } else {
        // Create new service
        const newService = await createService(serviceData)
        setServices([...services, newService])
      }
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error saving service:', error)
    }
  }
  
  const handleDelete = async () => {
    if (!currentService) return
    
    try {
      await deleteService(currentService._id)
      setServices(services.filter(s => s._id !== currentService._id))
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  }
  
  if (isLoading || (!user || user.role !== 'admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {t('services.title')}
          </h1>
          <p className="text-primary-500 dark:text-primary-400 mt-1">
            {t('services.subtitle')}
          </p>
        </div>
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={openAddDialog}
        >
          <Plus className="w-5 h-5" />
          {t('services.addService')}
        </button>
      </div>
      
      {isServicesLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="card animate-pulse h-60">
              <div className="h-6 bg-primary-200 dark:bg-primary-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-primary-200 dark:bg-primary-700 rounded w-2/3 mb-3"></div>
              <div className="mt-auto flex justify-between">
                <div className="h-10 bg-primary-200 dark:bg-primary-700 rounded w-24"></div>
                <div className="h-10 bg-primary-200 dark:bg-primary-700 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div 
              key={service._id} 
              className={`card relative ${
                !service.isActive ? 'opacity-70' : ''
              }`}
            >
              {!service.isActive && (
                <div className="absolute top-2 right-2 bg-primary-200 dark:bg-primary-700 text-primary-600 dark:text-primary-300 text-xs py-1 px-2 rounded-full">
                  {t('services.inactive')}
                </div>
              )}
              
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <p className="text-primary-500 dark:text-primary-400 mt-1 text-sm">
                    {service.description}
                  </p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-gold-100 dark:bg-gold-900/20 rounded-full">
                  <Scissors className="w-6 h-6 text-gold-600" />
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-700">
                <div className="flex justify-between mb-2">
                  <span className="text-primary-500 dark:text-primary-400 text-sm">
                    {t('services.price')}
                  </span>
                  <span className="font-semibold">₪{service.price}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-primary-500 dark:text-primary-400 text-sm">
                    {t('services.duration')}
                  </span>
                  <span className="font-semibold">{service.duration} {t('services.minutes')}</span>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button 
                  className="btn-secondary flex items-center gap-2 text-sm"
                  onClick={() => openEditDialog(service)}
                >
                  <Edit className="w-4 h-4" />
                  {t('services.edit')}
                </button>
                
                <button 
                  className="btn-secondary flex items-center gap-2 text-sm text-red-500 hover:text-red-600 border-red-500 hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={() => openDeleteDialog(service)}
                >
                  <Trash className="w-4 h-4" />
                  {t('services.delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Scissors className="w-12 h-12 text-primary-300 dark:text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">{t('services.noServices')}</h3>
          <p className="text-primary-500 dark:text-primary-400 mb-6">
            {t('services.noServicesMessage')}
          </p>
          <button 
            className="btn-primary"
            onClick={openAddDialog}
          >
            {t('services.addFirstService')}
          </button>
        </div>
      )}
      
      {/* Add/Edit Service Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white dark:bg-primary-800 p-6 shadow-xl">
            <Dialog.Title className="text-xl font-semibold mb-4">
              {currentService ? t('services.editService') : t('services.addService')}
            </Dialog.Title>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  {t('services.serviceName')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-primary w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  {t('services.serviceDescription')}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-primary w-full"
                  rows="3"
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium mb-1">
                    {t('services.price')} (₪)
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.price}
                    onChange={handleChange}
                    className="input-primary w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium mb-1">
                    {t('services.duration')} ({t('services.minutes')})
                  </label>
                  <input
                    id="duration"
                    name="duration"
                    type="number"
                    min="10"
                    step="5"
                    value={formData.duration}
                    onChange={handleChange}
                    className="input-primary w-full"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-primary-300 dark:border-primary-600 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm">
                  {t('services.activeService')}
                </label>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsDialogOpen(false)}
                >
                  {t('services.cancel')}
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {currentService ? t('services.update') : t('services.create')}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white dark:bg-primary-800 p-6 shadow-xl">
            <Dialog.Title className="text-xl font-semibold mb-4">
              {t('services.deleteServiceTitle')}
            </Dialog.Title>
            
            <p className="mb-6">
              {t('services.deleteServiceConfirmation', { name: currentService?.name })}
            </p>
            
            <div className="flex justify-end gap-2">
              <button
                className="btn-secondary"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                {t('services.cancel')}
              </button>
              <button
                className="btn-secondary text-red-500 hover:text-red-600 border-red-500 hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={handleDelete}
              >
                {t('services.confirmDelete')}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
