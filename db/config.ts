import { column, defineDb, defineTable } from "astro:db";

// https://astro.build/db/config

const Subscribe = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text({ unique: true }),
  },
  indexes: [{ on: ["email"], unique: true }],
});

const Author = defineTable({
  columns: {
    firstName: column.text(),
    lastName: column.text(),
  },
});
const Views = defineTable({
  columns: {
    slug: column.text({ primaryKey: true }),
    count: column.number({
      default: 1,
    }),
  },
});
const Comment = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    postSlug: column.text(),
    name: column.text(),
    email: column.text(),
    message: column.text(),
    createdAt: column.date({ default: new Date() }),
  },
});
export default defineDb({
  tables: { Subscribe, Author, Views, Comment },
});

// export const db = defineDb({
//   tables: { Subscribe },
// });
