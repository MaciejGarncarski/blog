import { clsx } from "clsx";

type Props = {
  variant?: "center" | "left";
  className?: string;
};

export function Hr({ variant = "center", className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "h-px shrink-0",
        variant === "center"
          ? "bg-linear-to-r from-transparent via-accent/20 to-transparent"
          : "bg-linear-to-r from-accent/20 to-transparent",
        className,
      )}
    />
  );
}
