import { useState } from 'react';

export default function HeroBanner() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="w-full relative bg-[#080c10] overflow-hidden pt-24 pb-24 sm:pb-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Video Banner Container */}
        <div className="w-full relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl" style={{ aspectRatio: '16/6' }}>
          {!videoFailed && (
            <video
              src="/images/banner.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              onError={() => setVideoFailed(true)}
            />
          )}

          {/* Fallback: hero gradient shown if video fails */}
          {videoFailed && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#080c10] via-[#0d1117] to-[#1a2332] flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 tracking-tight">
                  LFS <span className="text-[#02cbf9]">Watch</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-white/60 font-semibold">
                  Premium Timepieces for Every Occasion
                </p>
                <div className="mt-6 flex gap-4 justify-center">
                  <div className="w-16 h-1 bg-[#02cbf9] rounded-full" />
                  <div className="w-8 h-1 bg-[#58e7e4] rounded-full" />
                  <div className="w-4 h-1 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
          )}

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#080c10] to-transparent pointer-events-none" />
          {/* Top gradient fade for navbar */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#080c10]/60 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
