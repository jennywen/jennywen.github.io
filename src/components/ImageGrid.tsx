import Image from 'next/image'

export default function ImageGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 my-8">
      {children}
    </div>
  )
} 