'use client'

import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
  AuthLoading
} from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ClerkProvider, useAuth, SignIn } from '@clerk/nextjs'
import { FullScreenLoader } from './full-screen-loader'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || '')

export const ConvexClientProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''}
    >
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}
      >
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className='flex flex-col items-center justify-center h-screen'>
            <SignIn routing='hash' />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullScreenLoader label='Auth Loading...' />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
