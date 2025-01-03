'use client'

import { ReactNode, useEffect, useMemo, useState } from 'react'
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from '@liveblocks/react/suspense'
import { useParams } from 'next/navigation'
import { FullScreenLoader } from '@/components/full-screen-loader'

import { getUsers } from './actions'
import { toast } from 'sonner'

type User = {
  id: string
  name: string
  email: string
  avatar: string
}

export function Room({ children }: { children: ReactNode }) {
  const { documentId } = useParams()

  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const users = await getUsers()
        setUsers(users)
      } catch (error) {
        console.error('Error fetching users:', error)
        toast.error('Error fetching users')
      }
    },
    []
  )

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={'/api/liveblocks-auth'}
      resolveUsers={({ userIds }) =>
        userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        )
      }
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          )
        }

        return filteredUsers.map((user) => user.id)
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={documentId as string}>
        <ClientSideSuspense
          fallback={<FullScreenLoader label='Room is loading…' />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
