"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const YOUTUBE_ID = "3Z6BOOCBgas";
const PHONE = "+18329248272";
const INTRO_MS = 15000;

/* ── Volume icon SVGs ── */
function VolumeOnIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M11 5L6 9H2v6h4l5 4V5z" />
    </svg>
  );
}
function VolumeOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H2v-6h3.586L11 4v16l-5.414-5zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
    </svg>
  );
}

export default function Home() {
  const [phase, setPhase] = useState<"intro" | "flash" | "main">("intro");
  const [videoActive, setVideoActive] = useState(false);
  const [introMuted, setIntroMuted] = useState(false);
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

  /* Autoplay with sound. If the browser blocks it, fall back to muted. */
  useEffect(() => {
    if (phase !== "intro" || !introVideoRef.current) return;
    const video = introVideoRef.current;
    video.muted = false;
    video.volume = 1;
    const p = video.play();
    if (p) {
      p.catch(() => {
        // Browser blocked sound — play muted as fallback
        video.muted = true;
        setIntroMuted(true);
        video.play().catch(() => {});
      });
    }
  }, [phase]);

  const toggleIntroMute = useCallback(() => {
    if (!introVideoRef.current) return;
    const next = !introMuted;
    introVideoRef.current.muted = next;
    setIntroMuted(next);
  }, [introMuted]);

  useEffect(() => {
    if (phase !== "intro") return;
    const t = setTimeout(goToMain, INTRO_MS);
    return () => clearTimeout(t);
  }, [phase, goToMain]);

  useEffect(() => {
    if (phase === "main") setVideoActive(true);
  }, [phase]);

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

          {/* Mute / Unmute toggle */}
          <button
            onClick={toggleIntroMute}
            className="absolute top-6 left-6 z-20 w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-all border border-white/20"
            aria-label={introMuted ? "Activar sonido" : "Silenciar"}
          >
            {introMuted ? (
              <VolumeOffIcon className="w-5 h-5" />
            ) : (
              <VolumeOnIcon className="w-5 h-5" />
            )}
          </button>

          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Only button: Skip */}
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

      {/* ═══════════ MAIN – everything in one screen, zero scroll ═══════════ */}
      <div className={phase === "main" ? "animate-fadeIn" : "hidden"}>
        <main
          className="h-screen overflow-hidden flex flex-col items-center px-3 sm:px-5 pt-2 pb-5 sm:pt-3 sm:pb-6 md:pt-5 md:pb-8 relative"
          style={{ height: "100dvh" }}
        >
          {/* ── Background ── */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(180deg, #FBF7EC 0%, #F0E4C0 18%, #E5D5A0 35%, #C5A55A 50%, #E5D5A0 65%, #F0E4C0 82%, #FBF7EC 100%)",
            }}
          >
            <svg className="absolute top-[8%] left-0 w-full h-[100px] opacity-[0.06]" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path fill="#0D1B3E" d="M0,50 C360,100 720,0 1440,70 L1440,100 L0,100 Z" />
            </svg>
            <svg className="absolute top-[38%] left-0 w-full h-[100px] opacity-[0.04]" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path fill="#1A3A6B" d="M0,20 C480,90 960,10 1440,60 L1440,100 L0,100 Z" />
            </svg>
            <svg className="absolute bottom-[18%] left-0 w-full h-[100px] opacity-[0.06]" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path fill="#0D1B3E" d="M0,70 C240,10 720,90 1440,30 L1440,100 L0,100 Z" />
            </svg>
            <svg className="absolute bottom-[2%] left-0 w-full h-[60px] opacity-[0.03]" viewBox="0 0 1440 60" preserveAspectRatio="none">
              <path fill="#1A3A6B" d="M0,30 C360,60 1080,0 1440,45 L1440,60 L0,60 Z" />
            </svg>
            <div className="absolute top-[20%] left-[5%] w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[20%] right-[5%] w-56 h-56 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-72 h-32 bg-gold/8 rounded-full blur-3xl" />
          </div>

          {/* ── Logo ── */}
          <div className="relative z-10 shrink-0 mt-3 sm:mt-4 md:mt-5">
            <Image
              src="/LogoManuelSolis.png"
              alt="Law Offices of Manuel Solis"
              width={320}
              height={80}
              priority
              className="h-16 sm:h-20 md:h-24 w-auto mix-blend-multiply"
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

            {/* Video – height capped so CTA always stays visible */}
            <div className="w-full flex items-center justify-center">
              <div
                className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_10px_50px_rgba(197,165,90,0.35)] border-2 border-gold/30"
                style={{
                  aspectRatio: "16/9",
                  width: "min(92vw, 820px)",
                  maxHeight: "calc(100vh - 15rem)",
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
                      alt="Uniendo Familias - Ep. 2 Eva López"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 92vw, 820px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent group-hover:from-black/25 group-hover:via-transparent transition-all duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="play-btn group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
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
            <p className="text-base sm:text-lg md:text-xl font-semibold text-navy/80 text-center leading-snug">
              Responde a este mensaje con un{" "}
              <span className="text-green-600 font-bold">&ldquo;Me interesa&rdquo;</span>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
