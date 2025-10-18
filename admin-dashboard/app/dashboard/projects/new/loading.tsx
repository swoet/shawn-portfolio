export default function Loading() {
  return (
    <div className="tf-fade-in space-y-8">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-56 bg-white/10 rounded-lg animate-pulse" />
        <div className="h-4 w-80 bg-white/5 rounded-lg animate-pulse" />
      </div>

      {/* Form skeleton */}
      <div className="tf-card p-8">
        <div className="space-y-6">
          {/* Form fields */}
          {[
            { label: 'Project Title', width: 'w-2/3' },
            { label: 'Description', width: 'w-full' },
            { label: 'Technologies', width: 'w-3/4' },
            { label: 'Project URL', width: 'w-1/2' },
            { label: 'Repository URL', width: 'w-1/2' }
          ].map((field, i) => (
            <div key={i} className="space-y-2 tf-reveal" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
              <div className={`h-12 ${field.width} bg-white/5 rounded-lg animate-pulse`} />
            </div>
          ))}

          {/* Image upload area */}
          <div className="space-y-2 tf-reveal tf-reveal--delay-5">
            <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
            <div className="h-32 w-full bg-white/5 rounded-lg animate-pulse border-2 border-dashed border-white/10" />
          </div>

          {/* Action buttons */}
          <div className="flex space-x-4 pt-6">
            <div className="h-10 w-24 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-10 w-20 bg-white/5 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}