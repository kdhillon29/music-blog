import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  console.log("context", context.originPathname);
  if (context.originPathname === "/blog") {
    console.log("redirecting to /blog/1");
    return context.redirect("/blog/1");
  }
  return next();
});

export const onResponse = defineMiddleware((context, next) => {
  console.log("context", context.originPathname);
  return next();
});
