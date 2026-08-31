import type { RehypePlugins } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { RehypeNode } from "./types";

const headingAnchorIcon: RehypeNode[] = [
   {
      type: "element",
      tagName: "path",
      properties: {
         d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
      },
      children: [],
   },
   {
      type: "element",
      tagName: "path",
      properties: {
         d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
      },
      children: [],
   },
];

export const autolinkHeadingsPlugin: RehypePlugins[number] = [
   rehypeAutolinkHeadings,
   {
      behavior: "wrap",
      content: {
         type: "element",
         tagName: "span",
         properties: {
            "data-anchor-hash": "",
         },
         children: [
            {
               type: "element",
               tagName: "svg",
               properties: {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: ["lucide", "lucide-link-icon", "lucide-link"],
                  "aria-hidden": "true",
               },
               children: headingAnchorIcon,
            },
         ],
      },
      headingProperties: {
         "data-anchor": "",
      },
      properties: {
         "data-anchor-link": "",
      },
   },
];
