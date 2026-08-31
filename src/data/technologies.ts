import astroicon from "@components/technologies/astroicon.astro";
import bun from "@components/technologies/bun.astro";
import chakraui from "@components/technologies/chakra.astro";
import chatgpt from "@components/technologies/chatgpt.astro";
import claude from "@components/technologies/claude.astro";
import claudecode from "@components/technologies/claudecode.astro";
import coderabbit from "@components/technologies/coderabbit.astro";
import codex from "@components/technologies/codex.astro";
import css from "@components/technologies/css.astro";
import cursor from "@components/technologies/cursor.astro";
import cypress from "@components/technologies/cypress.astro";
import docker from "@components/technologies/docker.astro";
import drizzle from "@components/technologies/drizzle.astro";
import eslint from "@components/technologies/eslint.astro";
import express from "@components/technologies/express.astro";
import fastify from "@components/technologies/fastify.astro";
import figma from "@components/technologies/figma.astro";
import git from "@components/technologies/git.astro";
import githubactions from "@components/technologies/githubactions.astro";
import githubcopilot from "@components/technologies/githubcopilot.astro";
import grafana from "@components/technologies/grafana.astro";
import hono from "@components/technologies/hono.astro";
import html from "@components/technologies/html.astro";
import javascript from "@components/technologies/javascript.astro";
import jest from "@components/technologies/jest.astro";
import linux from "@components/technologies/linux.astro";
import mantine from "@components/technologies/mantine.astro";
import msw from "@components/technologies/msw.astro";
import nestjs from "@components/technologies/nestjs.astro";
import nextdotjs from "@components/technologies/next.astro";
import nginx from "@components/technologies/nginx.astro";
import nodedotjs from "@components/technologies/node.astro";
import nx from "@components/technologies/nx.astro";
import openapi from "@components/technologies/openapi.astro";
import opencode from "@components/technologies/opencode.astro";
import otel from "@components/technologies/otel.astro";
import oxc from "@components/technologies/oxc.astro";
import playwright from "@components/technologies/playwright.astro";
import pnpm from "@components/technologies/pnpm.astro";
import postgresql from "@components/technologies/postgresql.astro";
import prettier from "@components/technologies/prettier.astro";
import prisma from "@components/technologies/prisma.astro";
import prometheus from "@components/technologies/prometheus.astro";
import python from "@components/technologies/python.astro";
import react from "@components/technologies/react.astro";
import redis from "@components/technologies/redis.astro";
import shadcn from "@components/technologies/shadcnui.astro";
import socketio from "@components/technologies/socketdotio.astro";
import sqlite from "@components/technologies/sqlite.astro";
import storybook from "@components/technologies/storybook.astro";
import supabase from "@components/technologies/supabase.astro";
import swagger from "@components/technologies/swagger.astro";
import tailwindcss from "@components/technologies/tailwind.astro";
import tanstack from "@components/technologies/tanstack.astro";
import testinglib from "@components/technologies/testinglibrary.astro";
import turborepo from "@components/technologies/turborepo.astro";
import typescript from "@components/technologies/typescript.astro";
import vite from "@components/technologies/vite.astro";
import vitest from "@components/technologies/vitest.astro";
import zod from "@components/technologies/zod.astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

type Technology = {
   name: string;
   color: string;
   iconColor: string;
   darkIconColor?: string;
   icon: AstroComponentFactory;
   link: string;
};

type TechnologyGroup = {
   label: string;
   techs: Technology[];
};

export const groups: TechnologyGroup[] = [
   {
      label: "Języki",
      techs: [
         {
            name: "HTML",
            color: "#E34F26",
            iconColor: "#E34F26",
            icon: html,
            link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
         },
         {
            name: "CSS",
            color: "#663399",
            iconColor: "#663399",
            icon: css,
            link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
         },
         {
            name: "JavaScript",
            color: "#F7DF1E",
            iconColor: "#F7DF1E",
            icon: javascript,
            link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
         },
         {
            name: "TypeScript",
            color: "#3178C6",
            iconColor: "#3178C6",
            icon: typescript,
            link: "https://www.typescriptlang.org",
         },
         {
            name: "Python",
            color: "#3776AB",
            iconColor: "#3776AB",
            icon: python,
            link: "https://www.python.org",
         },
      ],
   },
   {
      label: "Frontend & UI",
      techs: [
         {
            name: "React",
            color: "#61DBFB",
            iconColor: "#61DBFB",
            icon: react,
            link: "https://react.dev",
         },
         {
            name: "Next.js",
            color: "#000000",
            iconColor: "#000000",
            darkIconColor: "#ffffff",
            icon: nextdotjs,
            link: "https://nextjs.org",
         },
         {
            name: "Astro",
            color: "#BC52EE",
            iconColor: "#BC52EE",
            icon: astroicon,
            link: "https://astro.build",
         },
         {
            name: "TanStack",
            color: "#ECE8D1",
            iconColor: "#3a3a38",
            darkIconColor: "#ECE8D1",
            icon: tanstack,
            link: "https://tanstack.com",
         },
         {
            name: "Tailwind CSS",
            color: "#06B6D4",
            iconColor: "#06B6D4",
            icon: tailwindcss,
            link: "https://tailwindcss.com",
         },
         {
            name: "shadcn/ui",
            color: "#000000",
            iconColor: "#000000",
            darkIconColor: "#ffffff",
            icon: shadcn,
            link: "https://ui.shadcn.com",
         },
         {
            name: "Mantine",
            color: "#339AF0",
            iconColor: "#339AF0",
            icon: mantine,
            link: "https://mantine.dev",
         },
         {
            name: "Chakra UI",
            color: "#1BB2A9",
            iconColor: "#1BB2A9",
            icon: chakraui,
            link: "https://chakra-ui.com/",
         },
      ],
   },
   {
      label: "Backend",
      techs: [
         {
            name: "Node.js",
            color: "#5FA04E",
            iconColor: "#5FA04E",
            icon: nodedotjs,
            link: "https://nodejs.org",
         },
         {
            name: "Bun",
            color: "#000000",
            iconColor: "#000000",
            darkIconColor: "#fbf0df",
            icon: bun,
            link: "https://bun.sh",
         },
         {
            name: "Fastify",
            color: "#000000",
            iconColor: "#000000",
            darkIconColor: "#ffffff",
            icon: fastify,
            link: "https://www.fastify.io",
         },
         {
            name: "Express",
            color: "#000000",
            iconColor: "#000000",
            darkIconColor: "#ffffff",
            icon: express,
            link: "https://expressjs.com",
         },
         {
            name: "Hono",
            color: "#E36002",
            iconColor: "#E36002",
            icon: hono,
            link: "https://hono.dev",
         },
         {
            name: "NestJS",
            color: "#E0234E",
            iconColor: "#E0234E",
            icon: nestjs,
            link: "https://nestjs.com",
         },
         {
            name: "Socket.io",
            color: "#010101",
            iconColor: "#010101",
            darkIconColor: "#ffffff",
            icon: socketio,
            link: "https://socket.io",
         },
      ],
   },
   {
      label: "AI",
      techs: [
         {
            name: "Cursor",
            color: "#000000",
            iconColor: "#000000",
            icon: cursor,
            link: "https://www.cursor.com",
         },
         {
            name: "OpenCode",
            color: "#000000",
            iconColor: "#000000",
            darkIconColor: "#ffffff",
            icon: opencode,
            link: "https://opencode.ai",
         },
         {
            name: "GitHub Copilot",
            color: "#000000",
            iconColor: "#000000",
            darkIconColor: "#ffffff",
            icon: githubcopilot,
            link: "https://github.com/features/copilot",
         },
         {
            name: "ChatGPT",
            color: "#10A37F",
            iconColor: "#10A37F",
            icon: chatgpt,
            link: "https://chatgpt.com",
         },
         {
            name: "Codex",
            color: "#10A37F",
            iconColor: "#000",
            darkIconColor: "#fff",
            icon: codex,
            link: "https://openai.com/codex",
         },
         {
            name: "Claude",
            color: "#D97757",
            iconColor: "#D97757",
            icon: claude,
            link: "https://claude.ai",
         },
         {
            name: "Claude Code",
            color: "#D97757",
            iconColor: "#D97757",
            icon: claudecode,
            link: "https://docs.anthropic.com/en/docs/claude-code/overview",
         },
         {
            name: "CodeRabbit",
            color: "#FF570A",
            iconColor: "#FF570A",
            icon: coderabbit,
            link: "https://coderabbit.ai",
         },
      ],
   },
   {
      label: "Bazy danych",
      techs: [
         {
            name: "PostgreSQL",
            color: "#4169E1",
            iconColor: "#4169E1",
            icon: postgresql,
            link: "https://www.postgresql.org",
         },
         {
            name: "Redis",
            color: "#FF4438",
            iconColor: "#FF4438",
            icon: redis,
            link: "https://redis.io",
         },
         {
            name: "Prisma",
            color: "#2D3748",
            iconColor: "#2D3748",
            darkIconColor: "#ffffff",
            icon: prisma,
            link: "https://www.prisma.io",
         },
         {
            name: "Drizzle",
            color: "#C5F74F",
            iconColor: "#000",
            darkIconColor: "#C5F74F",
            icon: drizzle,
            link: "https://orm.drizzle.team",
         },
         {
            name: "SQLite",
            color: "#003B57",
            iconColor: "#003B57",
            darkIconColor: "#67B7D1",
            icon: sqlite,
            link: "https://www.sqlite.org",
         },
         {
            name: "Supabase",
            color: "#3FCF8E",
            iconColor: "#3FCF8E",
            icon: supabase,
            link: "https://supabase.com",
         },
      ],
   },
   {
      label: "Testowanie",
      techs: [
         {
            name: "Cypress",
            color: "#69D3A7",
            iconColor: "#69D3A7",
            icon: cypress,
            link: "https://www.cypress.io",
         },
         {
            name: "Jest",
            color: "#C21325",
            iconColor: "#C21325",
            icon: jest,
            link: "https://jestjs.io",
         },
         {
            name: "Vitest",
            color: "#6E9F18",
            iconColor: "#6E9F18",
            icon: vitest,
            link: "https://vitest.dev",
         },
         {
            name: "Testing Library",
            color: "#E33332",
            iconColor: "#E33332",
            icon: testinglib,
            link: "https://testing-library.com",
         },
         {
            name: "Playwright",
            color: "#2EAD33",
            iconColor: "#2EAD33",
            icon: playwright,
            link: "https://playwright.dev",
         },
         {
            name: "MSW",
            color: "#FF6A33",
            iconColor: "#FF6A33",
            icon: msw,
            link: "https://mswjs.io",
         },
      ],
   },
   {
      label: "Narzędzia",
      techs: [
         {
            name: "Vite",
            color: "#646CFF",
            iconColor: "#646CFF",
            icon: vite,
            link: "https://vitejs.dev",
         },
         {
            name: "ESLint",
            color: "#4B32C3",
            iconColor: "#4B32C3",
            icon: eslint,
            link: "https://eslint.org",
         },
         {
            name: "Prettier",
            color: "#F7B93E",
            iconColor: "#F7B93E",
            icon: prettier,
            link: "https://prettier.io",
         },
         {
            name: "Oxc",
            color: "#32f3e9",
            iconColor: "#32f3e9",
            icon: oxc,
            link: "https://oxc.rs/",
         },
         {
            name: "Zod",
            color: "#3E67B1",
            iconColor: "#3E67B1",
            icon: zod,
            link: "https://zod.dev",
         },
         {
            name: "Swagger",
            color: "#85EA2D",
            iconColor: "#85EA2D",
            icon: swagger,
            link: "https://swagger.io",
         },
         {
            name: "OpenAPI",
            color: "#6BA539",
            iconColor: "#6BA539",
            icon: openapi,
            link: "https://www.openapis.org",
         },
         {
            name: "Storybook",
            color: "#FF4785",
            iconColor: "#FF4785",
            icon: storybook,
            link: "https://storybook.js.org",
         },
         {
            name: "Figma",
            color: "#F24E1E",
            iconColor: "#F24E1E",
            icon: figma,
            link: "https://www.figma.com",
         },
         {
            name: "pnpm",
            color: "#F69220",
            iconColor: "#F69220",
            icon: pnpm,
            link: "https://pnpm.io",
         },
         {
            name: "Turborepo",
            color: "#FF1E56",
            iconColor: "#FF1E56",
            icon: turborepo,
            link: "https://turbo.build",
         },
         {
            name: "Nx",
            color: "#143055",
            iconColor: "#143055",
            darkIconColor: "#96D8E9",
            icon: nx,
            link: "https://nx.dev",
         },
         {
            name: "Git",
            color: "#F05032",
            iconColor: "#F05032",
            icon: git,
            link: "https://git-scm.com",
         },
      ],
   },
   {
      label: "Monitoring i observability",
      techs: [
         {
            name: "Grafana",
            color: "#F46800",
            iconColor: "#F46800",
            icon: grafana,
            link: "https://grafana.com",
         },
         {
            name: "OpenTelemetry",
            color: "#000000",
            iconColor: "#000000",
            icon: otel,
            link: "https://opentelemetry.io",
         },
         {
            name: "Prometheus",
            color: "#E6522C",
            iconColor: "#E6522C",
            icon: prometheus,
            link: "https://prometheus.io",
         },
      ],
   },
   {
      label: "Infrastruktura",
      techs: [
         {
            name: "Docker",
            color: "#2496ED",
            iconColor: "#2496ED",
            icon: docker,
            link: "https://www.docker.com",
         },
         {
            name: "GitHub Actions",
            color: "#2088FF",
            iconColor: "#2088FF",
            icon: githubactions,
            link: "https://github.com/features/actions",
         },
         {
            name: "Linux",
            color: "#FCC624",
            iconColor: "#24283B",
            darkIconColor: "#FCC624",
            icon: linux,
            link: "https://www.kernel.org",
         },
         {
            name: "NGINX",
            color: "#009639",
            iconColor: "#009639",
            icon: nginx,
            link: "https://nginx.org",
         },
      ],
   },
];
