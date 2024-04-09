import { count } from "drizzle-orm";

export type Post = typeof tables.posts.$inferSelect;

export default defineEventHandler(async (event): Promise<any> => {
  // Query the Database
  try {
    const query = useDrizzle().select({ count: count() }).from(tables.posts);
    const nbr = await query;

    if (!nbr.at(0)) {
      throw createError({
        status: 404,
        message: "Posts not found",
      });
    }
    return await nbr.at(0);
  } catch (e) {
    console.log(e);
    throw createError({
      status: 500,
      message: "Database Error",
    });
  }
});
