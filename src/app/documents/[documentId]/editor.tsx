'use client'

import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import { TextAlign } from '@tiptap/extension-text-align'
import { FontSizeExtension } from '@/extensions/font-size'
import { lineHeightExtension } from '@/extensions/line-height'
import { useLiveblocksExtension } from '@liveblocks/react-tiptap'
import { useEditor, EditorContent } from '@tiptap/react'
import { useEditorStore } from '@/store/use-editor-store'

import { type Editor as EditorType } from '@tiptap/react'

import { Ruler } from './ruler'

import { Threads } from './threads'

const Editor = () => {
  const liveblocks = useLiveblocksExtension()
  const { setEditor } = useEditorStore()

  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }: { editor: EditorType }) {
      setEditor(editor)
    },
    onDestroy() {
      setEditor(null)
    },
    onUpdate({ editor }: { editor: EditorType }) {
      setEditor(editor)
    },
    onSelectionUpdate({ editor }: { editor: EditorType }) {
      setEditor(editor)
    },
    onTransaction({ editor }: { editor: EditorType }) {
      setEditor(editor)
    },
    onBlur({ editor }: { editor: EditorType }) {
      setEditor(editor)
    },
    onFocus({ editor }: { editor: EditorType }) {
      setEditor(editor)
    },
    onContentError({ editor }: { editor: EditorType }) {
      setEditor(editor)
    },
    editorProps: {
      attributes: {
        style: 'padding-left: 56px; padding-right: 56px;',
        class:
          'focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text'
      }
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false
      }),
      TaskList,
      TaskItem,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Image,
      ImageResize,
      Underline,
      FontFamily,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      FontSizeExtension,
      lineHeightExtension.configure({
        types: ['heading', 'paragraph'],
        defaultLineHeight: 'normal'
      })
    ]
  })

  return (
    <div className='size-full overflow-x-auto bg-[#F9FbFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
      <Ruler />
      <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  )
}

export default Editor
