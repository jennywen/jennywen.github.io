import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  // Create date with timezone offset to prevent date shift
  const date = new Date(dateString + 'T00:00:00Z')
  return date.toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}
