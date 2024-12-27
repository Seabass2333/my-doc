import { v, ConvexError } from 'convex/values'
import { paginationOptsValidator } from 'convex/server'

import { mutation, query } from './_generated/server'

// Create a new document
export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) {
      throw new Error('Unauthorized')
    }
    return await ctx.db.insert('documents', {
      title: args.title ?? 'Untitled',
      initialContent: args.initialContent ?? '',
      ownerId: user.subject,
    })
  }
})

// Get all documents
export const getDocuments = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db.query('documents').paginate(args.paginationOpts);
  }
})
