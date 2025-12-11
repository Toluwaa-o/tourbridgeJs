import { v } from 'convex/values';
import { query, mutation } from './_generated/server';
import { requireAuth, checkOwnership } from './checkPermissons';

export const getStepsByTour = query({
  args: { tour_id: v.id('tours') },
  handler: async (ctx, args) => {
    requireAuth(ctx);

    return await ctx.db
      .query('steps')
      .withIndex('by_tour', (q) => q.eq('tour_id', args.tour_id))
      .collect();
  },
});

export const getByTourId = query({
  args: { tour_id: v.id('tours') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('steps')
      .withIndex('by_tour', (q) => q.eq('tour_id', args.tour_id))
      .collect();
  },
});

export const createStep = mutation({
  args: {
    tour_id: v.id('tours'),
    title: v.string(),
    description: v.string(),
    selector: v.string(),
    button_text: v.optional(v.string()),
    bg_color: v.optional(v.string()),
    text_color: v.optional(v.string()),
    highlight_color: v.optional(v.string()),
    started: v.number(),
    skipped: v.number(),
    completed: v.number(),
  },

  handler: async (ctx, args) => {
    const tour = await ctx.db.get(args.tour_id);
    if (!tour) throw new Error('Tour not found');

    checkOwnership(ctx, tour.user_id);

    return await ctx.db.insert('steps', {
      ...args,
    });
  },
});

export const updateStep = mutation({
  args: {
    id: v.id('steps'),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    selector: v.optional(v.string()),
    button_text: v.optional(v.string()),
    bg_color: v.optional(v.string()),
    text_color: v.optional(v.string()),
    highlight_color: v.optional(v.string()),
    started: v.optional(v.number()),
    skipped: v.optional(v.number()),
    completed: v.optional(v.number()),
  },

  handler: async (ctx, args) => {
    const step = await ctx.db.get(args.id);
    if (!step) throw new Error('Step not found');

    const tour = await ctx.db.get(step.tour_id);
    if (!tour) throw new Error('Parent tour not found');

    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const deleteStep = mutation({
  args: { id: v.id('steps') },
  handler: async (ctx, args) => {
    const step = await ctx.db.get(args.id);
    if (!step) throw new Error('Step not found');

    const tour = await ctx.db.get(step.tour_id);
    if (!tour) throw new Error('Parent tour not found');

    checkOwnership(ctx, tour.user_id);

    return await ctx.db.delete(args.id);
  },
});

export const deleteStepsByTour = mutation({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {

    const tour = await ctx.db.get(args.tourId);
    if (!tour) throw new Error("Tour not found");

    checkOwnership(ctx, tour.user_id);

    const steps = await ctx.db
      .query("steps")
      .withIndex("by_tour", q => q.eq("tour_id", args.tourId))
      .collect();

    for (const step of steps) {
      await ctx.db.delete(step._id);
    }

    return { success: true, deleted: steps.length };
  },
});

type StepAction = 'started' | 'completed' | 'skipped';

export const updateStats = mutation({
  args: { stepId: v.id('steps'), action: v.string() },
  handler: async (ctx, { stepId, action }) => {
    const step = await ctx.db.get(stepId);
    if (!step) throw new Error('Step not found');

    if (!['started', 'completed', 'skipped'].includes(action)) {
      throw new Error('Invalid action');
    }
    const key = action as StepAction;

    const updatedValue = (step[key] || 0) + 1;

    return await ctx.db.patch(stepId, { [key]: updatedValue });
  },
});