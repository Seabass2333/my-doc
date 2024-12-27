import { LoaderIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface FullScreenLoaderProps {
  label?: string
  className?: string
}

export const FullScreenLoader = ({
  label,
  className
}: FullScreenLoaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 min-h-screen',
        className
      )}
    >
      <div className='flex flex-col items-center justify-center'>
        <LoaderIcon className='size-6 text-muted-foreground animate-spin' />
        {label && <p className='text-sm text-muted-foreground'>{label}</p>}
      </div>
    </div>
  )
}
