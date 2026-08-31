import type { APIContext, APIRoute } from "astro";
import { getJournals } from "@/lib/get-journals";
import { generateJournalOg } from "@/lib/og";

export const GET: APIRoute = async ({ props }: APIContext) => {
   const { post } = props as Props;

   const imageBuffer = await generateJournalOg({
      title: post.data.title,
      date: new Date(post.data.updatedDate || post.data.publishedDate),
   });

   return new Response(imageBuffer, {
      headers: {
         "Content-Type": "image/png",
         "Cache-Control": "public, max-age=31536000, immutable",
      },
   });
};

export async function getStaticPaths() {
   const journalPosts = await getJournals();

   return journalPosts.map((post) => {
      return {
         params: { slug: post.id },
         props: { post },
      };
   });
}

type Props = {
   post: Awaited<ReturnType<typeof getJournals>>[number];
};
