import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
  }).index('by_email', ['email']),

  tours: defineTable({
    user_id: v.string(),
    title: v.string(),
    description: v.string(),
    status: v.union(v.literal('active'), v.literal('paused')),
    createdAt: v.number(),
  })
    .index('by_user', ['user_id'])
    .index('by_status', ['status']),

  steps: defineTable({
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

    createdAt: v.number(),
  }).index('by_tour', ['tour_id']),
});
