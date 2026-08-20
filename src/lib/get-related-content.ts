import { projectsDict } from "@/data/projects";
import { getPosts } from "@/lib/get-posts";

let cachedPosts: Map<string, Awaited<ReturnType<typeof getPosts>>[number]> | null = null;

async function getPostsDict() {
   if (!cachedPosts) {
      const posts = await getPosts();
      cachedPosts = new Map(posts.map((post) => [post.id, post]));
   }
   return cachedPosts;
}

export async function getRelatedPosts(ids: string[]) {
   const dict = await getPostsDict();
   return ids.map((id) => {
      const post = dict.get(id);
      if (!post) {
         throw new Error(`Post with id "${id}" not found.`);
      }
      return post;
   });
}

export function getRelatedProjects(ids: string[]) {
   return ids
      .map((id) => {
         const project = projectsDict[id];
         return project || null;
      })
      .filter(Boolean) as NonNullable<(typeof projectsDict)[string]>[];
}
