import { type ChangeEvent, useState, useTransition } from "react";

const PRODUCTS = ["lampa", "poduszka", "lodówka", "biurko", "krzesło", "szafa"];

export function DemoComponent() {
   const [query, setQuery] = useState("");
   const [results, setResults] = useState<string[]>(PRODUCTS);
   const [isPending, startTransition] = useTransition();

   const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setQuery(value);

      startTransition(async () => {
         await new Promise((res) => setTimeout(res, 500));
         const filtered = PRODUCTS.filter((product) =>
            product.toLowerCase().includes(value.toLowerCase()),
         );

         startTransition(() => {
            setResults(filtered);
         });
      });
   };

   return (
      <div className="flex flex-col items-center justify-center my-2">
         <input
            type="text"
            className="border px-3 py-1 w-54 bg-background-secondary rounded-lg border-accent/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent"
            value={query}
            onChange={handleSearch}
            placeholder="Szukaj produktów..."
         />
         {isPending && <p className="mt-6 min-h-[4rem]">Aktualizowanie wyników...</p>}
         {results.length > 0 && !isPending && (
            <ul className="mt-6 flex gap-2 flex-col text-center min-h-[4rem]">
               {results.map((result) => (
                  <li key={result}>{result}</li>
               ))}
            </ul>
         )}
         {results.length === 0 && !isPending && <p className="mt-6 min-h-[4rem]">Brak wyników</p>}
      </div>
   );
}
