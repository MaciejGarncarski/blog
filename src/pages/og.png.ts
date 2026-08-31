import type { APIRoute } from "astro";
import { generateWebsiteOgImage } from "@/lib/og";

export const GET: APIRoute = async () => {
   const imageBuffer = await generateWebsiteOgImage();

   return new Response(imageBuffer, {
      headers: {
         "Content-Type": "image/png",
         "Cache-Control": "public, max-age=31536000, immutable",
      },
   });
};
