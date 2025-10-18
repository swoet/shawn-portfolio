import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-white/40 selection:bg-white selection:text-black bg-white/5 border-white/20 h-10 w-full min-w-0 rounded-lg border px-4 py-2 text-base text-white tf-input tf-focus transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:border-white/30 hover:bg-white/8",
        "focus:border-white/60 focus:bg-white/10 focus:ring-2 focus:ring-white/20",
        "aria-invalid:ring-red-500/30 aria-invalid:border-red-500/60",
        className
      )}
      {...props}
    />
  )
}

export { Input }
