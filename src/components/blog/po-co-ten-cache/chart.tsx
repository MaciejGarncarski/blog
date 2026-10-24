import { defineChart, lineY } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react";
import { scaleLinear } from "@tanstack/charts/scales/linear";

const catalogPages = 10;
const series = [
   { name: "Bez cache’u", color: "#F4BB44" },
   { name: "Z cache’em serwera", color: "#4d84df" },
];
const data = [0, 1, 1_000, 2_500, 5_000, 7_500, 10_000, 12_500, 15_000, 17_500, 20_000].flatMap(
   (users) => [
      { users, queries: users * (catalogPages + 1), series: series[0].name },
      { users, queries: users === 0 ? 0 : users + catalogPages, series: series[1].name },
   ],
);
const thousands = (value: number) => (value === 0 ? "0" : `${value / 1000} tys.`);

const requestsChart = defineChart(({ width }) => ({
   marks: [
      lineY(data, {
         x: "users",
         y: "queries",
         color: "series",
         strokeWidth: 2.5,
      }),
   ],
   scales: {
      x: {
         scale: () => scaleLinear().domain([0, 20_000]),
         axis: {
            label: "Liczba użytkowników",
            ticks: { count: width < 480 ? 3 : 5, format: thousands },
         },
      },
      y: {
         scale: () => scaleLinear().domain([0, 240_000]),
         grid: true,
         axis: {
            label: "Zapytania do bazy",
            ticks: { count: 5, format: thousands },
         },
      },
   },
   color: { domain: series.map((item) => item.name), range: series.map((item) => item.color) },
}));

export function CacheRequestsChart() {
   return (
      <figure
         className="not-prose my-8"
         aria-label="Wpływ cache’u serwera na liczbę zapytań do bazy"
      >
         <div className="mb-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {series.map((item) => (
               <span key={item.name} className="inline-flex items-center gap-2">
                  <span
                     aria-hidden="true"
                     className="h-0.5 w-5"
                     style={{ background: item.color }}
                  />
                  {item.name}
               </span>
            ))}
         </div>
         <Chart
            definition={requestsChart}
            height={320}
            ariaLabel="Liczba zapytań do bazy rośnie wraz z liczbą użytkowników. Przy 20 000 użytkowników: 220 000 bez cache’u i 20 010 z cache’em serwera."
         />
         <figcaption className="mt-3 text-sm leading-relaxed opacity-75">
            Przy 20 000 użytkowników: <strong>220 000 → 20 010 zapytań do bazy</strong>. Zakładamy,
            że wszyscy odwiedzają te same 10 stron katalogu, a każda strona wymaga jednego zapytania
            do bazy i trafia do wspólnego cache’u raz, bez wygasania i inwalidacji w analizowanym
            okresie. Koszyk to jedno zapytanie na użytkownika. Liczba requestów HTTP do serwera
            pozostaje taka sama.
         </figcaption>
      </figure>
   );
}
