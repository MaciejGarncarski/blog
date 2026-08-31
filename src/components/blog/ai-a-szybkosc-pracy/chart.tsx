import { d3Curve, defineChart, dot, lineY, text } from "@tanstack/charts";
import { tooltip } from "@tanstack/charts/tooltip";
import { scaleLinear } from "@tanstack/charts-scales/linear";
import { Chart } from "@tanstack/react-charts";
import { group } from "d3-array";
import { curveMonotoneX } from "d3-shape";

interface AIComparisonRow {
   complexity: number;
   series: "Programowanie" | "Praca z AI";
   time: number;
}

const rawData = [
   { complexity: 1, withoutAI: 30, withAI: 10 },
   { complexity: 2, withoutAI: 100, withAI: 60 },
   { complexity: 3, withoutAI: 150, withAI: 160 },
   { complexity: 4, withoutAI: 200, withAI: 260 },
   { complexity: 5, withoutAI: 400, withAI: 600 },
] as const;

const data: readonly AIComparisonRow[] = rawData.flatMap((row) => [
   { complexity: row.complexity, series: "Programowanie", time: row.withoutAI },
   { complexity: row.complexity, series: "Praca z AI", time: row.withAI },
]);

function lastBySeries(rows: readonly AIComparisonRow[]): readonly AIComparisonRow[] {
   return Array.from(group(rows, (row) => row.series).values())
      .map((seriesRows) => seriesRows.at(-1))
      .filter((row): row is AIComparisonRow => row !== undefined);
}

const colors = ["#F4BB44", "#4d84df"];

const aiChart = defineChart(
   (ctx) => {
      const fs = Math.min(16, Math.max(10, Math.round(ctx.width / 40)));

      return {
         marks: [
            lineY(data, {
               x: "complexity",
               y: "time",
               color: "series",
               curve: d3Curve(curveMonotoneX),
               strokeWidth: 2.25,
            }),
            dot(data, {
               x: "complexity",
               y: "time",
               color: "series",
               r: 3.5,
            }),
            text(lastBySeries(data), {
               x: "complexity",
               y: "time",
               text: "series",
               color: "series",
               anchor: "start",
               dx: -10,
               dy: -10,
               fontSize: fs,
               fontWeight: 700,
            }),
         ],

         scales: {
            x: {
               scale: scaleLinear,
               nice: true,
               grid: true,
               axis: { label: "Skomplikowanie zadania" },
            },
            y: {
               scale: scaleLinear,
               nice: true,
               grid: true,
               axis: { label: "Czas wykonania (min)" },
            },
         },

         color: { range: colors },

         margin: { top: 30, left: 50, right: 90, bottom: 30 },
      };
   },
   { tooltip },
);

export function AIChart() {
   return (
      <Chart definition={aiChart} ariaLabel="Wpływ AI na czas realizacji zadań programistycznych" />
   );
}
