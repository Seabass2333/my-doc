'use client'

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
  FileIcon,
  FileJsonIcon,
  GlobeIcon,
  FileTextIcon,
  FilePlusIcon,
  TrashIcon,
  FilePenIcon,
  PrinterIcon,
  Command,
  Undo2Icon,
  Redo2Icon,
  TextIcon,
  BoldIcon,
  UnderlineIcon,
  ItalicIcon,
  StrikethroughIcon,
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  RemoveFormattingIcon
} from 'lucide-react'
import { BsFilePdf } from 'react-icons/bs'
import { useEditorStore } from '@/store/use-editor-store'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Avatars } from './avatars'

export const Navbar = () => {
  const { editor } = useEditorStore()

  const insertTable = (rows: number, cols: number) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run()
  }

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const onSaveJson = () => {
    if (!editor) return

    const content = editor?.getJSON()
    const blob = new Blob([JSON.stringify(content)], {
      type: 'application/json'
    })
    onDownload(blob, 'document.json')
  }

  const onSaveHtml = () => {
    if (!editor) return

    const content = editor?.getHTML()
    const blob = new Blob([content], { type: 'text/html' })
    onDownload(blob, 'document.html')
  }

  const onSavePdf = () => {
    if (!editor) return

    const content = editor?.getHTML()
    const blob = new Blob([content], { type: 'application/pdf' })
    onDownload(blob, 'document.pdf')
  }

  const onSaveText = () => {
    if (!editor) return

    const content = editor?.getText()
    const blob = new Blob([content], { type: 'text/plain' })
    onDownload(blob, 'document.txt')
  }

  return (
    <nav className='flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <Link href='/'>
          <Image
            src='/logo.svg'
            alt='logo'
            width={42}
            height={42}
          />
        </Link>
        <div className='flex flex-col'>
          <DocumentInput />
          <div className='flex'>
            <Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
              {/* file */}
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  File
                </MenubarTrigger>
                <MenubarContent className='print:hidden'>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className='size-4 mr-2' />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJson}>
                        <FileJsonIcon className='size-4 mr-2' />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHtml}>
                        <GlobeIcon className='size-4 mr-2' />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={onSavePdf}>
                        <BsFilePdf className='size-4 mr-2' />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className='size-4 mr-2' />
                        TEXT
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlusIcon className='size-4 mr-2' />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />

                  <MenubarItem>
                    <FilePenIcon className='size-4 mr-2' />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon className='size-4 mr-2' />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem
                    className='flex justify-between'
                    onClick={() => window.print()}
                  >
                    <PrinterIcon className='size-4 mr-2' />
                    Print
                    <MenubarShortcut className='flex items-center'>
                      <Command className='size-3 mr-[2px] mt-[-2px]' /> P
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              {/* edit */}
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className='size-4 mr-2' />
                    Undo
                    <MenubarShortcut className='flex items-center'>
                      <Command className='size-3 mr-[2px] mt-[-2px]' /> Z
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className='size-4 mr-2' />
                    Redo
                    <MenubarShortcut className='flex items-center'>
                      <Command className='size-3 mr-[2px] mt-[-2px]' /> Y
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => insertTable(1, 1)}>
                        1 x 1
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable(2, 2)}>
                        2 x 2
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable(3, 3)}>
                        3 x 3
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable(4, 4)}>
                        4 x 4
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable(5, 5)}>
                        5 x 5
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              {/* format */}
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className='size-4 mr-2' />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent className='min-w-[165px]'>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon className='size-4 mr-2' />
                        Bold
                        <MenubarShortcut className='flex items-center'>
                          <Command className='size-3 mr-[2px] mt-[-2px]' /> B
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon className='size-4 mr-2' />
                        Italic
                        <MenubarShortcut className='flex items-center'>
                          <Command className='size-3 mr-[2px] mt-[-2px]' /> I
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <UnderlineIcon className='size-4 mr-2' />
                        Underline
                        <MenubarShortcut className='flex items-center'>
                          <Command className='size-3 mr-[2px] mt-[-2px]' /> U
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <StrikethroughIcon className='size-4 mr-2' />
                        Strikethrough
                        <MenubarShortcut className='flex items-center'>
                          <Command className='size-3 mr-[2px] mt-[-2px]' /> S
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setTextAlign('left').run()
                        }
                      >
                        <AlignLeftIcon className='size-4 mr-2' />
                        Align Left
                        <MenubarShortcut className='flex items-center'>
                          <Command className='size-3 mr-[2px] mt-[-2px]' /> L
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setTextAlign('center').run()
                        }
                      >
                        <AlignCenterIcon className='size-4 mr-2' />
                        Align Center
                        <MenubarShortcut className='flex items-center'>
                          <Command className='size-3 mr-[2px] mt-[-2px]' /> C
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setTextAlign('right').run()
                        }
                      >
                        <AlignRightIcon className='size-4 mr-2' />
                        Align Right
                        <MenubarShortcut className='flex items-center'>
                          <Command className='size-3 mr-[2px] mt-[-2px]' /> R
                        </MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className='size-4 mr-2' />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-3 pl-6'>
        <Avatars />
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
