import { useEffect, useRef, useState } from "react";
import type { PostWithReadingTime } from "@/lib/get-posts";

type RelatedProject = {
   id: string;
   title: string;
};

type Props = {
   relatedPostData?: PostWithReadingTime[];
   relatedProjectData?: RelatedProject[];
};

type TocHeading = {
   id: string;
   text: string;
   level: "h2" | "h3";
   h2Index?: number;
};

const SCROLL_OFFSET = 130;

function scanHeadings(): TocHeading[] {
   const content = document.querySelector<HTMLElement>("[data-blog]");
   if (!content) return [];

   const elements = Array.from(content.querySelectorAll<HTMLElement>("h2[id], h3[id]"));
   if (elements.length < 2) return [];

   let h2Count = 0;
   const result: TocHeading[] = [];

   for (const el of elements) {
      const id = el.id;
      const isH2 = el.tagName === "H2";

      const clone = el.cloneNode(true) as HTMLElement;
      clone.querySelectorAll("[data-anchor-hash]").forEach((node) => {
         node.remove();
      });
      const text = clone.textContent?.replace(/\s+/g, " ").trim() || "";

      if (!id || !text) continue;
      if (isH2) h2Count++;

      result.push({
         id,
         text,
         level: isH2 ? "h2" : "h3",
         h2Index: isH2 ? h2Count : undefined,
      });
   }

   return result;
}

export function BlogAside({ relatedPostData = [], relatedProjectData = [] }: Props) {
   const [headings, setHeadings] = useState<TocHeading[]>([]);
   const [activeId, setActiveId] = useState("");
   const asideRef = useRef<HTMLElement>(null);
   const listRef = useRef<HTMLUListElement>(null);

   useEffect(() => {
      let cancelled = false;

      const init = () => {
         const result = scanHeadings();
         if (cancelled) return;

         setHeadings(result);

         const aside = asideRef.current;
         if (!aside) return;
         if (result.length < 2) {
            aside.classList.add("!hidden");
         } else {
            aside.classList.remove("!hidden");
         }
      };

      init();
      document.addEventListener("astro:after-swap", init);
      return () => {
         cancelled = true;
         document.removeEventListener("astro:after-swap", init);
      };
   }, []);

   useEffect(() => {
      if (headings.length === 0) return;

      const content = document.querySelector<HTMLElement>("[data-blog]");
      if (!content) return;

      const elements = headings
         .map((h) => content.querySelector<HTMLElement>(`#${CSS.escape(h.id)}`))
         .filter(Boolean) as HTMLElement[];

      const headingOrder = headings.map((h) => h.id);
      const visible = new Set<string>();

      const getClosestByScrollPosition = () => {
         let candidate = headingOrder[0] ?? "";
         for (const el of elements) {
            if (el.getBoundingClientRect().top <= SCROLL_OFFSET) {
               candidate = el.id;
               continue;
            }
            break;
         }
         return candidate;
      };

      const getActiveFromVisible = () => {
         if (visible.size === 0) return getClosestByScrollPosition();
         let candidate = headingOrder[0] ?? "";
         for (const id of headingOrder) {
            if (visible.has(id)) candidate = id;
         }
         return candidate;
      };

      const observer = new IntersectionObserver(
         (entries) => {
            for (const entry of entries) {
               const id = entry.target.id;
               if (!id) continue;
               if (entry.isIntersecting) visible.add(id);
               else visible.delete(id);
            }
            setActiveId((prev) => {
               const next = getActiveFromVisible();
               return next && next !== prev ? next : prev;
            });
         },
         {
            root: null,
            rootMargin: "-130px 0px -65% 0px",
            threshold: 0,
         },
      );

      for (const el of elements) observer.observe(el);

      setActiveId(window.location.hash?.slice(1) || getClosestByScrollPosition());

      return () => observer.disconnect();
   }, [headings]);

   useEffect(() => {
      if (!activeId || !listRef.current) return;

      const link = listRef.current.querySelector<HTMLAnchorElement>(
         `[data-toc-link="${CSS.escape(activeId)}"]`,
      );
      link?.scrollIntoView({ block: "nearest" });
   }, [activeId]);

   const hasRelated = relatedPostData.length > 0 || relatedProjectData.length > 0;

   return (
      <aside
         ref={asideRef}
         className="hidden lg:block absolute top-0 left-full ml-12 xl:ml-26 2xl:ml-29 mt-7 h-full w-[clamp(4rem,15vw,13rem)]"
         data-toc-aside
      >
         <div className="sticky top-30 flex flex-col gap-12 max-h-[calc(100vh-9rem)] overflow-y-auto pr-1 ">
            <nav className="backdrop-blur-xs" data-toc-nav aria-label="Spis treści">
               <div className="relative mb-3 flex items-center gap-2">
                  <span className="text-foreground-secondary text-[0.65rem] font-semibold uppercase tracking-[0.12em]">
                     Na tej stronie
                  </span>
                  <div className="h-px flex-1 bg-linear-to-r from-accent/20 to-transparent" />
               </div>

               <ul ref={listRef} className="flex flex-col gap-0.5 border-l border-accent/12 pl-2">
                  {headings.map((h) => {
                     const isActive = activeId === h.id;
                     return (
                        <li key={h.id}>
                           <a
                              href={`#${h.id}`}
                              title={h.text}
                              data-toc-link={h.id}
                              aria-current={isActive ? "location" : "false"}
                              className={`flex items-baseline gap-1.5 rounded-md px-2.5 py-1 text-xs leading-4 font-normal transition-all duration-200 hover:bg-accent/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 ${isActive ? "text-accent font-medium" : "text-foreground-secondary/85"}${h.level === "h3" ? " ml-2.5" : ""}`}
                           >
                              {h.h2Index != null && (
                                 <span className="text-[0.6rem] text-foreground-secondary/40 tabular-nums shrink-0">
                                    {String(h.h2Index).padStart(2, "0")}
                                 </span>
                              )}
                              <span className={`wrap-break-word text-pretty ${h.level === "h3" ? "line-clamp-1" : ""}`}>{h.text}</span>
                           </a>
                        </li>
                     );
                  })}
               </ul>
            </nav>

            {hasRelated && (
               <div className="flex flex-col gap-8">
                  {relatedPostData.length > 0 && (
                     <div>
                        <div className="relative mb-3 flex items-center gap-2">
                           <span className="text-foreground-secondary/70 text-[0.6rem] font-semibold uppercase tracking-[0.12em]">
                              Powiązane wpisy
                           </span>
                           <div className="h-px flex-1 bg-linear-to-r from-accent/15 to-transparent" />
                        </div>
                        <ul className="flex flex-col gap-0.5">
                           {relatedPostData.map((post) => (
                              <li key={post.id}>
                                 <a
                                    href={`/blog/${post.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-1.5 wrap-break-word text-pretty rounded-md px-2 py-1 text-xs leading-4 font-normal text-foreground-secondary/70 transition-colors duration-200 hover:bg-accent/5 hover:text-foreground focus-visible:bg-accent/5 focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50"
                                 >
                                    <span className="flex-1">{post.data.title}</span>
                                    <svg
                                       aria-hidden="true"
                                       className="mt-0.5 h-2.5 w-2.5 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-60"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       stroke="currentColor"
                                       strokeWidth={2}
                                    >
                                       <path d="M7 17L17 7M7 7h10v10" />
                                    </svg>
                                 </a>
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}

                  {relatedProjectData.length > 0 && (
                     <div>
                        <div className="relative mb-3 flex items-center gap-2">
                           <span className="text-foreground-secondary/70 text-[0.6rem] font-semibold uppercase tracking-[0.12em]">
                              Powiązane projekty
                           </span>
                           <div className="h-px flex-1 bg-linear-to-r from-accent/15 to-transparent" />
                        </div>
                        <ul className="flex flex-col gap-0.5">
                           {relatedProjectData.map((project) => (
                              <li key={project.id}>
                                 <a
                                    href={`/projekty/${project.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-1.5 wrap-break-word text-pretty rounded-md px-2 py-1 text-xs leading-4 font-normal text-foreground-secondary/70 transition-colors duration-200 hover:bg-accent/5 hover:text-foreground focus-visible:bg-accent/5 focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50"
                                 >
                                    <span className="flex-1">{project.title}</span>
                                    <svg
                                       aria-hidden="true"
                                       className="mt-0.5 h-2.5 w-2.5 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-60"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       stroke="currentColor"
                                       strokeWidth={2}
                                    >
                                       <path d="M7 17L17 7M7 7h10v10" />
                                    </svg>
                                 </a>
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}
               </div>
            )}
         </div>
      </aside>
   );
}
