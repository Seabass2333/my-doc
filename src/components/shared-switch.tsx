'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { toast } from 'sonner'
import { Id } from '../../convex/_generated/dataModel'
import { api } from '../../convex/_generated/api'
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter
} from './ui/alert-dialog'

interface SharedSwitchProps {
  documentId: Id<'documents'>
  organizationId?: string
  isPersonal?: boolean
  children: React.ReactNode
}
// 切换文档属性 personal <-> organization
const SharedSwitch = ({
  documentId,
  organizationId,
  isPersonal = false,
  children
}: SharedSwitchProps) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const switchDocumentToOrganization = useMutation(
    api.documents.switchDocumentToOrganization
  )
  const switchDocumentToPersonal = useMutation(
    api.documents.switchDocumentToPersonal
  )

  const handleSwitch = () => {
    setIsUpdating(true)
    if (isPersonal) {
      switchDocumentToOrganization({
        id: documentId,
        organizationId: organizationId as string
      })
        .then(() => {
          toast.success('Document switched to organization')
        })
        .catch(() => {
          toast.error('Failed to switch document to organization')
        })
        .finally(() => {
          setIsUpdating(false)
        })
    } else {
      switchDocumentToPersonal({
        id: documentId
      })
        .then(() => {
          toast.success('Document switched to personal')
        })
        .catch(() => {
          toast.error('Failed to switch document to personal')
        })
        .finally(() => {
          setIsUpdating(false)
        })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Switch Document</AlertDialogTitle>
          <AlertDialogDescription>
            This action will switch the document to{' '}
            {isPersonal ? 'organization' : 'personal'}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isUpdating}
            onClick={handleSwitch}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default SharedSwitch
