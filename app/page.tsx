"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const YOUTUBE_ID = "3Z6BOOCBgas";

export default function Home() {
  const [showCta, setShowCta] = useState(false);
  const [pulse, setPulse] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Reveal CTA after a short delay for a staggered entrance
  useEffect(() => {
    const t1 = setTimeout(() => setShowCta(true), 1200);
    const t2 = setTimeout(() => setPulse(true), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Scroll CTA into view on mobile when it appears
  useEffect(() => {
    if (showCta && ctaRef.current && window.innerWidth < 640) {
      setTimeout(() => {
        ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 400);
    }
  }, [showCta]);

  return (
    <main className="min-h-[100dvh] flex flex-col items-center relative overflow-x-hidden">
      {/* ── Background ── */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FBF7EC 10%, #F0E4C0 28%, #E5D5A0 46%, #C5A55A 54%, #E5D5A0 62%, #F0E4C0 76%, #FBF7EC 90%, #FFFFFF 100%)",
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
        <div className="absolute top-[20%] left-[5%] w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[5%] w-56 h-56 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-72 h-32 bg-gold/8 rounded-full blur-3xl" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center px-4 sm:px-6 py-4 sm:py-6 gap-3 sm:gap-4">

        {/* Logo */}
        <div className="animate-fadeIn">
          <Image
            src="/LogoManuelSolis.png"
            alt="Law Offices of Manuel Solis"
            width={400}
            height={100}
            priority
            className="h-14 sm:h-18 md:h-24 w-auto mix-blend-multiply"
          />
        </div>

        {/* Trust bar */}
        <div className="animate-slideUp flex items-center gap-2 sm:gap-3 text-navy/60 text-[10px] sm:text-xs tracking-wide uppercase font-medium">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            35+ Años de Experiencia
          </span>
          <span className="w-px h-3 bg-navy/20" />
          <span>Houston, TX</span>
        </div>

        {/* Headline */}
        <div className="text-center animate-slideUp" style={{ animationDelay: "0.15s" }}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gradient-gold leading-tight">
            CASO REAL DE ÉXITO
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-navy/70 max-w-sm mx-auto mt-1.5 leading-snug">
            Mira cómo logramos reunificar a esta familia. Tu historia puede ser la siguiente.
          </p>
        </div>

        {/* YouTube video */}
        <div
          className="animate-slideUp w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(197,165,90,0.35)] border-2 border-gold/30 relative"
          style={{
            animationDelay: "0.3s",
            maxWidth: "560px",
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

        {/* Social proof badges */}
        <div className="animate-slideUp flex flex-wrap justify-center gap-2 sm:gap-3" style={{ animationDelay: "0.45s" }}>
          {[
            { icon: "shield", text: "Consulta Confidencial" },
            { icon: "users", text: "+10,000 Familias" },
            { icon: "globe", text: "Se Habla Español" },
          ].map(({ icon, text }) => (
            <div
              key={icon}
              className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-gold/20 text-navy/80 text-[10px] sm:text-xs font-medium shadow-sm"
            >
              {icon === "shield" && (
                <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              )}
              {icon === "users" && (
                <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              )}
              {icon === "globe" && (
                <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              )}
              {text}
            </div>
          ))}
        </div>

        {/* ── CTA Section ── */}
        <div
          ref={ctaRef}
          className={`w-full transition-all duration-700 ${showCta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className={`relative bg-navy rounded-2xl p-4 sm:p-6 text-center shadow-xl border border-gold/30 overflow-hidden ${pulse ? "animate-pulseGlow" : ""}`}>
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-2xl" />

            {/* Urgency badge */}
            <div className="inline-flex items-center gap-1.5 bg-red-500/90 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1 mb-3 animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              Cupo Limitado
            </div>

            <h2 className="text-white text-base sm:text-lg md:text-xl font-bold leading-snug mb-1">
              ¿Quieres reunir a tu familia?
            </h2>
            <p className="text-gold-light/80 text-xs sm:text-sm mb-4 leading-relaxed max-w-xs mx-auto">
              Da el primer paso hoy. Nuestro equipo está listo para evaluar tu caso <strong className="text-gold">sin compromiso</strong>.
            </p>

            {/* The SMS CTA */}
            <div className="bg-green-500 hover:bg-green-600 transition-colors rounded-xl p-3 sm:p-4 cursor-default select-none">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                {/* SMS icon */}
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-white text-lg sm:text-xl md:text-2xl font-black tracking-wide">
                  &quot;ME INTERESA&quot;
                </span>
              </div>
              <p className="text-white/90 text-xs sm:text-sm font-medium">
                Responde con esas palabras al SMS que recibiste
              </p>
            </div>

            {/* Arrow pointing to SMS */}
            <div className="mt-3 flex items-center justify-center gap-2 text-gold-light/60 text-[10px] sm:text-xs">
              <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
              <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
            </div>
          </div>
        </div>

        {/* Footer trust line */}
        <p className="text-[9px] sm:text-[10px] text-navy/40 text-center mt-1 pb-2">
          Law Offices of Manuel Solis &middot; Houston, TX &middot; 35+ años de experiencia en inmigración
        </p>
      </div>
    </main>
  );
}
