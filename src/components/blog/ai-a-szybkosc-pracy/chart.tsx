import { scaleLinear } from "@tanstack/charts-scales/linear";
import { defineChart, lineY, text, d3Curve } from "@tanstack/charts";
import { curveMonotoneX } from "d3-shape";
import { group } from "d3-array";
import { tooltip } from "@tanstack/charts/tooltip";
import { Chart } from "@tanstack/react-charts";

interface AIComparisonRow {
   complexity: number;
   series: "Bez AI" | "Z AI";
   time: number;
}

const rawData = [
   { complexity: 1, withoutAI: 30, withAI: 10 },
   { complexity: 3, withoutAI: 60, withAI: 25 },
   { complexity: 5, withoutAI: 120, withAI: 80 },
   { complexity: 7, withoutAI: 240, withAI: 260 },
   { complexity: 9, withoutAI: 480, withAI: 600 },
];

const data: readonly AIComparisonRow[] = rawData.flatMap((row) => [
   { complexity: row.complexity, series: "Bez AI", time: row.withoutAI },
   { complexity: row.complexity, series: "Z AI", time: row.withAI },
]);

function lastBySeries(rows: readonly AIComparisonRow[]): readonly AIComparisonRow[] {
   return Array.from(group(rows, (row) => row.series).values())
      .map((seriesRows) => seriesRows.at(-1))
      .filter((row): row is AIComparisonRow => row !== undefined);
}

const colors = ["#F4BB44", "#4d84df"];

const aiChart = defineChart({
   marks: [
      lineY(data, {
         x: "complexity",
         y: "time",
         color: "series",
         curve: d3Curve(curveMonotoneX),
         strokeWidth: 2.25,
      }),
      text(lastBySeries(data), {
         x: "complexity",
         y: "time",
         text: "series",
         color: "series",
         anchor: "start",
         dx: 20,
         fontWeight: 700,
      }),
   ],

   scales: {
      x: {
         scale: scaleLinear,
         nice: true,
         grid: true,
         axis: {
            label: "Skomplikowanie zadania",
         },
      },

      y: {
         scale: scaleLinear,
         nice: true,
         grid: true,
         axis: {
            label: "Czas wykonania (min)",
         },
      },
   },

   tooltip,

   color: {
      range: colors,
   },

   margin: {
      left: 30,
      right: 30,
   },
});

export function AIChart() {
   return <Chart definition={aiChart} height={400} ariaLabel="AI impact on development time" />;
}
