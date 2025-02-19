import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, Comment, isDbError } from "astro:db";
import { isbot } from "isbot";
import { ZodError } from "astro/zod";

export const server = {
  addComment: defineAction({
    accept: "form",
    input: z.object({
      postSlug: z.string(),
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Valid email is required"),
      message: z.string().min(1, "Comment cannot be empty"),
    }),
    handler: async ({ postSlug, name, email, message }, context) => {
      // console.log(postSlug, name, email, message);
      const { request } = context;

      if (isbot(request.headers.get("user-agent"))) {
        throw new ActionError({
          code: "FORBIDDEN",
          message: "This endpoint is not available for bots",
        });
      }
      try {
        const comment = await db
          .insert(Comment)
          .values({
            postSlug,
            name,
            email,
            message,
            createdAt: new Date(),
          })
          .returning();

        return comment[0];
      } catch (e) {
        if (isDbError(e)) {
          throw new ActionError({
            code: e.code as "INTERNAL_SERVER_ERROR",
            message: e.message,
          });
        }
        if (e instanceof ZodError) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: e.message,
            // stack:{name, email, message}
          });
        }
        throw e;
      }
    },
  }),
};
