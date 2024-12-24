import Navbar from './navbar'
import TemplatesGallery from './templates-gallery'

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='sticky top-0 left-0 z-50 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TemplatesGallery />
      </div>
    </div>
  )
}
