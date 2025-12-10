import { v } from 'convex/values';
import { query, mutation } from './_generated/server';
import { requireAuth, checkOwnership } from './checkPermissons';

export const getAllTours = query({
  args: {},
  handler: async (ctx) => {
    requireAuth(ctx);
    return ctx.db.query('tours').collect();
  },
});

export const getTourById = query({
  args: { id: v.id('tours') },
  handler: async (ctx, args) => {
    requireAuth(ctx);
    return await ctx.db.get(args.id);
  },
});

export const getToursByUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await requireAuth(ctx);

    return await ctx.db
      .query('tours')
      .withIndex('by_user', (q) => q.eq('user_id', identity.subject))
      .collect();
  },
});

export const createTour = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    status: v.union(v.literal('active'), v.literal('paused')),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    return await ctx.db.insert('tours', {
      ...args,
      user_id: identity.subject,
      createdAt: Date.now(),
    });
  },
});

export const updateTour = mutation({
  args: {
    id: v.id('tours'),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(v.union(v.literal('active'), v.literal('paused'))),
  },
  handler: async (ctx, args) => {
    const tour = await ctx.db.get(args.id);
    if (!tour) throw new Error('Tour not found');

    checkOwnership(ctx, tour.user_id);

    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const deleteTour = mutation({
  args: { id: v.id('tours') },
  handler: async (ctx, args) => {
    const tour = await ctx.db.get(args.id);
    if (!tour) throw new Error('Tour not found');

    checkOwnership(ctx, tour.user_id);

    return await ctx.db.delete(args.id);
  },
});
