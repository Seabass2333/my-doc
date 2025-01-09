'use server'

import { clerkClient } from '@clerk/nextjs/server'

export async function getOrganizationList() {
  const clerk = await clerkClient()
  const response = await clerk.organizations.getOrganizationList()

  const data = response.data.map((org) => ({
    id: org.id,
    name: org.name,
    image: org.imageUrl
  }))

  return data
}
