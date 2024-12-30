'use client'

import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
  const removeDocument = useMutation(api.documents.removeById)
  const router = useRouter()

  const handleRemove = async () => {
    await removeDocument({ id: documentId })
    router.refresh()
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
          <AlertDialogAction onClick={handleRemove}>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
