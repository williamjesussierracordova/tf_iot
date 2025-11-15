interface SystemData {
  name: string
  status: 'on' | 'off'
  lastUpdated: string
}

export default function SystemCard({ system }: { system: SystemData }) {
  const isActive = system.status === 'on'

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <h3 className="mb-4 text-base font-medium text-card-foreground">
        {system.name}
      </h3>

      <div className="mb-6 flex items-center justify-center">
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full border-2 transition-all duration-300 ${
            isActive
              ? 'border-green-500 bg-green-50'
              : 'border-muted bg-muted/50'
          }`}
        >
          <span
            className={`text-sm font-semibold uppercase tracking-wider ${
              isActive ? 'text-green-600' : 'text-muted-foreground'
            }`}
          >
            {isActive ? 'Encendido' : 'Apagado'}
          </span>
        </div>
      </div>

      {/* Last updated */}
      <div className="border-t border-border pt-4 text-center">
        <span className="text-xs text-muted-foreground">
          Última actualización: {system.lastUpdated}
        </span>
      </div>
    </div>
  )
}
