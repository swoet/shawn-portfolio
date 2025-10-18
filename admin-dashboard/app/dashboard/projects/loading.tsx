export default function Loading() {
  return (
    <div className="tf-fade-in space-y-6">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse" />
          <div className="h-4 w-32 bg-white/5 rounded-lg animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-white/10 rounded-lg animate-pulse" />
      </div>

      {/* Projects grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="tf-card p-6 space-y-4 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="h-40 bg-white/5 rounded-lg" />
            <div className="space-y-2">
              <div className="h-6 bg-white/10 rounded w-3/4" />
              <div className="h-4 bg-white/5 rounded w-full" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
            </div>
            <div className="flex justify-between pt-4">
              <div className="h-8 w-16 bg-white/10 rounded" />
              <div className="h-8 w-20 bg-white/5 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}