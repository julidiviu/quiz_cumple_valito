"use client";

import { useEffect, useState } from "react";
import { MoonIcon, OrbitIcon, SignalIcon } from "@/components/ui/Icons";

export function IntroBoot() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.overflow;

    if (!done) {
      html.style.overflow = "hidden";
      // Fallback por si el evento de animación no dispara (animaciones desactivadas).
      const fallback = window.setTimeout(() => setDone(true), 2800);
      return () => {
        window.clearTimeout(fallback);
        html.style.overflow = previous;
      };
    }
  }, [done]);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setDone(true);
      }}
      className="intro-panel pointer-events-auto fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-pink text-ink"
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(43,36,48,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(43,36,48,0.35) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="boot-orbit relative grid h-28 w-28 place-items-center rounded-full border-2 border-ink">
          <span className="absolute inset-3 rounded-full border border-dashed border-ink/40" />
          <MoonIcon className="h-9 w-9" />
          <span className="absolute -right-1 top-1/2 h-3 w-3 rounded-full border-2 border-ink bg-paper" />
        </div>

        <div className="mono-label mt-6 flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1.5">
          <OrbitIcon className="h-3.5 w-3.5" />
          Abriendo canal
        </div>

        <p className="display-title mt-4 text-3xl sm:text-5xl">
          Estableciendo
          <br />
          conexión
        </p>

        <div className="mt-6 w-56 max-w-full border-2 border-ink bg-paper p-1 sm:w-64">
          <div className="intro-bar h-2 bg-pink-deep" />
        </div>

        <p className="mono-label mt-4 flex items-center gap-2 text-[0.55rem]">
          <SignalIcon className="h-3.5 w-3.5" />
          Sincronizando con Valito
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-2 bg-ink" />
    </div>
  );
}
