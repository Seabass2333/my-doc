'use client'

import { useEffect, useRef, useState } from 'react'
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
import { getOrganizationList } from '@/app/servers'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { useForm } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

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
  const formRef = useRef<HTMLFormElement>(null)
  const form = useForm<{ organizationId: string }>({
    defaultValues: {
      organizationId: ''
    }
  })

  const [isUpdating, setIsUpdating] = useState(false)
  const [organizationList, setOrganizationList] = useState<
    { id: string; name: string; image: string }[]
  >([])

  // 获取组织列表
  useEffect(() => {
    const getOrgs = async () => {
      const organizationList = await getOrganizationList()
      setOrganizationList(organizationList)
    }
    getOrgs()
  }, [])

  const switchDocumentToOrganization = useMutation(
    api.documents.switchDocumentToOrganization
  )
  const switchDocumentToPersonal = useMutation(
    api.documents.switchDocumentToPersonal
  )

  const handleSwitch = () => {
    setIsUpdating(true)

    if (isPersonal) {
      const organizationId = form.getValues('organizationId')

      switchDocumentToOrganization({
        id: documentId,
        organizationId
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
            {isPersonal ? (
              organizationList.length > 0 ? (
                <Form {...form}>
                  <form
                    className='flex flex-col gap-2'
                    ref={formRef}
                    onSubmit={(e) => {
                      e.preventDefault()
                    }}
                  >
                    <FormField
                      control={form.control}
                      name='organizationId'
                      render={({ field }) => (
                        <FormItem className='gap-y-3'>
                          <FormLabel className='text-sm text-[#333]'>
                            Please Select An Organization
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              className='flex flex-col space-y-1 pl-2'
                            >
                              {organizationList.map((org) => (
                                <FormItem
                                  key={org.id}
                                  className='flex items-center space-x-2 space-y-0'
                                >
                                  <FormControl>
                                    <RadioGroupItem value={org.id} />
                                  </FormControl>
                                  <FormLabel className='font-normal'>
                                    {org.name}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              ) : (
                <span className='text-sm text-[#333]'>
                  No organization found
                </span>
              )
            ) : (
              <span className='text-sm text-[#333]'>
                This action will switch the document to personal
              </span>
            )}
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
