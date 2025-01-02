'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction
} from '@/components/ui/alert-dialog'

import { Id } from '../../convex/_generated/dataModel'
import { api } from '../../convex/_generated/api'

interface RemoveDialogProps {
  documentId: Id<'documents'>
  children: React.ReactNode
}

export const RemoveDialog: React.FC<RemoveDialogProps> = ({
  documentId,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  // Remove document mutation
  const removeDocument = useMutation(api.documents.removeById)

  // Handle remove document
  const handleRemove = () => {
    setIsRemoving(true)
    removeDocument({ id: documentId })
      .then(() => {
        toast.success('Document deleted')
      })
      .catch((error) => {
        toast.error(error.message)
      })
      .finally(() => {
        setIsRemoving(false)
      })
  }

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            document.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRemove}
            disabled={isRemoving}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
