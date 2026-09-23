/** biome-ignore-all lint/suspicious/noArrayIndexKey: <Its demo component> */
import { Activity, useEffect, useState } from "react";

const TABS = [
   { id: "sales", label: "Sprzedaż", icon: "💰" },
   { id: "inventory", label: "Magazyn", icon: "📦" },
];

export function ActivityDemo() {
   const [activeTab, setActiveTab] = useState("sales");

   const [salesData, setSalesData] = useState([80, 45, 60]);

   useEffect(() => {
      const interval = setInterval(() => {
         setSalesData(salesData.map(() => Math.floor(Math.random() * 100)));
      }, 2000);
      return () => clearInterval(interval);
   }, [salesData]);

   return (
      <section className="flex flex-col py-4 gap-8 items-center bg-background text-foreground min-h-[500px]">
         <div className="text-center flex flex-col gap-2">
            <h2 className="text-xl font-bold tracking-tight">Dashboard Aktywności</h2>
            <p className="text-sm text-foreground-secondary">
               Przełączaj widoki bez utraty stanu renderowania.
            </p>
         </div>

         <nav className="flex bg-background-secondary p-1.5 rounded-xl border border-border shadow-2xl">
            {TABS.map((tab) => {
               const isActive = activeTab === tab.id;
               return (
                  <button
                     key={tab.id}
                     type="button"
                     onClick={() => setActiveTab(tab.id)}
                     className={`
                relative flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                ${
                   isActive
                      ? "bg-background text-accent shadow-accent-sm ring-1 ring-border"
                      : "text-foreground-secondary hover:text-foreground hover:bg-background-secondary/70"
}
              `}
                  >
                     <span>{tab.icon}</span>
                     {tab.label}
                     {isActive && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-px bg-accent/70" />
                     )}
                  </button>
               );
            })}
         </nav>

         <div className="w-full max-w-3xl px-6">
            <Activity mode={activeTab === "sales" ? "visible" : "hidden"}>
               <div className="group relative overflow-hidden p-8 bg-background-secondary border border-border rounded-xl min-h-[320px]">
                  <div className="flex justify-between items-start mb-8">
                     <h3 className="text-lg font-medium text-foreground">Raport Sprzedaży</h3>
                     <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded-sm">
                        LIVE
                     </span>
                  </div>

                  <div className="space-y-4">
                     {salesData.map((width, i) => (
                        <div key={i} className="h-3 bg-background rounded-full overflow-hidden">
                           <div
                              className="h-full bg-accent/40 transition-all duration-1000"
                              style={{ width: `${width}%` }}
                           />
                        </div>
                     ))}
                  </div>
               </div>
            </Activity>

            <Activity mode={activeTab === "inventory" ? "visible" : "hidden"}>
               <div className="p-8 bg-background-secondary border border-border rounded-xl min-h-[320px] flex flex-col">
                  <h3 className="text-lg font-medium text-foreground mb-6">Status Magazynowy</h3>

                  <div className="grid grid-cols-4 gap-3">
                     {Array.from({ length: 12 }).map((_, i) => (
                        <div
                           key={i}
                           className="aspect-square bg-background border border-border rounded-xl hover:border-foreground-secondary transition-colors cursor-crosshair"
                        />
                     ))}
                  </div>
               </div>
            </Activity>
         </div>
      </section>
   );
}
