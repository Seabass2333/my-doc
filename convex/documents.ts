import { ConvexError, v } from 'convex/values'
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
      throw new ConvexError('Unauthorized')
    }

    const organizationId = (user.organization_id ?? undefined) as string | undefined

    return await ctx.db.insert('documents', {
      title: args.title ?? 'Untitled',
      initialContent: args.initialContent ?? '',
      ownerId: user.subject,
      organizationId,
    })
  }
})

// Get all documents
export const getDocuments = query({
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) {
      throw new ConvexError('Unauthorized')
    }

    const { search, paginationOpts } = args

    const organizationId = (user.organization_id ?? undefined) as string | undefined

    // Search documents by title in the organization
    if (search && organizationId) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_context', (q) => q.search('title', search).eq('organizationId', organizationId))
        .paginate(paginationOpts)
    }

    // Search documents by title in the user's personal space
    if (search) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_context', (q) => q.search('title', search).eq('ownerId', user.subject))
        .paginate(paginationOpts)
    }

    // Get all documents in the organization
    if (organizationId) {
      return await ctx.db
        .query('documents')
        .withIndex('by_organization_id', (q) => q.eq('organizationId', organizationId))
        .paginate(paginationOpts)
    }

    // Get all documents in the user's personal space
    return await ctx.db
      .query('documents')
      .withIndex('by_owner_id', (q) => q.eq('ownerId', user.subject))
      .paginate(paginationOpts)
  }
})

// Get a document by id
export const getById = query({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  }
})

// Remove a document by id
export const removeById = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()

    if (!user) {
      throw new ConvexError('Unauthorized')
    }

    const organizationId = (user.organization_id ?? undefined) as string | undefined
    const organizationRole = (user.organization_role ?? undefined) as string | undefined

    const document = await ctx.db.get(args.id)
    if (!document) {
      throw new ConvexError('Document not found')
    }

    if (document.ownerId !== user.subject && document.organizationId && document.organizationId !== organizationId && organizationRole !== 'admin') {
      throw new ConvexError('Unauthorized')
    }

    return await ctx.db.delete(args.id)
  }
})

// Update a document by id
export const updateById = mutation({
  args: { id: v.id('documents'), title: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) {
      throw new ConvexError('Unauthorized')
    }

    const organizationId = (user.organization_id ?? undefined) as string | undefined
    const organizationRole = (user.organization_role ?? undefined) as string | undefined

    const document = await ctx.db.get(args.id)
    if (!document) {
      throw new ConvexError('Document not found')
    }

    if (document.ownerId !== user.subject && document.organizationId && document.organizationId !== organizationId && organizationRole !== 'admin') {
      throw new ConvexError('Unauthorized')
    }

    return await ctx.db.patch(args.id, {
      title: args.title,
    })
  }
})
