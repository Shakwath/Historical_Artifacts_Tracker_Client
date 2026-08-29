import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaCompass, FaPlus } from 'react-icons/fa';
import img1 from '../assets/Banner 1.png';
import img2 from '../assets/Banner 2.png';
import img3 from '../assets/Banner 3.png';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const slides = [
    {
      image: img1,
      title: "Unveil the Mysteries of the Past",
      description: "Explore verified historical artifacts from ancient civilizations, lost cities, and medieval empires.",
      primaryCta: "Explore Artifacts",
      primaryLink: "/allartifacts",
      primaryIcon: <FaCompass className="text-sm" />,
      secondaryCta: "Add to Collection",
      secondaryLink: "/addartifacts",
      secondaryIcon: <FaPlus className="text-sm" />
    },
    {
      image: img2,
      title: "Guardians of Human Heritage",
      description: "Join a passionate community of historians, archaeologists, and collectors to preserve our shared legacy.",
      primaryCta: "Browse Gallery",
      primaryLink: "/allartifacts",
      primaryIcon: <FaCompass className="text-sm" />,
      secondaryCta: "Share Discoveries",
      secondaryLink: "/addartifacts",
      secondaryIcon: <FaPlus className="text-sm" />
    },
    {
      image: img3,
      title: "Track History's Treasures",
      description: "Find detailed records, historical significance, origins, and stories behind legendary discoveries.",
      primaryCta: "Search Artifacts",
      primaryLink: "/allartifacts",
      primaryIcon: <FaCompass className="text-sm" />,
      secondaryCta: "Join Tracker",
      secondaryLink: "/addartifacts",
      secondaryIcon: <FaPlus className="text-sm" />
    }
  ];

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div 
      className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                isActive 
                  ? 'opacity-100 scale-100 pointer-events-auto z-10' 
                  : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
            >
              {/* Slide Background Image */}
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.75] dark:brightness-[0.6] transition-transform duration-[12s] ease-out scale-105"
                style={{ transform: isActive ? 'scale(1)' : 'scale(1.05)' }}
              />

              {/* Ambient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
              
              {/* Slide Content Overlays */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 max-w-3xl text-white">
                <div className={`space-y-4 sm:space-y-6 transition-all duration-700 delay-300 transform ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full">
                    Historical Artifacts Tracker
                  </span>
                  
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
                    {slide.title}
                  </h1>
                  
                  <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-light max-w-xl">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                    <Link
                      to={slide.primaryLink}
                      className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-98 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35"
                    >
                      {slide.primaryIcon}
                      <span>{slide.primaryCta}</span>
                    </Link>
                    <Link
                      to={slide.secondaryLink}
                      className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl border border-white/30 backdrop-blur-sm bg-white/10 hover:bg-white text-white hover:text-slate-900 font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-98"
                    >
                      {slide.secondaryIcon}
                      <span>{slide.secondaryCta}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 hover:bg-amber-500 text-white transition-all duration-300 border border-white/10 hover:border-amber-500 hover:scale-110 shadow-lg cursor-pointer opacity-0 group-hover:opacity-100 hidden sm:flex items-center justify-center"
      >
        <FaArrowLeft className="w-4 h-4" />
      </button>
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 hover:bg-amber-500 text-white transition-all duration-300 border border-white/10 hover:border-amber-500 hover:scale-110 shadow-lg cursor-pointer opacity-0 group-hover:opacity-100 hidden sm:flex items-center justify-center"
      >
        <FaArrowRight className="w-4 h-4" />
      </button>

      {/* Pagination Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide 
                ? 'w-8 bg-amber-500 shadow-md shadow-amber-500/50' 
                : 'w-2.5 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;