"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { musicTracks } from "@/data/music";
import {
  MusicIcon,
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

const DEFAULT_VOLUME = 40;
const FADE_MS = 1200;
const FADE_STEP_MS = 20;
const HINT_MS = 7000;

const pad = (value: number) => String(value).padStart(2, "0");

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const fadeRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const volumeRef = useRef(DEFAULT_VOLUME);

  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [open, setOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const track = musicTracks[trackIndex];

  const clearFade = useCallback(() => {
    if (fadeRef.current !== null) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();
    const target = volumeRef.current / 100;
    const step = target / (FADE_MS / FADE_STEP_MS);
    audio.volume = 0;
    fadeRef.current = window.setInterval(() => {
      const element = audioRef.current;
      if (!element) return;
      const next = Math.min(target, element.volume + step);
      element.volume = next;
      if (next >= target) clearFade();
    }, FADE_STEP_MS);
  }, [clearFade]);

  // Llamada dentro del gesto del usuario: es lo que desbloquea el audio.
  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.volume = startedRef.current ? volumeRef.current / 100 : 0;
      await audio.play();
      setBlocked(false);
      setShowHint(false);
      if (!startedRef.current) {
        startedRef.current = true;
        fadeIn();
      }
    } catch {
      setBlocked(true);
      setShowHint(true);
    }
  }, [fadeIn]);

  // Intento de autoplay al entrar; si el navegador lo bloquea, espera al primer gesto.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || startedRef.current) return;
    audio.src = musicTracks[0].src;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        startedRef.current = true;
        fadeIn();
      })
      .catch(() => {
        setBlocked(true);
        setShowHint(true);
      });
  }, [fadeIn]);

  useEffect(() => {
    if (!blocked) return;

    // En click, no en pointerdown: el icono cambia al arrancar y el primer toque se perdía.
    const start = () => void startPlayback();
    window.addEventListener("click", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    return () => {
      window.removeEventListener("click", start);
      window.removeEventListener("keydown", start);
    };
  }, [blocked, startPlayback]);

  useEffect(() => {
    if (!showHint) return;
    const timeout = window.setTimeout(() => setShowHint(false), HINT_MS);
    return () => window.clearTimeout(timeout);
  }, [showHint]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) sliderRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => clearFade, [clearFade]);

  const handleVolume = (next: number) => {
    setVolume(next);
    volumeRef.current = next;
    clearFade();
    const audio = audioRef.current;
    if (audio && startedRef.current) audio.volume = next / 100;
    // shortcut: iOS ignora audio.volume; pasar a Web Audio si hace falta volumen real en iPhone.
  };

  const changeTrack = (delta: number) => {
    const next = (trackIndex + delta + musicTracks.length) % musicTracks.length;
    const wasPlaying = playing;
    clearFade();
    setTrackIndex(next);

    const audio = audioRef.current;
    if (!audio) return;
    audio.src = musicTracks[next].src;
    audio.volume = volumeRef.current / 100;
    if (wasPlaying) audio.play().catch(() => setPlaying(false));
  };

  const handleEnded = () => {
    const next = (trackIndex + 1) % musicTracks.length;
    setTrackIndex(next);

    const audio = audioRef.current;
    if (!audio) return;
    audio.src = musicTracks[next].src;
    audio.volume = volumeRef.current / 100;
    audio.play().catch(() => setPlaying(false));
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void startPlayback();
    } else {
      clearFade();
      audio.pause();
    }
  };

  const togglePanel = () => {
    setOpen((value) => !value);
    setShowHint(false);
  };

  return (
    <div
      ref={rootRef}
      className="fixed right-6 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 sm:right-8 sm:bottom-8"
    >
      {showHint && !open ? (
        <div
          aria-hidden="true"
          className="absolute right-0 bottom-full mb-3 w-max max-w-[calc(100vw-3rem)] rounded-2xl border-2 border-ink bg-paper px-3 py-2 text-[0.6rem] font-bold uppercase leading-tight tracking-[0.12em] text-ink shadow-[4px_4px_0_0_var(--ink)]"
        >
          Toca para activar la música
          <span className="absolute right-[1.375rem] -bottom-[7px] h-3 w-3 rotate-45 border-r-2 border-b-2 border-ink bg-paper" />
        </div>
      ) : null}

      {open ? (
        <div
          id="music-panel"
          role="group"
          aria-label="Control de música"
          className="player-panel absolute right-0 bottom-full mb-4 w-[232px] max-w-[calc(100vw-3rem)] border-2 border-ink bg-paper p-4 shadow-[6px_6px_0_0_var(--ink)]"
        >
          <div className="flex items-center justify-between border-b border-ink/15 pb-2">
            <span className="mono-label text-[0.5rem] text-ink-soft">
              {"// Audio 001"}
            </span>
            <span className="mono-label flex items-center gap-1.5 text-[0.5rem] text-pink-deep">
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-pink",
                  playing && "signal-dot",
                )}
              />
              {playing ? "En vivo" : "En pausa"}
            </span>
          </div>

          <p className="soft-serif mt-3 text-[1.35rem] leading-none text-ink">
            {track.title}
          </p>
          <p className="mono-label mt-1.5 text-[0.5rem] text-ink-soft">
            {pad(trackIndex + 1)} / {pad(musicTracks.length)} · 8-bit
          </p>

          <div className="mt-4 flex items-stretch gap-4">
            <div className="relative h-32 w-7 shrink-0">
              <input
                ref={sliderRef}
                type="range"
                min={0}
                max={100}
                step={1}
                value={volume}
                onChange={(event) => handleVolume(Number(event.target.value))}
                aria-label="Volumen de la música"
                aria-valuetext={`${volume} %`}
                className="volume-range absolute inset-0 m-auto h-7 w-32 -rotate-90"
                style={{ "--volume": `${volume}%` } as CSSProperties}
              />
            </div>
            <div className="flex flex-1 flex-col items-end justify-between py-0.5">
              <span className="font-mono text-lg font-bold leading-none tabular-nums text-ink">
                {volume}%
              </span>
              <span className="mono-label text-[0.45rem] text-ink-soft">
                Volumen
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 border-t border-ink/15 pt-3">
            <ControlButton label="Canción anterior" onClick={() => changeTrack(-1)}>
              <SkipBackIcon className="h-4 w-4" />
            </ControlButton>

            <button
              type="button"
              onClick={togglePlayback}
              aria-label={playing ? "Pausar música" : "Reproducir música"}
              className="grid h-9 flex-1 place-items-center border-2 border-ink bg-pink text-ink shadow-[2px_2px_0_0_var(--ink)] transition hover:bg-petal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {playing ? (
                <PauseIcon className="h-4 w-4" />
              ) : (
                <PlayIcon className="h-4 w-4" />
              )}
            </button>

            <ControlButton label="Siguiente canción" onClick={() => changeTrack(1)}>
              <SkipForwardIcon className="h-4 w-4" />
            </ControlButton>
          </div>
        </div>
      ) : null}

      <button
        ref={triggerRef}
        type="button"
        onClick={togglePanel}
        aria-label={open ? "Cerrar control de música" : "Abrir control de música"}
        aria-expanded={open}
        aria-controls="music-panel"
        className="grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-ink text-pink shadow-[4px_4px_0_0_var(--pink)] transition-[transform,box-shadow,background-color,color] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--pink)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {playing ? (
          <span aria-hidden="true" className="flex h-5 items-end gap-[3px]">
            <span className="eq-bar h-2.5 w-[3px] bg-pink" />
            <span className="eq-bar h-4 w-[3px] bg-pink" />
            <span className="eq-bar h-3 w-[3px] bg-pink" />
          </span>
        ) : (
          <MusicIcon className="h-5 w-5" />
        )}
      </button>

      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={handleEnded}
      />
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-9 flex-1 place-items-center border-2 border-ink bg-paper text-ink shadow-[2px_2px_0_0_var(--ink)] transition hover:bg-cream active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      {children}
    </button>
  );
}
