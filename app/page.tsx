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

  useEffect(() => {
    // Simulate fetching sensor data
    const sensorInterval = setInterval(() => {
      setSensors({
        temperature: Math.round((Math.random() * 15 + 18) * 10) / 10,
        humidity: Math.round(Math.random() * 40 + 40),
        lightLevel: Math.round(Math.random() * 60 + 40),
        lastUpdated: new Date().toLocaleTimeString(),
      })
    }, 5000)

    // Simulate fetching irrigation system data
    const irrigationInterval = setInterval(() => {
      setIrrigation((prev) => ({
        ...prev,
        status: Math.random() > 0.5 ? 'on' : 'off',
        lastUpdated: new Date().toLocaleTimeString(),
      }))
    }, 7000)

    // Simulate fetching light system data
    const lightInterval = setInterval(() => {
      setLight((prev) => ({
        ...prev,
        status: Math.random() > 0.5 ? 'on' : 'off',
        lastUpdated: new Date().toLocaleTimeString(),
      }))
    }, 6000)

    return () => {
      clearInterval(sensorInterval)
      clearInterval(irrigationInterval)
      clearInterval(lightInterval)
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
      </div>
    </main>
  )
}
