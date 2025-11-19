'use client'

import { useEffect, useState } from 'react'
import SensorCard from '@/components/sensor-card'
import SystemCard from '@/components/system-card'

interface SensorData {
  temperature: number
  humidity: number
  lightLevel: number
  lastUpdated: string
}

interface SystemData {
  name: string
  status: 'on' | 'off'
  lastUpdated: string
}

export default function Home() {
  const [sensors, setSensors] = useState<SensorData>({
    temperature: 0,
    humidity: 0,
    lightLevel: 0,
    lastUpdated: new Date().toLocaleTimeString(),
  })

  const [irrigation, setIrrigation] = useState<SystemData>({
    name: 'Sistema de Riego',
    status: 'off',
    lastUpdated: new Date().toLocaleTimeString(),
  })

  const [light, setLight] = useState<SystemData>({
    name: 'Sistema de Luz',
    status: 'off',
    lastUpdated: new Date().toLocaleTimeString(),
  })

  const [presence, setPresence] = useState<SystemData>({
    name: 'Detección de Presencia',
    status: 'off',
    lastUpdated: new Date().toLocaleTimeString(),
  })

  useEffect(() => {
    // Función para obtener datos del API
    const fetchSensorData = async () => {
      try {
        const response = await fetch('/api/sensores')
        const result = await response.json()
        
        if (result.status === 'ok' && result.data) {
          const data = result.data
          
          // Actualizar sensores
          setSensors({
            temperature: data.temperature || 0,
            humidity: data.humidity || 0,
            lightLevel: data.lightLevel || 0,
            lastUpdated: new Date(data.lastUpdated).toLocaleTimeString(),
          })
          
          // Actualizar sistema de riego
          setIrrigation({
            name: 'Sistema de Riego',
            status: data.irrigation === 'on' ? 'on' : 'off',
            lastUpdated: new Date(data.lastUpdated).toLocaleTimeString(),
          })
          
          // Actualizar sistema de luz
          setLight({
            name: 'Sistema de Luz',
            status: data.light === 'on' ? 'on' : 'off',
            lastUpdated: new Date(data.lastUpdated).toLocaleTimeString(),
          })
          
          // Actualizar sensor de presencia
          setPresence({
            name: 'Detección de Presencia',
            status: data.presencia === 'on' ? 'on' : 'off',
            lastUpdated: new Date(data.lastUpdated).toLocaleTimeString(),
          })
        }
      } catch (error) {
        console.error('Error al obtener datos:', error)
      }
    }

    // Obtener datos inmediatamente
    fetchSensorData()

    // Actualizar cada 2 segundos
    const interval = setInterval(fetchSensorData, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-light tracking-tight text-foreground">
            TF IoT - Grupo ?
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Control de Sensores - Monitoreo en tiempo real
          </p>
        </div>

        {/* Main sensor card */}
        <div className="mb-8">
          <SensorCard data={sensors} />
        </div>

        {/* System cards grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <SystemCard system={irrigation} />
          <SystemCard system={light} />
        </div>

        {/* Presence detection box */}
        <div className="mt-6">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-card-foreground">
                  {presence.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Última actualización: {presence.lastUpdated}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Estado:
                </span>
                <div
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    presence.status === 'on'
                      ? 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400'
                      : 'bg-gray-500/10 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400'
                  }`}
                >
                  {presence.status === 'on' ? 'Detectado' : 'No Detectado'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
