import { db, Subscribe, Author, Comment } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  // TODO

  await db.insert(Author).values([
    { firstName: "Kan", lastName: "Dhillon" },
    { firstName: "Mina", lastName: "Dhillon" },
  ]);
  await db.insert(Subscribe).values([
    { id: 1, email: "Kan@gmail.com" },
    { id: 2, email: "Mina@gmail.com" },
  ]);

  await db.insert(Comment).values([
    {
      postSlug: "live-music-is-crucial",
      name: "Jamie",
      email: "jamie@turso.tech",
      message: "Great post!",
      createdAt: new Date(),
    },
    {
      postSlug: "live-music-is-crucial",
      name: "Tom",
      email: "tomie@astro.tech",
      message: "Another great post!",
      createdAt: new Date(),
    },
  ]);
}
