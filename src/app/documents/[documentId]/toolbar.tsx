'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'

import {
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ItalicIcon,
  Link2Icon,
  ListTodoIcon,
  LucideIcon,
  MessageCircleIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

// types
import { Level } from '@tiptap/extension-heading'

// components
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

// libraries
import { ColorResult, CirclePicker, SketchPicker } from 'react-color'

// LinkButton
const LinkButton = () => {
  const { editor } = useEditorStore()
  const [value, setValue] = useState(editor?.getAttributes('link')?.href || '')

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
    setValue(href)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='min-w-7 h-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <Link2Icon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 flex flex-col gap-y-2'>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
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
      {/* TODO: Font size */}
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
