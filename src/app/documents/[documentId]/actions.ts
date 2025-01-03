'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

export async function getUsers() {
  const { sessionClaims } = await auth()
  const clerk = await clerkClient()

  const response = await clerk.users.getUserList({
    organizationId: sessionClaims?.org_id ? [sessionClaims.org_id] : undefined
  })

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ??
      user.primaryEmailAddress?.emailAddress ??
      'Unknown',
    avatar: user.imageUrl
  }))

  return users
}
