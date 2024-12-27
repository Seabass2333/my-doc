'use client'

import { usePaginatedQuery } from 'convex/react'

import Navbar from './navbar'
import TemplatesGallery from './templates-gallery'
import DocumentsTable from './documents-table'

import { api } from '../../../convex/_generated/api'

export default function Home() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.getDocuments,
    {},
    {
      initialNumItems: 5
    }
  )

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='sticky top-0 left-0 z-50 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  )
}