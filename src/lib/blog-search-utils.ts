import type { Code, Html, InlineCode, Nodes, Text } from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";

export type SearchItem = {
   id: string;
   title: string;
   description: string;
   tags: string[];
   body: string;
};

export type IndexedItem = SearchItem & {
   index: number;
   normalized: {
      title: string;
      description: string;
      body: string;
      tags: string[];
   };
};

export type RankedResult = {
   id: string;
   index: number;
   title: string;
   description: string;
   body: string;
   normalizedBody: string;
   tags: string[];
   score: number;
   bodyPreview: { snippet: string; matchTerm: string } | null;
};

export const SEARCH_LIMIT = 10;
export const SEARCH_DEBOUNCE_MS = 260;

export function getSearchQueryFromUrl() {
   const params = new URLSearchParams(window.location.search);
   return params.get("q")?.trim() ?? "";
}

export function normalizeValue(value: string) {
   return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
}

function extractTextFromNode(node: Nodes): string {
   switch (node.type) {
      case "text":
         return (node as Text).value;
      case "inlineCode":
         return (node as InlineCode).value;
      case "code":
         return (node as Code).value;
      case "html":
         return (node as Html).value.replace(/<[^>]+>/g, " ").trim();
      default: {
         if ("children" in node && Array.isArray((node as { children: Nodes[] }).children)) {
            return (node as { children: Nodes[] }).children.map(extractTextFromNode).join(" ");
         }
         return "";
      }
   }
}

const stripProcessor = unified().use(remarkParse).use(remarkGfm);

export function stripMarkdown(value: string) {
   const ast = stripProcessor.parse(value);
   return extractTextFromNode(ast)
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]{2,}/g, " ")
      .trim();
}

function getQueryTerms(query: string) {
   return normalizeValue(query)
      .split(/\s+/)
      .filter((term) => term.length > 0);
}

function rankItem(item: IndexedItem, normalizedQuery: string, queryTerms: string[]) {
   if (!normalizedQuery || queryTerms.length === 0) return 1;

   const { title, description, tags, body } = item.normalized;

   let score = 0;
   let bodyOnlyMatches = 0;

   for (const term of queryTerms) {
      let termScore = 0;

      const titleIndex = title.indexOf(term);
      if (titleIndex === 0) {
         termScore += 140;
      } else if (titleIndex > 0) {
         termScore += 95 + Math.max(0, 20 - Math.min(titleIndex, 20));
      }

      let tagScore = 0;
      for (const tag of tags) {
         const tagIndex = tag.indexOf(term);
         if (tagIndex === 0) tagScore = Math.max(tagScore, 85);
         else if (tagIndex > 0) tagScore = Math.max(tagScore, 60);
      }
      termScore += tagScore;

      if (description.includes(term)) termScore += 32;

      if (termScore === 0) {
         if (body.includes(term)) {
            termScore += 10;
            bodyOnlyMatches += 1;
         } else {
            return 0;
         }
      }

      score += termScore;
   }

   const phraseInTitle = title.indexOf(normalizedQuery);
   if (phraseInTitle >= 0) {
      score += 55 + Math.max(0, 24 - Math.min(phraseInTitle, 24));
   }
   if (description.includes(normalizedQuery)) score += 20;
   if (body.includes(normalizedQuery)) score += 6;

   score -= bodyOnlyMatches * 12;

   return Math.max(1, score);
}

function getBodyPreview(
   body: string,
   normalizedBody: string,
   normalizedQuery: string,
   queryTerms: string[],
) {
   if (!normalizedQuery || queryTerms.length === 0) {
      return null;
   }

   let matchTerm = normalizedQuery;
   let matchIndex = normalizedBody.indexOf(normalizedQuery);

   if (matchIndex === -1) {
      const fallbackTerm = queryTerms.find((term) => normalizedBody.includes(term));
      if (!fallbackTerm) return null;

      matchTerm = fallbackTerm;
      matchIndex = normalizedBody.indexOf(fallbackTerm);
   }

   const plainBody = stripMarkdown(body);
   const previewRadius = 80;
   const start = Math.max(0, matchIndex - previewRadius);
   const end = Math.min(plainBody.length, matchIndex + matchTerm.length + previewRadius);

   const prefix = start > 0 ? "..." : "";
   const suffix = end < plainBody.length ? "..." : "";
   const snippet = `${prefix}${plainBody.slice(start, end).trim()}${suffix}`;

   return { snippet, matchTerm };
}

export { getBodyPreview, getQueryTerms, rankItem };
