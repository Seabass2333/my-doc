import Image from 'next/image'
import Link from 'next/link'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

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
      <div className='flex items-center gap-3 pl-6'>
        <OrganizationSwitcher
          afterCreateOrganizationUrl='/'
          afterSelectOrganizationUrl='/'
          afterLeaveOrganizationUrl='/'
          afterSelectPersonalUrl='/'
        />
        <UserButton />
      </div>
    </nav>
  )
}

export default Navbar
