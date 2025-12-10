import { QueryCtx, MutationCtx } from './_generated/server';

export async function requireAuth(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error('Not authenticated');
  }
  return identity;
}

export async function checkOwnership(
  ctx: QueryCtx | MutationCtx,
  resourceOwnerId: string
) {
  const identity = await requireAuth(ctx);
  if (identity?.subject !== resourceOwnerId) {
    throw new Error('Not authorized');
  }
}
