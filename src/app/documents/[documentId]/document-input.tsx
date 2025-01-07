import { useRef, useState } from 'react'
import { useMutation } from 'convex/react'
import { BsCloudCheck } from 'react-icons/bs'
import { useDebounce } from '@/hooks/use-debounce'
import { Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'
import { toast } from 'sonner'

interface DocumentInputProps {
  title: string
  id: Id<'documents'>
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const [value, setValue] = useState(title)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isError, setIsError] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const mutation = useMutation(api.documents.updateById)

  const debounceMutation = useDebounce((newValue: string) => {
    if (newValue === title) return

    setIsSaving(true)
    mutation({ id, title: newValue, content: '' })
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
    mutation({ id, title: value, content: '' })
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
      <BsCloudCheck />
    </div>
  )
}
