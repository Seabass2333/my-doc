import { query } from "./_generated/server";

export const getDocuments = query(async ({ db }) => {
  return await db.query("documents").collect();
});

