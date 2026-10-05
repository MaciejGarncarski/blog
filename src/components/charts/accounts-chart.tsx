import { type ChartPoint, defineChart, dot } from "@tanstack/charts";
import { Chart } from "@tanstack/charts/react";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { scaleSqrt } from "d3-scale";

export interface Account {
   id: string;
   name: string;
   monthlyRevenue: number;
   retention: number;
   seats: number;
   segment: "SMB" | "Mid-Market" | "Enterprise";
}

export const accounts: readonly Account[] = [
   { id: "acme", name: "Acme", monthlyRevenue: 1200, retention: 0.82, seats: 12, segment: "SMB" },
   {
      id: "globex",
      name: "Globex",
      monthlyRevenue: 4800,
      retention: 0.91,
      seats: 48,
      segment: "Mid-Market",
   },
   {
      id: "initech",
      name: "Initech",
      monthlyRevenue: 950,
      retention: 0.68,
      seats: 8,
      segment: "SMB",
   },
   {
      id: "umbrella",
      name: "Umbrella",
      monthlyRevenue: 18200,
      retention: 0.96,
      seats: 320,
      segment: "Enterprise",
   },
   {
      id: "hooli",
      name: "Hooli",
      monthlyRevenue: 12400,
      retention: 0.88,
      seats: 210,
      segment: "Enterprise",
   },
   {
      id: "stark",
      name: "Stark",
      monthlyRevenue: 6200,
      retention: 0.84,
      seats: 86,
      segment: "Mid-Market",
   },
   { id: "wayne", name: "Wayne", monthlyRevenue: 2400, retention: 0.74, seats: 24, segment: "SMB" },
   {
      id: "massive",
      name: "Massive Dynamic",
      monthlyRevenue: 15800,
      retention: 0.93,
      seats: 260,
      segment: "Enterprise",
   },
   {
      id: "cyberdyne",
      name: "Cyberdyne",
      monthlyRevenue: 5400,
      retention: 0.79,
      seats: 64,
      segment: "Mid-Market",
   },
   {
      id: "tyrell",
      name: "Tyrell",
      monthlyRevenue: 3100,
      retention: 0.71,
      seats: 32,
      segment: "SMB",
   },
   {
      id: "wonka",
      name: "Wonka",
      monthlyRevenue: 8900,
      retention: 0.89,
      seats: 140,
      segment: "Mid-Market",
   },
   {
      id: "stardust",
      name: "Stardust",
      monthlyRevenue: 21500,
      retention: 0.97,
      seats: 410,
      segment: "Enterprise",
   },
];

const accountsChart = defineChart({
   marks: [
      dot(accounts, {
         x: "monthlyRevenue",
         y: "retention",
         r: "seats",
         rScale: {
            scale: () => scaleSqrt().range([3, 22]),
         },
         color: "segment",
      }),
   ],
   scales: {
      x: {
         scale: scaleLinear,
         nice: true,
         grid: true,
         axis: { label: "Monthly revenue (USD)" },
      },
      y: {
         scale: scaleLinear,
         nice: true,
         grid: true,
         axis: { label: "Retention rate" },
      },
   },
   tooltip,
});

export type AccountPoint = ChartPoint<Account, number, number>;

interface AccountsChartProps {
   onFocusChange?: (point: AccountPoint | null) => void;
   onSelect?: (point: AccountPoint | null) => void;
}

export function AccountsChart({ onFocusChange, onSelect }: AccountsChartProps) {
   return (
      <Chart
         definition={accountsChart}
         height={360}
         ariaLabel="Monthly revenue vs retention by account segment, sized by seats"
         onFocusChange={onFocusChange}
         onSelect={onSelect}
      />
   );
}
