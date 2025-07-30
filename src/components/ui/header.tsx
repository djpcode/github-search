import * as React from "react"

import { cn } from "@/lib/utils"

export function Header({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "bg-card text-card-foreground border shadow-sm",
        className
      )}
      {...props}
    />
  )
}