import { TableRow, TableCell } from '@/components/ui/table'
import { SiGoogledocs } from 'react-icons/si'
import { format } from 'date-fns'

import { Doc } from '../../../convex/_generated/dataModel'
import { Building2Icon, CircleUserIcon } from 'lucide-react'

import DocumentMenu from './document-menu'
import { useRouter } from 'next/navigation'

interface DocumentRowProps {
  document: Doc<'documents'>
}

const DocumentRow = ({ document }: DocumentRowProps) => {
  const router = useRouter()

  const onNewTabClick = (id: string) => {
    // console.log('new tab clicked')
    window.open(`/documents/${id}`, '_blank')
  }

  const onRowClick = (id: string) => {
    router.push(`/documents/${id}`)
  }

  return (
    <TableRow
      className='cursor-pointer hover:bg-gray-100'
      onClick={() => onRowClick(document._id)}
    >
      <TableCell className='w-[50px]'>
        <SiGoogledocs className='size-6 fill-blue-500' />
      </TableCell>
      <TableCell className='text-medium md:w-[45%]'>{document.title}</TableCell>
      <TableCell className='text-muted-foreground md:flex hidden items-center gap-2'>
        {document.organizationId ? (
          <Building2Icon className='size-4' />
        ) : (
          <CircleUserIcon className='size-4' />
        )}
        {document.organizationId ? 'Organization' : 'Personal'}
      </TableCell>
      <TableCell className='text-muted-foreground md:table-cell hidden'>
        {format(document._creationTime, 'MMM d, yyyy')}
      </TableCell>
      <TableCell className='flex justify-end'>
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  )
}

export default DocumentRow
