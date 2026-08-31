import type { RehypePlugins } from "@astrojs/markdown-remark";
import {
   transformerMetaHighlight,
   transformerNotationDiff,
   transformerNotationFocus,
} from "@shikijs/transformers";
import rehypePrettyCode from "rehype-pretty-code";
import { customAttributesTransformer } from "./attrubiute-transformer";
import type { RehypeNode } from "./types";
import { getNodeProperties } from "./types";

export const prettyCodePlugin: RehypePlugins[number] = [
   rehypePrettyCode,
   {
      transformers: [
         transformerMetaHighlight(),
         transformerNotationDiff(),
         transformerNotationFocus(),
         customAttributesTransformer,
      ],
      theme: "poimandres",
      onVisitLine(element: RehypeNode) {
         element.children?.forEach((child) => {
            if (child.type === "element") {
               const properties = getNodeProperties(child);
               properties["data-code-line"] = "";
            }
         });

         const properties = getNodeProperties(element);

         if (properties.className?.includes("focused")) {
            properties["data-focused"] = "";
         }

         if (properties.className?.includes("diff")) {
            if (properties.className.includes("add")) {
               properties["data-diff"] = "add";
            }

            if (properties.className.includes("remove")) {
               properties["data-diff"] = "remove";
            }
         }

         delete properties.className;
      },
      onVisitHighlightedLine(node: RehypeNode) {
         const properties = getNodeProperties(node);
         properties.className ??= [];
         properties.className.push("highlighted");
      },
      onVisitHighlightedChars(node: RehypeNode) {
         const properties = getNodeProperties(node);
         properties.className ??= [];
         properties.className.push("highlighted-chars");
      },
   },
];
