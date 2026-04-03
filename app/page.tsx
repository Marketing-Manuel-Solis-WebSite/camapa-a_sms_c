"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const YOUTUBE_ID = "3Z6BOOCBgas";
const PHONE = "+18329248272";
const PHONE_DISPLAY = "+1 (832) 924-8272";
const INTRO_MS = 15000;

export default function Home() {
  const [phase, setPhase] = useState<"intro" | "flash" | "main">("intro");
  const [videoActive, setVideoActive] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const transitioned = useRef(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  const goToMain = useCallback(() => {
    if (transitioned.current) return;
    transitioned.current = true;
    setPhase("flash");
    setTimeout(() => setPhase("main"), 800);
  }, []);

  const handleIntroTimeUpdate = useCallback(() => {
    if (introVideoRef.current && introVideoRef.current.currentTime >= 15) {
      goToMain();
    }
  }, [goToMain]);

  /* Try autoplay WITH sound first; if browser blocks it, fall back to muted */
  useEffect(() => {
    if (phase !== "intro" || !introVideoRef.current) return;
    const video = introVideoRef.current;
    video.muted = false;
    video.volume = 1;
    const playPromise = video.play();
    if (playPromise) {
      playPromise
        .then(() => setIsMuted(false))
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "intro") return;
    const t = setTimeout(goToMain, INTRO_MS);
    return () => clearTimeout(t);
  }, [phase, goToMain]);

  useEffect(() => {
    if (phase === "main") setVideoActive(true);
  }, [phase]);

  const handleUnmute = useCallback(() => {
    if (introVideoRef.current) {
      introVideoRef.current.muted = false;
      introVideoRef.current.volume = 1;
      setIsMuted(false);
    }
  }, []);

  return (
    <>
      {/* ═══════════ INTRO ═══════════ */}
      {phase === "intro" && (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden">
          <video
            ref={introVideoRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            src="/VideoInicio.mp4"
            playsInline
            onTimeUpdate={handleIntroTimeUpdate}
          />

          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Unmute button – only visible when browser blocked autoplay sound */}
          {isMuted && (
            <button
              onClick={handleUnmute}
              className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2.5 bg-white/15 backdrop-blur-md rounded-full text-white hover:bg-white/25 transition-all text-xs font-medium tracking-wide border border-white/20"
              aria-label="Activar sonido"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
              Activar sonido
            </button>
          )}

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
                animation: "progress 15s linear forwards",
                background: "linear-gradient(90deg, #C5A55A, #E5D5A0)",
              }}
            />
          </div>
        </div>
      )}

      {/* ═══════════ FLASH ═══════════ */}
      {phase === "flash" && (
        <div className="fixed inset-0 z-50 bg-white animate-flash" />
      )}

      {/* ═══════════ MAIN – single viewport, zero scroll ═══════════ */}
      <div className={phase === "main" ? "animate-fadeIn" : "hidden"}>
        {/* h-screen as fallback; inline style overrides with 100dvh for mobile */}
        <main
          className="h-screen overflow-hidden flex flex-col items-center px-3 sm:px-5 py-2 sm:py-3 md:py-5 relative"
          style={{ height: "100dvh" }}
        >
          {/* ── Background ── */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #FBF7EC 12%, #F0E4C0 30%, #E5D5A0 48%, #C5A55A 55%, #E5D5A0 62%, #F0E4C0 75%, #FBF7EC 88%, #FFFFFF 100%)",
            }}
          >
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
            <div className="absolute top-[20%] left-[5%] w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[20%] right-[5%] w-56 h-56 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-72 h-32 bg-gold/8 rounded-full blur-3xl" />
          </div>

          {/* ── Logo ── */}
          <div className="relative z-10 shrink-0">
            <Image
              src="/LogoManuelSolis.png"
              alt="Law Offices of Manuel Solis"
              width={320}
              height={80}
              priority
              className="h-10 sm:h-14 md:h-18 w-auto mix-blend-multiply"
            />
          </div>

          {/* ── Center: Title + Video ── */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0 w-full gap-1.5 sm:gap-2 md:gap-3 py-1">
            {/* Title */}
            <div className="text-center shrink-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gradient-gold leading-none">
                CASO REAL DE ÉXITO
              </h1>
              <p className="text-[10px] sm:text-xs md:text-sm text-navy/60 max-w-xs sm:max-w-sm md:max-w-md mt-0.5 sm:mt-1 leading-snug text-center mx-auto">
                Conoce este caso real de reunificación familiar, respaldado por
                los 35 años de experiencia de la Firma del Abogado Manuel Solís.
              </p>
            </div>

            {/* Video – grows to fill remaining space while keeping 16:9 */}
            <div className="flex-1 min-h-0 w-full flex items-center justify-center">
              <div
                className="relative aspect-video max-h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_10px_50px_rgba(197,165,90,0.35)] border-2 border-gold/30"
                style={{ width: "min(92vw, 820px)" }}
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
          </div>

          {/* ── CTA ── */}
          <div className="relative z-10 shrink-0 flex flex-col items-center">
            <a
              href={`sms:${PHONE}`}
              className="inline-flex items-center gap-2 sm:gap-2.5 px-5 sm:px-7 md:px-9 py-2.5 sm:py-3.5 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-medium text-white transition-all duration-300 hover:scale-105 animate-pulseGlow-green no-underline"
              style={{
                background:
                  "linear-gradient(135deg, #16A34A 0%, #22C55E 50%, #16A34A 100%)",
              }}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0"
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
                Retoma tu proceso y<br />
                <span className="font-bold">agenda tu consulta</span>
              </span>
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
