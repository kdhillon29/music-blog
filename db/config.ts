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
export default defineDb({
  tables: { Subscribe, Author, Views },
});

// export const db = defineDb({
//   tables: { Subscribe },
// });
