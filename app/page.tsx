"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const YOUTUBE_ID = "3Z6BOOCBgas";
const PHONE = "+18329248272";
const PHONE_DISPLAY = "+1 (832) 924-8272";
const INTRO_MS = 10000;

export default function Home() {
  const [phase, setPhase] = useState<"intro" | "flash" | "main">("intro");
  const [videoActive, setVideoActive] = useState(false);
  const transitioned = useRef(false);

  const goToMain = useCallback(() => {
    if (transitioned.current) return;
    transitioned.current = true;
    setPhase("flash");
    setTimeout(() => setPhase("main"), 800);
  }, []);

  useEffect(() => {
    if (phase !== "intro") return;
    const t = setTimeout(goToMain, INTRO_MS);
    return () => clearTimeout(t);
  }, [phase, goToMain]);

  return (
    <>
      {/* ═══════════ INTRO: 10-second YouTube teaser ═══════════ */}
      {phase === "intro" && (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden">
          <iframe
            className="absolute inset-0 w-full h-full pointer-events-none scale-125"
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Uniendo Familias - Adelanto"
          />

          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Skip */}
          <button
            onClick={goToMain}
            className="absolute bottom-8 right-6 sm:right-8 z-10 px-5 py-2.5 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/25 transition-all text-xs sm:text-sm font-medium tracking-widest uppercase border border-white/20"
          >
            Saltar
          </button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-10">
            <div
              className="h-full rounded-r-full"
              style={{
                animation: "progress 10s linear forwards",
                background: "linear-gradient(90deg, #C5A55A, #E5D5A0)",
              }}
            />
          </div>
        </div>
      )}

      {/* ═══════════ FLASH TRANSITION ═══════════ */}
      {phase === "flash" && (
        <div className="fixed inset-0 z-50 bg-white animate-flash" />
      )}

      {/* ═══════════ MAIN: Single screen, no scroll ═══════════ */}
      <div className={phase === "main" ? "animate-fadeIn" : "hidden"}>
        <main className="h-screen overflow-hidden flex flex-col items-center px-4 sm:px-6 py-4 sm:py-6 md:py-8 relative">
          {/* ── Background: Gold/White/Cream waves with blue accents ── */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #FBF7EC 12%, #F0E4C0 30%, #E5D5A0 48%, #C5A55A 55%, #E5D5A0 62%, #F0E4C0 75%, #FBF7EC 88%, #FFFFFF 100%)",
            }}
          >
            {/* Blue wave accents (subtle) */}
            <svg
              className="absolute top-[8%] left-0 w-full h-[100px] opacity-[0.06]"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
            >
              <path
                fill="#0D1B3E"
                d="M0,50 C360,100 720,0 1440,70 L1440,100 L0,100 Z"
              />
            </svg>
            <svg
              className="absolute top-[38%] left-0 w-full h-[100px] opacity-[0.04]"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
            >
              <path
                fill="#1A3A6B"
                d="M0,20 C480,90 960,10 1440,60 L1440,100 L0,100 Z"
              />
            </svg>
            <svg
              className="absolute bottom-[18%] left-0 w-full h-[100px] opacity-[0.06]"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
            >
              <path
                fill="#0D1B3E"
                d="M0,70 C240,10 720,90 1440,30 L1440,100 L0,100 Z"
              />
            </svg>
            <svg
              className="absolute bottom-[2%] left-0 w-full h-[60px] opacity-[0.03]"
              viewBox="0 0 1440 60"
              preserveAspectRatio="none"
            >
              <path
                fill="#1A3A6B"
                d="M0,30 C360,60 1080,0 1440,45 L1440,60 L0,60 Z"
              />
            </svg>
            {/* Gold shimmer glows */}
            <div className="absolute top-[20%] left-[5%] w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[20%] right-[5%] w-56 h-56 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-72 h-32 bg-gold/8 rounded-full blur-3xl" />
          </div>

          {/* ── Logo (no white background, blend with gold/cream bg) ── */}
          <div className="relative z-10 shrink-0">
            <Image
              src="/LogoManuelSolis.png"
              alt="Law Offices of Manuel Solis"
              width={320}
              height={80}
              priority
              className="h-14 sm:h-18 md:h-22 w-auto mix-blend-multiply"
            />
          </div>

          {/* ── Center: Title + Video ── */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0 w-full gap-3 sm:gap-4 py-2">
            {/* Title */}
            <div className="text-center shrink-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gradient-gold leading-none">
                UNIENDO FAMILIAS
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-navy/50 tracking-[0.25em] uppercase mt-1 sm:mt-1.5">
                Con Manuel Solis
              </p>
            </div>

            {/* Video container */}
            <div
              className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_10px_50px_rgba(197,165,90,0.35)] border-2 border-gold/30"
              style={{
                width: "min(92vw, calc(44vh * 16 / 9), 820px)",
              }}
            >
              {!videoActive ? (
                <button
                  onClick={() => setVideoActive(true)}
                  className="relative w-full h-full block cursor-pointer bg-black group"
                  aria-label="Reproducir video completo"
                >
                  <Image
                    src="/CoverVideo.png"
                    alt="Uniendo Familias - Ep. 2 Eva López - Tres Décadas de Vuelta a Casa"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 92vw, 820px"
                    priority
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent group-hover:from-black/25 group-hover:via-transparent transition-all duration-500" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="play-btn group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white ml-0.5 sm:ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 sm:px-5 sm:py-2 bg-white/15 backdrop-blur-md rounded-full text-white text-[10px] sm:text-xs font-medium tracking-widest uppercase border border-white/20 whitespace-nowrap">
                      Ver Video Completo
                    </span>
                  </div>
                </button>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  title="Uniendo Familias - Ep. 2 Eva López"
                />
              )}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="relative z-10 shrink-0 flex flex-col items-center gap-1.5 sm:gap-2">
            <a
              href={`sms:${PHONE}`}
              className="inline-flex items-center gap-2.5 sm:gap-3 px-7 sm:px-9 md:px-10 py-3.5 sm:py-4 md:py-5 rounded-full text-base sm:text-lg md:text-xl font-bold text-navy transition-all duration-300 hover:scale-105 animate-pulseGlow no-underline"
              style={{
                background:
                  "linear-gradient(135deg, #C5A55A 0%, #E5D5A0 50%, #C5A55A 100%)",
              }}
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-center leading-tight">
                ¡Responde el mensaje!<br />
                Y cambia tu vida
              </span>
            </a>
            <p className="text-navy/35 text-[10px] sm:text-xs tracking-[0.2em] uppercase">
              Consulta disponible en Español
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
