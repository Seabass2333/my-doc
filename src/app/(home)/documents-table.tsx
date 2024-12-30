import { PaginationStatus } from 'convex/react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Doc } from '../../../convex/_generated/dataModel'
import { LoaderIcon } from 'lucide-react'

interface DocumentsTableProps {
  documents: Doc<'documents'>[] | undefined
  loadMore: (numItems: number) => void
  status: PaginationStatus
}

const DocumentsTable = ({
  documents,
  loadMore,
  status
}: DocumentsTableProps) => {
  return (
    <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5'>
      {documents === undefined ? (
        <div className='flex justify-center items-center h-screen'>
          <LoaderIcon className='size-6 animate-spin text-muted-foreground' />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent border-none'>
              <TableHead>Title</TableHead>
              <TableHead>Shared With</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className='hover:bg-transparent border-none'>
                <TableCell
                  colSpan={4}
                  className='h-24 text-center text-muted-foreground'
                >
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document._id}>
                  <TableCell>{document.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </div>
  )
}

export default DocumentsTable
