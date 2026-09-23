import type { ReactNode } from "react";
import { useMemo } from "react";
import { normalizeValue, type RankedResult } from "@/lib/blog-search-utils";

function highlightReact(text: string, normalizedQuery: string): ReactNode {
   if (!normalizedQuery) return text;

   const normalizedText = normalizeValue(text);
   const parts: ReactNode[] = [];
   let cursor = 0;
   let index = normalizedText.indexOf(normalizedQuery);

   while (index !== -1) {
      if (cursor < index) {
         parts.push(text.slice(cursor, index));
      }
      parts.push(
         <mark key={`${index}-${cursor}`} className="bg-amber-400 rounded-sm">
            {text.slice(index, index + normalizedQuery.length)}
         </mark>,
      );
      cursor = index + normalizedQuery.length;
      index = normalizedText.indexOf(normalizedQuery, cursor);
   }

   if (cursor < text.length) {
      parts.push(text.slice(cursor));
   }

   return parts;
}

type ResultItemProps = {
   result: RankedResult;
   normalizedQuery: string;
};

export function ResultItem({ result, normalizedQuery }: ResultItemProps) {
   const tagMatchCache = useMemo(() => {
      if (!normalizedQuery) return new Map<string, boolean>();
      const cache = new Map<string, boolean>();
      for (const tag of result.tags) {
         const normalizedTag = normalizeValue(tag);
         const isMatch =
            `#${normalizedTag}`.includes(normalizedQuery) ||
            normalizedTag.includes(normalizedQuery);
         cache.set(tag, isMatch);
      }
      return cache;
   }, [result.tags, normalizedQuery]);

   return (
      <li data-search-item>
         <a
            href={`/blog/${result.id}`}
            data-astro-reload
            className="border-border bg-background-secondary/45 hover:bg-background-secondary/75 focus-visible:ring-accent/30 group grid grid-cols-1 gap-3 rounded-xl border px-3 py-3 md:p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
         >
            <div className="min-w-0">
               <p className="text-foreground line-clamp-1 text-sm font-semibold md:text-[0.95rem]">
                  {highlightReact(result.title, normalizedQuery)}
               </p>
               <p className="text-foreground-secondary text-pretty pr-2 mt-1 line-clamp-2 text-xs leading-relaxed md:text-sm">
                  {result.bodyPreview
                     ? highlightReact(result.bodyPreview.snippet, result.bodyPreview.matchTerm)
                     : highlightReact(result.description, normalizedQuery)}
               </p>
               <div className="mt-2 flex flex-wrap gap-1.5">
                  {result.tags.map((tag) => {
                     const isMatch = tagMatchCache.get(tag) ?? false;
                     return (
                        <span
                           key={tag}
                           data-search-tag
                           data-tag-value={tag}
                           className={`inline-flex items-center justify-center rounded-full font-medium motion-reduce:transition-none transition-colors duration-300 whitespace-nowrap px-2 py-0.5 text-[11px] border border-border ${
                              isMatch
                                 ? "bg-accent/30 text-foreground"
                                 : "bg-accent/9 text-foreground-secondary"
                           }`}
                        >
                           # {tag}
                        </span>
                     );
                  })}
               </div>
            </div>
         </a>
      </li>
   );
}
