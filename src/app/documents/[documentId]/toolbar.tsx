'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageCircleIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter
} from '@/components/ui/dialog'

// types
import { Level } from '@tiptap/extension-heading'

// components
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

// libraries
import { ColorResult, CirclePicker, SketchPicker } from 'react-color'
import { Button } from '@/components/ui/button'

// FontSizeButton
const FontSizeButton = () => {
  const { editor } = useEditorStore()

  const currentFontSize =
    editor?.getAttributes('textStyle').fontSize?.replace('px', '') || '16'

  const [fontSize, setFontSize] = useState(currentFontSize)
  const [inputValue, setInputValue] = useState(fontSize)
  const [isEditing, setIsEditing] = useState(false)

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize)
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run()
      setFontSize(newSize)
      setInputValue(newSize)
      setIsEditing(false)
    }
  }

  const hndleInputChange = () => {
    setInputValue()
  }

  return <div>FontSize</div>
}

// ListButton
const ListButton = () => {
  const { editor } = useEditorStore()
  const alignments = [
    {
      label: 'Align Left',
      value: 'left',
      icon: AlignLeftIcon
    },
    {
      label: 'Align Center',
      value: 'center',
      icon: AlignCenterIcon
    },
    {
      label: 'Align Right',
      value: 'right',
      icon: AlignRightIcon
    },
    {
      label: 'Align Justify',
      value: 'justify',
      icon: AlignJustifyIcon
    }
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='min-w-7 h-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <AlignLeftIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.getAttributes('textStyle')?.textAlign === value &&
                'bg-neutral-200/80'
            )}
          >
            <Icon className='size-4' />
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// AlignButton
const AlignButton = () => {
  const { editor } = useEditorStore()

  const lists = [
    {
      label: 'Bullet List',
      icon: ListIcon,
      isActive: () => editor?.isActive('bulletList'),
      onClick: () => editor?.chain().focus().toggleBulletList().run()
    },
    {
      label: 'Ordered List',
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive('orderedList'),
      onClick: () => editor?.chain().focus().toggleOrderedList().run()
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='min-w-7 h-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <ListIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {lists.map(({ label, isActive, onClick, icon: Icon }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              isActive() && 'bg-neutral-200/80'
            )}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ImageButton
const ImageButton = () => {
  const { editor } = useEditorStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const onChange = (href: string) => {
    editor?.chain().focus().setImage({ src: href }).run()
  }

  const handleAddImage = () => {
    console.log('add image')
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const url = URL.createObjectURL(file)
        onChange(url)
      }
    }
    console.log(input)

    input.click()
  }

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl)
      setImageUrl('')
      setIsDialogOpen(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='min-w-7 h-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
            <ImageIcon className='size-4' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleAddImage()}>
            <UploadIcon className='size-4 mr-2' />
            Upload Image
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className='size-4 mr-2' />
            Paste Image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inset Image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder='Insert Image URL'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleImageUrlSubmit()
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// LinkButton
const LinkButton = () => {
  const { editor } = useEditorStore()
  const [value, setValue] = useState('')

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
    setValue('')
  }

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes('link').href || '')
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className='min-w-7 h-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <Link2Icon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 flex gap-x-2'>
        <Input
          placeholder='https://example.com'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Add</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// text color
const TextColorButton = () => {
  const { editor } = useEditorStore()
  const value = editor?.getAttributes('textStyle')?.color || '#000'

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='min-w-7 h-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='text-xs'>A</span>
          <div
            className='h-0.5 w-full'
            style={{ backgroundColor: value }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5'>
        <CirclePicker
          onChange={onChange}
          color={value}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// highlight color
const HighlightColorButton = () => {
  const { editor } = useEditorStore()
  const value = editor?.getAttributes('highlight')?.color || '#000'

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='min-w-7 h-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <HighlighterIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5'>
        <SketchPicker
          onChange={onChange}
          color={value}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ad heading styles
const HeadingLevelButton = () => {
  const { editor } = useEditorStore()
  const headingLevels = [
    { label: 'Normal Text', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '18px' },
    { label: 'Heading 4', value: 4, fontSize: '16px' }
  ]

  const getCurrentHeadingLevel = () => {
    for (const level of headingLevels) {
      if (editor?.isActive('heading', { level: level.value })) {
        return level.label
      }
    }
    return 'Normal Text'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='min-w-7 h-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>{getCurrentHeadingLevel()}</span>
          <ChevronDownIcon className='size-4 ml-2 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {headingLevels.map(({ label, value, fontSize }) => (
          <DropdownMenuItem key={value}>
            <button
              key={value}
              onClick={() =>
                editor
                  ?.chain()
                  .focus()
                  .setHeading({ level: value as Level })
                  .run()
              }
              style={{ fontSize }}
              className={cn(
                'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                (value === 0 && !editor?.isActive('heading')) ||
                  (editor?.isActive('heading', { level: value }) &&
                    'bg-neutral-200/80')
              )}
            >
              {label}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// change font family
const FontFamilyButton = () => {
  const { editor } = useEditorStore()
  const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Arial Black', value: 'Arial Black' },
    { label: 'Arial Narrow', value: 'Arial Narrow' },
    { label: 'Arial Rounded MT Bold', value: 'Arial Rounded MT Bold' },
    { label: 'Arial Unicode MS', value: 'Arial Unicode MS' },
    { label: 'Comic Sans MS', value: 'Comic Sans MS' }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className='w-[120px] h-7 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>
            {editor?.getAttributes('textStyle')?.fontFamily || 'Arial'}
          </span>
          <ChevronDownIcon className='size-4 ml-2 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {fonts.map(({ label, value }) => (
          <DropdownMenuItem key={value}>
            <button
              className={cn(
                'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                editor?.getAttributes('textStyle')?.fontFamily === value &&
                  'bg-neutral-200/80'
              )}
              style={{
                fontFamily: value
              }}
              onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            >
              <span className='text-sm'>{label}</span>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ToolbarButtonProps {
  icon: LucideIcon
  onClick: () => void
  isActive?: boolean
}

const ToolbarButton = ({
  icon: Icon,
  onClick,
  isActive
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className='size-4' />
    </button>
  )
}

const Toolbar = () => {
  const { editor } = useEditorStore()

  const sections: {
    label: string
    icon: LucideIcon
    onClick: () => void
    isActive?: boolean
  }[][] = [
    // Actions
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
        isActive: false
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
        isActive: false
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => window.print()
      },
      {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck')
          editor?.view.dom.setAttribute(
            'spellcheck',
            current ? 'false' : 'true'
          )
        }
      }
    ],
    // Formatting
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive('bold')
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive('italic')
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive('underline')
      }
    ],
    // Comments and Todo List
    [
      {
        label: 'Comment',
        icon: MessageCircleIcon,
        onClick: () => console.log('comment'),
        isActive: false
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive('taskList')
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run()
      }
    ]
  ]

  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {sections[0].map((button, index) => (
        <ToolbarButton
          key={index}
          {...button}
        />
      ))}
      <Separator
        orientation='vertical'
        className='h-6 bg-neutral-200'
      />
      <FontFamilyButton />
      <Separator
        orientation='vertical'
        className='h-6 bg-neutral-200'
      />
      <HeadingLevelButton />
      <Separator
        orientation='vertical'
        className='h-6 bg-neutral-200'
      />
      {/* Font size */}
      <FontSizeButton />
      <Separator
        orientation='vertical'
        className='h-6 bg-neutral-200'
      />
      {sections[1].map((button, index) => (
        <ToolbarButton
          key={index}
          {...button}
        />
      ))}
      {/* Text color */}
      <TextColorButton />
      {/* Highligh color */}
      <HighlightColorButton />
      <Separator
        orientation='vertical'
        className='h-6 bg-neutral-200'
      />
      {/* link */}
      <LinkButton />
      {/* image */}
      <ImageButton />
      {/* align */}
      <AlignButton />
      {/* list */}
      <ListButton />
      <Separator
        orientation='vertical'
        className='h-6 bg-neutral-200'
      />
      {sections[2].map((button, index) => (
        <ToolbarButton
          key={index}
          {...button}
        />
      ))}
    </div>
  )
}

export default Toolbar
