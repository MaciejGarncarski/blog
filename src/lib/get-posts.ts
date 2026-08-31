import { getCollection } from "astro:content";
import { addReadingTime, sortTags } from "@/lib/utils";

export type PostEntry = Awaited<ReturnType<typeof getCollection>>[number];
export type PostWithReadingTime = PostEntry & { readingTime: number };

export async function getPosts() {
   const collection = await getCollection("blog", ({ data }) => data.public && !data.draft);
   return collection.map((entry) => ({ ...entry, data: sortTags(entry.data) })).map(addReadingTime);
}
