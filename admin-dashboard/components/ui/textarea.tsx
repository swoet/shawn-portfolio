import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-white/40 selection:bg-white selection:text-black bg-white/5 border-white/20 flex field-sizing-content min-h-20 w-full rounded-lg border px-4 py-3 text-base text-white tf-input tf-focus transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-vertical",
        "hover:border-white/30 hover:bg-white/8",
        "focus:border-white/60 focus:bg-white/10 focus:ring-2 focus:ring-white/20",
        "aria-invalid:ring-red-500/30 aria-invalid:border-red-500/60",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
