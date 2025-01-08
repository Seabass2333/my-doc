'use server'

import { ConvexHttpClient } from 'convex/browser'
import { auth, clerkClient } from '@clerk/nextjs/server'

import { Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function getDocuments(ids: Id<'documents'>[]) {
  return await convex.query(api.documents.getByIds, { ids })
}

export async function getUsers() {
  const { sessionClaims } = await auth()
  const clerk = await clerkClient()

  // make sure to use the org_id from the sessionClaims
  const response = await clerk.users.getUserList({
    organizationId: sessionClaims?.org_id ? [sessionClaims.org_id] : undefined
  })

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ??
      user.primaryEmailAddress?.emailAddress ??
      'Unknown',
    avatar: user.imageUrl,
    color: ''
  }))

  return users
}
