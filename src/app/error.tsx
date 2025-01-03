'use client'

import Link from 'next/link'
import { AlertTriangleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function ErrorPage({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center space-y-6'>
      <div className='text-center space-y-4'>
        <div className='flex justify-center'>
          <div className='bg-rose-100 p-3 rounded-full'>
            <AlertTriangleIcon className='size-6 text-rose-500' />
          </div>
        </div>
        <h1 className='text-2xl font-bold'>An error occurred</h1>
        <p className='text-gray-500'>{error.message}</p>
        <div className='flex justify-center gap-6'>
          <Link href='/'>
            <Button variant='outline'>Go back</Button>
          </Link>
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </div>
  )
}
