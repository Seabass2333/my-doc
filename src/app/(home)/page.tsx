'use client'

import { useQuery } from 'convex/react'
import Navbar from './navbar'
import TemplatesGallery from './templates-gallery'
import { api } from '../../../convex/_generated/api'

export default function Home() {
  const documents = useQuery(api.documents.getDocuments)

  if (!documents) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    )
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='sticky top-0 left-0 z-50 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TemplatesGallery />
        {documents &&
          documents.map((document) => (
            <div key={document._id}>{document.title}</div>
          ))}
      </div>
    </div>
  )
}
