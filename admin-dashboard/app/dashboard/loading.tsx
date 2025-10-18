export default function Loading() {
  return (
    <div className="tf-fade-in flex items-center justify-center min-h-96">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated logo/icon */}
        <div className="relative">
          <div className="w-12 h-12 border-3 border-white/10 border-t-white rounded-full animate-spin" />
          <div className="absolute inset-0 w-12 h-12 border-3 border-transparent border-r-white/60 rounded-full animate-spin [animation-delay:0.5s]" />
        </div>
        
        {/* Loading text */}
        <div className="text-center">
          <p className="text-white/90 font-medium tracking-wide">Loading...</p>
          <p className="text-white/50 text-sm mt-1">Please wait while we fetch your data</p>
        </div>
        
        {/* Progress dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
}