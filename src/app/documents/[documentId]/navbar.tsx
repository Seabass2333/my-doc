import Image from 'next/image'
import Link from 'next/link'
import { DocumentInput } from './document-input'
import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent
} from '@/components/ui/menubar'
import {
  EditIcon,
  FileIcon,
  FileJsonIcon,
  GlobeIcon,
  FileTextIcon
} from 'lucide-react'
import { BsFilePdf } from 'react-icons/bs'

export const Navbar = () => {
  return (
    <nav className='flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <Link href='/'>
          <Image
            src='/logo.svg'
            alt='logo'
            width={44}
            height={44}
          />
        </Link>
        <div className='flex flex-col'>
          <DocumentInput />
          <div className='flex'>
            <Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  File
                </MenubarTrigger>
                <MenubarContent className='print:hidden'>
                  <MenubarSub>
                    <MenubarSubTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                      <FileIcon className='size-4 mr-2' />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <FileJsonIcon className='size-4 mr-2' />
                        JSON
                      </MenubarItem>
                      <MenubarItem>
                        <GlobeIcon className='size-4 mr-2' />
                        HTML
                      </MenubarItem>
                      <MenubarItem>
                        <BsFilePdf className='size-4 mr-2' />
                        PDF
                      </MenubarItem>
                      <MenubarItem>
                        <FileTextIcon className='size-4 mr-2' />
                        TEXT
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <EditIcon className='size-4 mr-2' />
                    Edit
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <EditIcon className='size-4 mr-2' />
                    Insert
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <EditIcon className='size-4 mr-2' />
                    Format
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  )
}
