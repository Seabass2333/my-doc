'use client'

import { BellIcon } from 'lucide-react'
import { ClientSideSuspense } from '@liveblocks/react'
import { useInboxNotifications } from '@liveblocks/react/suspense'
import { InboxNotification, InboxNotificationList } from '@liveblocks/react-ui'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

export const Inbox = () => {
  return (
    <ClientSideSuspense
      fallback={
        <>
          <Button
            variant='ghost'
            size='icon'
            className='relative'
          >
            <BellIcon className='size-5' />
          </Button>
          <Separator
            orientation='vertical'
            className='h-6'
          />
        </>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  )
}

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='relative'
          >
            <BellIcon className='size-5' />
            {inboxNotifications.length > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-500 rounded-full size-4 text-xs text-white flex items-center justify-center'>
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-auto'
        >
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((inboxNotification) => (
                <InboxNotification
                  key={inboxNotification.id}
                  inboxNotification={inboxNotification}
                />
              ))}
            </InboxNotificationList>
          ) : (
            <div className='p-2 w-[400px] text-center text-sm text-muted-foreground'>
              <div className='flex items-center justify-center'>
                <div className='size-10 rounded-full bg-muted animate-pulse'>
                  <BellIcon className='size-5' />
                </div>
              </div>
              <p className='mt-2'>No notifications yet</p>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator
        orientation='vertical'
        className='h-6'
      />
    </>
  )
}
