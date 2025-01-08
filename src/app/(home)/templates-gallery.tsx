'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from 'convex/react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

import { templates } from '@/constants/templates'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

import { api } from '../../../convex/_generated/api'

interface Template {
  title: string
  initialContent: string
}

const TemplateGallery = () => {
  const router = useRouter()
  const create = useMutation(api.documents.create)
  const [isCreating, setIsCreating] = useState(false)

  const onTemplateClick = ({ title, initialContent }: Template) => {
    setIsCreating(true)
    create({
      title,
      initialContent
    })
      .then((documentId) => {
        toast.success('Document created')
        router.push(`/documents/${documentId}`)
      })
      .catch((error) => {
        toast.error(error.message)
      })
      .finally(() => {
        setIsCreating(false)
      })
  }

  return (
    <div className='bg-[#f1f3f4]'>
      <div className='max-w-screen-xl mx-auto px-16 py-16 flex flex-col gap-y-4'>
        <h3 className='font-medium'>Start a new document</h3>
        <Carousel>
          <CarouselContent className='-ml-4'>
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.3%] pl-4'
              >
                <div
                  className={cn(
                    'aspect-[3/4] flex flex-col gap-y-2.5',
                    isCreating && 'pointer-events-none opacity-50'
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() =>
                      onTemplateClick({
                        title: template.title,
                        initialContent: template.initialContent
                      })
                    }
                    style={{
                      backgroundImage: `url(${template.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                    className='size-full hover:border-blue-500 rounded-sm border hover:bg-blue-500/10 transition flex flex-col items-center justify-center gap-y-4 bg-white'
                  />
                  <h4 className='font-medium text-sm truncate'>
                    {template.title}
                  </h4>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default TemplateGallery
