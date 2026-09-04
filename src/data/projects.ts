import coincontrol from "@assets/projects/coincontrol.png";
import kanban from "@assets/projects/kanban.png";
import landing from "@assets/projects/landing.png";
import snackRate from "@assets/projects/snack-rate.png";
import twitchChatBot from "@assets/projects/twitch-chat-bot.png";
import type { ImageMetadata } from "astro";

type Project = {
   id: string;
   title: string;
   description: string;
   descriptionSecondary: string;
   demo?: string;
   github: string;
   tags: string[];
   thumbnail: ImageMetadata | null;
};

export const projects: Project[] = [
   {
      id: "snack-rate",
      title: "Snack Rate (w trakcie tworzenia)",
      description:
         "Snack Rate to aplikacja do oceniania przekąsek, umożliwiająca użytkownikom dzielenie się opiniami na temat różnych produktów spożywczych.",
      descriptionSecondary:
         "Projekt skoncentrowany na prostocie i użyteczności, ale z pełnym zestawem narzędzi observability. Aplikacja zbudowana jest w TanStack Start - framework Fullstack, oraz ORPC dla łatwej komunikacji.",
      github: "https://github.com/MaciejGarncarski/snack-rate",
      tags: ["TanStack Start", "ORPC", "React", "Tailwind CSS", "OpenTelemetry", "PostgreSQL"],
      thumbnail: snackRate,
   },
   {
      id: "coin-control",
      title: "CoinControl",
      description:
         "CoinControl to aplikacja do śledzenia budżetu zaprojektowana, aby pomóc użytkownikom monitorować ich dochody i wydatki.",
      descriptionSecondary:
         "Skoncentrowana na wydajności aplikacja Fullstack, wykorzystująca BullMQ do asynchronicznego przetwarzania zadań w tle oraz Prismę do bezpiecznego zarządzania bazą danych. Frontend zbudowany w React z wykorzystaniem Tailwind CSS i Zustand do zarządzania stanem, zapewniając płynne i responsywne doświadczenie użytkownika.",
      github: "https://github.com/MaciejGarncarski/coin-control",
      tags: ["React", "Tailwind CSS", "Zustand", "Express", "BullMQ", "Prisma"],
      thumbnail: coincontrol,
   },
   {
      id: "twitch-chat-bot",
      title: "Twitch Chat Bot",
      description:
         "Bot na platformę Twitch, którego głównym zadaniem jest obsługa systemu song request. Projekt charakteryzuje się modułową budową, co umożliwia bezproblemowe implementowanie kolejnych funkcjonalności.",
      descriptionSecondary:
         "Zbudowany z wykorzystaniem nowoczesnego runtime'u Bun oraz frameworka Elysia dla maksymalnej szybkości. Komunikacja z czatem odbywa się przez WebSockety, a modularna struktura pozwala na łatwe dodawanie nowych modułów, takich jak systemy punktowe czy mini-gry.",
      github: "https://github.com/MaciejGarncarski/twitch-chat-bot",
      tags: ["Bun", "Elysia", "React", "WebSocket"],
      thumbnail: twitchChatBot,
   },
   {
      id: "kanban",
      title: "Kanban",
      description:
         "Aplikacja Kanban stworzona w NestJS z zastosowaniem wzorców CQRS, Domain-Driven Design (DDD) oraz architektury hexagonalnej.",
      descriptionSecondary:
         "Zaawansowany projekt skupiony na czystej architekturze (Clean Architecture). Rozdzielenie logiki biznesowej od infrastruktury przy użyciu DDD oraz obsługa komend i zapytań przez CQRS sprawia, że system jest wysoce skalowalny i łatwy w testowaniu.",
      github: "https://github.com/MaciejGarncarski/kanban",
      tags: ["Next.js", "NestJS", "Drizzle ORM", "Mantine UI", "JWT"],
      thumbnail: kanban,
   },
   {
      id: "professional-landing-nextjs",
      title: "Professional Landing Page",
      description:
         "Profesjonalna strona docelowa dla firmy, zaprojektowana w celu skutecznego prezentowania usług i przyciągania klientów.",
      descriptionSecondary:
         "Projekt nastawiony na doskonały User Experience i optymalizację SEO. Wykorzystuje bibliotekę Motion (Framer Motion) do płynnych animacji typu 'reveal' oraz Tailwind CSS dla pełnej responsywności, zapewniając błyskawiczne ładowanie strony.",
      demo: "https://professional-landing-nextjs.vercel.app/",
      github: "https://github.com/MaciejGarncarski/professional-landing-nextjs",
      tags: ["Next.js", "Tailwind CSS", "Motion"],
      thumbnail: landing,
   },
] as const;

export const projectsDict = Object.fromEntries(
   projects.map((project) => [project.id, project]),
) as Record<(typeof projects)[number]["id"], (typeof projects)[number]>;
