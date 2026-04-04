"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const YOUTUBE_ID = "3Z6BOOCBgas";
const PHONE = "+17133227646";

export default function Home() {
  const [phase, setPhase] = useState<"intro" | "flash" | "main">("intro");
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const transitioned = useRef(false);
  const [videoReady, setVideoReady] = useState(false);

  const goToMain = useCallback(() => {
    if (transitioned.current) return;
    transitioned.current = true;
    const video = introVideoRef.current;
    if (video) video.pause();
    setPhase("flash");
    setTimeout(() => setPhase("main"), 800);
  }, []);

  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = useCallback(() => {
    const v = introVideoRef.current;
    if (!v) return;
    if (v.muted) {
      v.muted = false;
      v.volume = 1;
      setIsMuted(false);
    } else {
      v.muted = true;
      setIsMuted(true);
    }
  }, []);

  useEffect(() => {
    const video = introVideoRef.current;
    if (!video) return;

    const onEnded = () => goToMain();
    const onCanPlay = () => setVideoReady(true);
    video.addEventListener("ended", onEnded);
    video.addEventListener("canplay", onCanPlay);

    // Skip intro after 8s if video still hasn't loaded
    const timeout = setTimeout(() => {
      if (!videoReady) goToMain();
    }, 8000);

    // Start muted — autoplay guaranteed. User must tap to unmute.
    video.muted = true;
    setIsMuted(true);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("canplay", onCanPlay);
      clearTimeout(timeout);
    };
  }, [goToMain, videoReady]);

  const isIntro = phase === "intro";

  return (
    <>
      {/* ═══════════ INTRO VIDEO (always in DOM for preload) ═══════════ */}
      <div
        className="fixed inset-0 z-50 bg-black overflow-hidden"
        style={{ display: isIntro ? "block" : "none" }}
      >
        <video
          ref={introVideoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          src="/VideoInicio.mp4"
          muted
          autoPlay
          playsInline
          preload="auto"
          style={{ pointerEvents: "none", opacity: videoReady ? 1 : 0 }}
        />

        {/* Loading indicator — shown while video buffers */}
        {!videoReady && (
          <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="text-white/70 text-sm tracking-widest uppercase animate-pulse">
              Cargando...
            </span>
          </div>
        )}

        {/* Block interaction */}
        <div
          className="absolute inset-0 z-[2]"
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Sound toggle button — top-left corner, small */}
        {videoReady && (
          <button
            onClick={toggleMute}
            className="absolute top-4 left-4 z-[4] flex items-center gap-1.5 active:scale-90 transition-all"
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border ${isMuted ? "bg-white/20 border-white/40 animate-pulse" : "bg-white/10 border-white/20"} backdrop-blur-md`}>
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </div>
            {isMuted && (
              <span className="text-white text-[10px] sm:text-xs font-bold tracking-wide drop-shadow-lg">
                SONIDO
              </span>
            )}
          </button>
        )}

        {/* Skip */}
        <button
          onClick={goToMain}
          className="absolute bottom-8 right-6 sm:right-8 z-[4] px-5 py-2.5 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/25 transition-all text-xs sm:text-sm font-medium tracking-widest uppercase border border-white/20"
        >
          Saltar
        </button>
      </div>

      {/* ═══════════ FLASH ═══════════ */}
      {phase === "flash" && (
        <div className="fixed inset-0 z-50 bg-white animate-flash" />
      )}

      {/* ═══════════ MAIN ═══════════ */}
      <div className={phase === "main" ? "animate-fadeIn" : "hidden"}>
        <main
          className="overflow-hidden flex flex-col items-center px-3 sm:px-5 py-2 sm:py-4 md:py-6 relative"
          style={{ height: "100dvh" }}
        >
          {/* Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #FBF7EC 12%, #F0E4C0 30%, #E5D5A0 48%, #C5A55A 55%, #E5D5A0 62%, #F0E4C0 75%, #FBF7EC 88%, #FFFFFF 100%)",
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

          {/* Logo */}
          <div className="relative z-10 shrink-0 mt-2 sm:mt-3">
            <Image
              src="/LogoManuelSolis.png"
              alt="Law Offices of Manuel Solis"
              width={400}
              height={100}
              preload
              className="h-16 sm:h-20 md:h-28 w-auto mix-blend-multiply"
            />
          </div>

          {/* Center: Title + YouTube Video */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0 w-full gap-1.5 sm:gap-2 py-1">
            <div className="text-center shrink-0">
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-gradient-gold leading-none">
                CASO REAL DE ÉXITO
              </h1>
              <p className="text-[10px] sm:text-xs md:text-sm text-navy/70 max-w-[260px] sm:max-w-sm mx-auto mt-1 leading-snug">
                Conoce este caso real de reunificación familiar, respaldado por
                los 35 años de experiencia de la Firma del Abogado Manuel Solís.
              </p>
            </div>

            {/* YouTube video */}
            <div
              className="aspect-video rounded-lg sm:rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(197,165,90,0.35)] border-2 border-gold/30 relative"
              style={{
                width: "min(88vw, calc(36dvh * 16 / 9), 560px)",
              }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                title="Uniendo Familias - Ep. 2 Eva López"
              />
            </div>
          </div>

          {/* CTA — llamada telefónica */}
          <div className="relative z-10 shrink-0 text-center max-w-[300px] sm:max-w-sm mx-auto pb-1 -mt-4 sm:-mt-6 flex flex-col items-center gap-1.5">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex flex-col items-center px-8 py-3 sm:py-3.5 bg-gradient-to-b from-green-500 to-green-700 text-white font-bold text-base sm:text-lg rounded-full shadow-[0_4px_24px_rgba(34,197,94,0.5)] hover:shadow-[0_4px_32px_rgba(34,197,94,0.7)] active:scale-95 transition-all tracking-wide"
            >
              <span>LLAMA AHORA</span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider opacity-90">(713) 322-7646</span>
            </a>
            <p className="text-[10px] sm:text-xs text-navy/60 leading-snug">
              Te atendemos hoy mismo.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
