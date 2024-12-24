import Link from 'next/link'
import Navbar from './navbar'

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='sticky top-0 left-0 z-50 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <div className='mt-16'>
        Click &nbsp;
        <Link
          href='/documents/123'
          className='text-blue-500 underline'
        >
          here
        </Link>
        &nbsp;to go to document id
      </div>
    </div>
  )
}
