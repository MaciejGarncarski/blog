import { useEffect } from "react";
import { ResultItem } from "@/components/blog/blog-search-result-item";
import { useBlogSearch } from "@/hooks/use-blog-search";
import { useBlogSearchResults } from "@/hooks/use-blog-search-results";
import { getSearchQueryFromUrl, type SearchItem } from "@/lib/blog-search-utils";

type Props = {
   items: SearchItem[];
};

export function BlogSearch({ items }: Props) {
   const search = useBlogSearch();
   const results = useBlogSearchResults({ items });

   useEffect(() => {
      const urlQuery = getSearchQueryFromUrl();
      if (urlQuery) {
         results.setQuery(urlQuery);
         results.setDebouncedQuery(urlQuery);
         search.openModal();
      }
   }, [results.setDebouncedQuery, results.setQuery, search.openModal]);

   return (
      <div data-blog-search>
         <button
            type="button"
            ref={search.triggerRef}
            onClick={search.openModal}
            aria-haspopup="dialog"
            aria-expanded={search.state !== "closed"}
            aria-controls="blog-search-modal"
            className="cursor-pointer border-border bg-background-secondary/60 text-foreground-secondary shadow-accent-sm hover:border-accent/30 hover:text-foreground focus-visible:ring-accent/30 inline-flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2 text-left transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none md:px-4"
         >
            <span className="inline-flex min-w-0 items-center gap-2.5">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4.5 w-4.5 shrink-0"
                  aria-hidden="true"
               >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
               </svg>
               <span className="truncate text-sm md:text-base">
                  Szukaj artykułów po tytule, opisie i tagach...
               </span>
            </span>
            <span className="hidden md:inline text-foreground-secondary border-border bg-background/20 rounded-xl border px-2.5 py-1.5 text-xs">
               Ctrl/Cmd + K
            </span>
         </button>

         {search.state !== "closed" && (
            <button
               type="button"
               data-search-backdrop
               onClick={search.closeModal}
               aria-label="Zamknij wyszukiwarkę"
               className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 z-190 cursor-default ${
                  search.showResultClasses ? "opacity-100" : "opacity-0 pointer-events-none"
               }`}
            />
         )}

         {search.state !== "closed" && (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <backdrop>
            <div
               id="blog-search-modal"
               data-search-dialog
               role="dialog"
               aria-modal="true"
               aria-labelledby="blog-search-title"
               onClick={(e) => {
                  if (e.target === e.currentTarget) search.closeModal();
               }}
               className={`fixed z-200 inset-0 flex items-start justify-center p-3 pt-[12vh] transition-opacity duration-200 md:p-6 md:pt-[15vh] ${
                  search.showResultClasses ? "opacity-100" : "opacity-0 pointer-events-none"
               }`}
            >
               <div
                  data-search-panel
                  className={`border-border bg-background shadow-accent w-full max-w-3xl overflow-hidden rounded-2xl border transition-all duration-200 ease-out ${
                     search.showResultClasses
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-3 scale-[0.985] opacity-0"
                  }`}
               >
                  <div className="border-border/60 relative flex items-center gap-3 border-b px-3.5 py-3 md:px-4.5">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-foreground-secondary h-4.5 w-4.5 shrink-0"
                        aria-hidden="true"
                     >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                     </svg>

                     <div className="min-w-0 flex-1">
                        <h2 id="blog-search-title" className="text-sm font-semibold md:text-base">
                           Wyszukaj artykuł
                        </h2>
                     </div>

                     <button
                        type="button"
                        onClick={search.closeModal}
                        className="cursor-pointer border-border bg-background-secondary text-foreground-secondary hover:text-foreground focus-visible:ring-accent/30 inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                        aria-label="Zamknij wyszukiwarkę"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           className="h-4 w-4"
                           aria-hidden="true"
                        >
                           <line x1="18" y1="6" x2="6" y2="18" />
                           <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                     </button>
                  </div>

                  <div className="border-border/70 border-b px-3.5 py-3 md:px-4.5 md:py-3.5">
                     <input
                        ref={search.inputRef}
                        type="text"
                        value={results.query}
                        onChange={results.handleQueryChange}
                        onKeyDown={results.handleKeyDown}
                        className="border-border bg-background-secondary text-foreground placeholder:text-foreground-secondary/80 focus-visible:ring-accent/30 w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 md:text-ui"
                        placeholder="Szukaj po tytule, opisie i tagach"
                        autoComplete="off"
                        spellCheck={false}
                     />
                  </div>

                  <div className="max-h-[55vh] overflow-y-auto px-3.5 py-3 md:px-4.5">
                     <p className="text-foreground-secondary mb-2 text-xs md:text-sm">
                        {results.normalizedQuery
                           ? `Wyniki: ${results.rankedResults.length} z ${results.indexedItems.length}`
                           : `Wszystkie wpisy: ${results.indexedItems.length}`}
                     </p>

                     {results.rankedResults.length > 0 ? (
                        <ul ref={results.resultsListRef} className="grid gap-2.5 md:gap-3">
                           {results.rankedResults.map((result) => (
                              <ResultItem
                                 key={result.index}
                                 result={result}
                                 normalizedQuery={results.normalizedQuery}
                              />
                           ))}
                        </ul>
                     ) : (
                        <p className="text-foreground-secondary rounded-xl border border-dashed border-accent/25 bg-accent/5 p-4 text-sm">
                           Brak wyników. Spróbuj innej frazy.
                        </p>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
