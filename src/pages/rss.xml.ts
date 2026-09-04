import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getPostsSorted } from "@/lib/get-posts-sorted";

export const GET: APIRoute = async (context) => {
   const posts = await getPostsSorted();

   return rss({
      title: "Blog - Maciej Garncarski",
      description: "Najnowsze wpisy z bloga.",
      site: context.site?.toString() || "https://maciejg.dev",
      items: posts.map((post) => ({
         title: post.data.title,
         categories: post.data.tags,
         description: post.data.description,
         pubDate: post.data.publishedDate,
         link: `/blog/${post.id}/`,
      })),
   });
};
