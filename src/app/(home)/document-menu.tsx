import { useQuery } from 'convex/react'
import { Button } from '@/components/ui/button'
import {
  ExternalLinkIcon,
  MoreVertical,
  PencilIcon,
  SwitchCameraIcon,
  TrashIcon
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { RemoveDialog } from '@/components/remove-dialog'
import { RenameDialog } from '@/components/rename-dialog'
import SharedSwitch from '@/components/shared-switch'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

interface DocumentMenuProps {
  documentId: Id<'documents'>
  title: string
  onNewTab: (documentId: Id<'documents'>) => void
}

const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {
  const document = useQuery(api.documents.getById, { id: documentId })

  const isPersonal = !document?.organizationId

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
        >
          <MoreVertical className='size-4 fill-blue-500' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
        <RenameDialog
          documentId={documentId}
          initialTitle={title}
        >
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PencilIcon className='size-4 mr-2' />
            <span>Rename</span>
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <TrashIcon className='size-4 mr-2' />
            <span>Remove</span>
          </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className='size-4' />
          <span>Open in new tab</span>
        </DropdownMenuItem>
        <SharedSwitch documentId={documentId}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <SwitchCameraIcon className='size-4' />
            <span>Switch to {isPersonal ? 'organization' : 'personal'}</span>
          </DropdownMenuItem>
        </SharedSwitch>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DocumentMenu
