'use client'

import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import { LucideIcon, Undo2Icon } from 'lucide-react'

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
  console.log('editor', editor)

  const sections: {
    label: string
    icon: LucideIcon
    onClick: () => void
    isActive?: boolean
  }[][] = [
    [
      {
        label: 'Formatting',
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
        isActive: false
      }
    ]
  ]

  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {sections.map((section, index) => (
        <div
          key={index}
          className='flex items-center gap-x-0.5'
        >
          {section.map((button, index) => (
            <ToolbarButton
              key={index}
              {...button}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Toolbar
