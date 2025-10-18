export default function Loading() {
  return (
    <div className="tf-fade-in space-y-8">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse" />
          <div className="h-4 w-72 bg-white/5 rounded-lg animate-pulse" />
        </div>
        <div className="flex space-x-3">
          <div className="h-10 w-20 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-10 w-24 bg-white/10 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Edit form skeleton */}
      <div className="tf-card p-8">
        <div className="space-y-6">
          {/* Current project preview */}
          <div className="space-y-4 pb-6 border-b border-white/10">
            <div className="h-5 w-40 bg-white/10 rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
                <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse" />
              </div>
              <div className="h-40 bg-white/5 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Form fields */}
          {[
            { label: 'Project Title', width: 'w-2/3' },
            { label: 'Description', width: 'w-full', height: 'h-24' },
            { label: 'Technologies', width: 'w-3/4' },
            { label: 'Project URL', width: 'w-1/2' },
            { label: 'Repository URL', width: 'w-1/2' },
            { label: 'Status', width: 'w-1/3' }
          ].map((field, i) => (
            <div key={i} className="space-y-2 tf-reveal" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="h-4 w-28 bg-white/10 rounded animate-pulse" />
              <div className={`${field.height || 'h-12'} ${field.width} bg-white/5 rounded-lg animate-pulse`} />
            </div>
          ))}

          {/* Image management */}
          <div className="space-y-4 tf-reveal tf-reveal--delay-5">
            <div className="h-4 w-36 bg-white/10 rounded animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-white/5 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between pt-8">
            <div className="h-10 w-28 bg-red-900/20 rounded-lg animate-pulse" />
            <div className="flex space-x-4">
              <div className="h-10 w-24 bg-white/5 rounded-lg animate-pulse" />
              <div className="h-10 w-32 bg-white/10 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}