import type { APIRoute } from "astro";

import { db, Subscribe, isDbError } from "astro:db";

export const GET: APIRoute = async (ctx) => {
  try {
    const subscribers = await db.select().from(Subscribe);
    return new Response(JSON.stringify({ subscribers }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    if (isDbError(e)) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
      });
    }
    return new Response("An unexpected error occurred", { status: 500 });
  }
};

export const POST: APIRoute = async (ctx) => {
  try {
    const formData = await ctx.request.formData();
    const email = formData.get("email") as string;
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }
    const subscriber = await db.insert(Subscribe).values({ email }).returning();
    return ctx.redirect("/newsletter/success", 307);
    // return new Response(JSON.stringify({ subscriber }), {
    //   status: 201,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  } catch (error) {
    if (isDbError(error)) {
      if (error?.code === "SQLite_Constraint".toUpperCase()) {
        return ctx.redirect(
          "/newsletter/failure?message=Email must be unique",
          307
        );
      }
      return ctx.redirect(
        `/newsletter/failure?message= server error:${error?.code}`,
        307
      );
    }
    return ctx.redirect(
      "/newsletter/failure?message=Email subscribe failed",
      307
    );
  }
};
