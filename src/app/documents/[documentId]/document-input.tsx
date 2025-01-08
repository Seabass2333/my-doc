import { useRef, useState } from 'react'
import { useMutation } from 'convex/react'
import { BsCloudCheck } from 'react-icons/bs'
import { useStatus } from '@liveblocks/react'
import { toast } from 'sonner'

import { useDebounce } from '@/hooks/use-debounce'

import { Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'
import { LoaderIcon } from 'lucide-react'

interface DocumentInputProps {
  id: Id<'documents'>
  title: string
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const status = useStatus()

  const [value, setValue] = useState(title)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isError, setIsError] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const mutation = useMutation(api.documents.updateById)

  const debounceMutation = useDebounce((newValue: string) => {
    if (newValue === title) return

    setIsSaving(true)
    mutation({ id, title: newValue })
      .then(() => {
        toast.success('Document title updated')
      })
      .catch(() => {
        setIsError(true)
        toast.error('Failed to update document title')
      })
      .finally(() => {
        setIsSaving(false)
      })
  }, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    debounceMutation(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSaving(true)
    mutation({ id, title: value })
      .then(() => {
        toast.success('Document title updated')
        setIsEditing(false)
      })
      .catch(() => {
        setIsError(true)
        toast.error('Failed to update document title')
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  const showLoader =
    isSaving || status === 'connecting' || status === 'reconnecting'
  const showError = status === 'disconnected'

  return (
    <div className='flex items-center gap-2'>
      {isEditing ? (
        <form
          className='relative w-fit max-w-[50ch]'
          onSubmit={handleSubmit}
        >
          <span className='invisible whitespace-pre px-1.5 text-lg'>
            {value || ''}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onBlur={() => setIsEditing(false)}
            className='absolute inset-0 text-lg px-1.5 cursor truncate bg-transparent'
          />
        </form>
      ) : (
        <span
          className='text-lg px-1.5 cursor truncate'
          onClick={() => {
            setIsEditing(true)
            setTimeout(() => {
              inputRef.current?.focus()
            }, 0)
          }}
        >
          {title}
        </span>
      )}
      {showError && <BsCloudCheck className='size-4 text-red-500' />}
      {!showLoader && !showError && <BsCloudCheck className='size-4' />}
      {showLoader && (
        <LoaderIcon className='size-4 animate-spin text-muted-foreground' />
      )}
    </div>
  )
}
