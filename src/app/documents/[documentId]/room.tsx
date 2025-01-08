'use client'

import { ReactNode, useEffect, useMemo, useState } from 'react'
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from '@liveblocks/react/suspense'
import { useParams } from 'next/navigation'
import { FullScreenLoader } from '@/components/full-screen-loader'

import { getDocuments, getUsers } from './actions'
import { toast } from 'sonner'
import { Id } from '../../../../convex/_generated/dataModel'

// constants
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/constants/consts'

// types
type User = {
  id: string
  name: string
  avatar: string
  color: string
}

export function Room({ children }: { children: ReactNode }) {
  const { documentId } = useParams()

  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const users = await getUsers()
        setUsers(users as User[])
      } catch {
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
      authEndpoint={async () => {
        const endpoint = '/api/liveblocks-auth'

        const response = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify({ room: documentId })
        })

        const data = await response.json()

        return data
      }}
      resolveUsers={({ userIds }) =>
        userIds.map((userId) => {
          const user = users.find((user) => user.id === userId)
          if (!user) return undefined
          return {
            name: user.name,
            avatar: user.avatar,
            color: 'green'
          }
        })
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
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<'documents'>[])
        return documents.map((document) => ({
          id: document.id,
          name: document.name
        }))
      }}
    >
      <RoomProvider
        id={documentId as string}
        initialStorage={{
          leftMargin: LEFT_MARGIN_DEFAULT,
          rightMargin: RIGHT_MARGIN_DEFAULT
        }}
      >
        <ClientSideSuspense
          fallback={<FullScreenLoader label='Room is loading…' />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
