import { db, Subscribe, Author } from "astro:db";

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
}
