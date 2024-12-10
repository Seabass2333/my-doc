import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex min-h-screen items-center justify-center p-24'>
      Click &nbsp;
      <Link
        href='/documents/123'
        className='text-blue-500 underline'
      >
        here
      </Link>
      &nbsp;to go to document id
    </main>
  )
}
