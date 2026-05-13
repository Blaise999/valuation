import { Sparkles } from "lucide-react";

type SectionLabelProps = {
  children: React.ReactNode;
  dark?: boolean;
};

export function SectionLabel({ children, dark = false }: SectionLabelProps) {
  return (
    <div
      className={
        dark
          ? "mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-200"
          : "mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-700"
      }
    >
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}
