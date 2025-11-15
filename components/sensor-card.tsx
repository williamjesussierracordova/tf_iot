interface SensorData {
  temperature: number
  humidity: number
  lightLevel: number
  lastUpdated: string
}

export default function SensorCard({ data }: { data: SensorData }) {
  return (
    <div className="rounded-lg border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md">
      <h2 className="mb-6 text-lg font-medium text-card-foreground">
        Datos de Sensores
      </h2>

      <div className="grid gap-6 sm:grid-cols-3">
        {/* Temperature */}
        <div className="flex flex-col items-center justify-center rounded-md bg-muted/50 px-4 py-6">
          <span className="text-sm font-medium text-muted-foreground">
            Temperatura
          </span>
          <div className="mt-2 text-3xl font-light text-foreground">
            {data.temperature}°C
          </div>
        </div>

        {/* Humidity */}
        <div className="flex flex-col items-center justify-center rounded-md bg-muted/50 px-4 py-6">
          <span className="text-sm font-medium text-muted-foreground">
            Humedad
          </span>
          <div className="mt-2 text-3xl font-light text-foreground">
            {data.humidity}%
          </div>
        </div>

        {/* Light Level */}
        <div className="flex flex-col items-center justify-center rounded-md bg-muted/50 px-4 py-6">
          <span className="text-sm font-medium text-muted-foreground">
            Nivel de Luz
          </span>
          <div className="mt-2 text-3xl font-light text-foreground">
            {data.lightLevel}%
          </div>
        </div>
      </div>

      {/* Last updated */}
      <div className="mt-6 border-t border-border pt-4 text-center">
        <span className="text-xs text-muted-foreground">
          Última actualización: {data.lastUpdated}
        </span>
      </div>
    </div>
  )
}
