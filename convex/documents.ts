import { v } from 'convex/values'
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
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) {
      throw new Error('Unauthorized')
    }

    const { search, paginationOpts } = args

    const organizationId = (user.organization_id ?? undefined) as string | undefined
    if (search && organizationId) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_context', (q) => q.search('title', search).eq('ownerId', user.subject))
        .paginate(paginationOpts)
    }

    if (search) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_context', (q) => q.search('title', search).eq('ownerId', user.subject))
        .paginate(paginationOpts)
    }
    return await ctx.db
      .query('documents')
      .withIndex('by_owner_id', (q) => q.eq('ownerId', user.subject))
      .paginate(paginationOpts)
  }
})

export const removeById = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()

    if (!user) {
      throw new Error('Unauthorized')
    }

    const document = await ctx.db.get(args.id)
    if (!document) {
      throw new Error('Document not found')
    }

    if (document.ownerId !== user.subject) {
      throw new Error('Unauthorized')
    }

    return await ctx.db.delete(args.id)
  }
})

export const updateById = mutation({
  args: { id: v.id('documents'), title: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) {
      throw new Error('Unauthorized')
    }

    const document = await ctx.db.get(args.id)
    if (!document) {
      throw new Error('Document not found')
    }

    if (document.ownerId !== user.subject) {
      throw new Error('Unauthorized')
    }

    return await ctx.db.patch(args.id, {
      title: args.title,
    })
  }
})