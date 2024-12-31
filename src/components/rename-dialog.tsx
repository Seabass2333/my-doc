'use client'

import { useMutation } from 'convex/react'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'

import { Id } from '../../convex/_generated/dataModel'
import { api } from '../../convex/_generated/api'

interface RenameDialogProps {
  documentId: Id<'documents'>
  initialTitle: string
  children: React.ReactNode
}

export const RenameDialog: React.FC<RenameDialogProps> = ({
  documentId,
  initialTitle,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [newTitle, setNewTitle] = useState(initialTitle)

  const updateDocument = useMutation(api.documents.updateById)

  const handleRename = async () => {
    setIsUpdating(true)
    await updateDocument({
      id: documentId,
      title: newTitle.trim(),
      content: ''
    })
    setIsUpdating(false)
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              document.
            </DialogDescription>
          </DialogHeader>
          <div className='my-4'>
            <Input
              type='text'
              placeholder='Document Name'
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant='ghost'
              type='button'
              disabled={isUpdating}
              onClick={(e) => {
                e.preventDefault()
                setIsOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isUpdating}
              onClick={handleRename}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
