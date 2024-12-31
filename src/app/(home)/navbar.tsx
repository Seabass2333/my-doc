import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

import { SearchInput } from './search-input'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between h-full bg-white'>
      <div className='flex gap-3 items-center shrink-0 pr-6'>
        <Link href='/'>
          <Image
            src='/logo.svg'
            alt='logo'
            width={42}
            height={42}
          />
        </Link>
        <h3 className='text-lg font-semibold'>My Docs</h3>
      </div>
      <SearchInput />
      <UserButton />
      <div />
    </nav>
  )
}

export default Navbar
