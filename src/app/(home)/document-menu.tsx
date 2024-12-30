import { Button } from '@/components/ui/button'
import { Id } from '../../../convex/_generated/dataModel'
import { ExternalLinkIcon, MoreVertical, TrashIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { RemoveDialog } from '@/components/remove-dialog'

interface DocumentMenuProps {
  documentId: Id<'documents'>
  title: string
  onNewTab: (documentId: Id<'documents'>) => void
}

const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {
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
      <DropdownMenuContent>
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DocumentMenu
