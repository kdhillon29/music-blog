import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, Comment, Contact } from "astro:db";

export const server = {
  addComment: defineAction({
    accept: "form",
    input: z.object({
      postSlug: z.string(),
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Valid email is required"),
      message: z.string().min(1, "Comment cannot be empty"),
    }),
    handler: async ({ postSlug, name, email, message }) => {
      console.log("postSlug", postSlug);
      console.log("name", name);
      console.log(postSlug, name, email, message);
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
    },
  }),
  contact: defineAction({
    accept: "form",
    input: z.object({
      first_name: z.string().max(20, {
        message: "First name must be 20 characters or less.",
      }),
      last_name: z.string().max(20, {
        message: "Last name must be 20 characters or less.",
      }),
      email_address: z.string().email(),
      query_type: z.enum(["general-enquiry", "support-request"]),
      message: z.string(),
      consent: z.boolean(),
    }),
    handler: async (data) => {
      await db.insert(Contact).values(data);
      return { success: true };
    },
  }),
};
