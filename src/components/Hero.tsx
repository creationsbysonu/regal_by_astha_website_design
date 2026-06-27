import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Label entrance
      tl.to('.hero-label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Title words — 3D rotateY stagger
      tl.to('.hero-title .word', {
        opacity: 1,
        rotateY: 0,
        translateZ: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
      }, '-=0.4');

      // Subtitle
      tl.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5');

      // Actions
      tl.to('.hero-actions', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4');

      // Scroll indicator
      tl.to('.hero-scroll-indicator', {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.2');

      // Pin hero and compress on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=50%',
        pin: false,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (heroRef.current) {
            heroRef.current.style.transform = `perspective(1200px) scale(${1 - progress * 0.08})`;
            heroRef.current.style.opacity = `${1 - progress * 0.3}`;
            heroRef.current.style.borderRadius = `${progress * 24}px`;
          }
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ['Unveil', 'Your', 'Regal', 'Elegance.'];

  return (
    <section ref={heroRef} className="hero" id="hero">
      <div className="hero-bg">
        <img src="/images/images_from_facebook/rba_image_12.jpg" alt="Luxury bridal makeup by Regal By Aastha" />
      </div>
      <div className="hero-overlay" />

      <div className="hero-particles">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      <div className="hero-content">
        <p className="hero-label" style={{ transform: 'translateY(20px)' }}>
          ✦ Biratnagar's Premier Bridal Studio ✦
        </p>

        <h1 ref={titleRef} className="hero-title preserve-3d">
          {titleWords.map((word, i) => (
            <span key={i} className={`word ${word === 'Regal' ? 'font-signature' : ''}`} style={word === 'Regal' ? { fontSize: '1.2em', padding: '0 10px', textTransform: 'none' } : {}}>
              {word}
            </span>
          ))}
        </h1>

        <p className="hero-subtitle" style={{ transform: 'translateY(20px)' }}>
          Where artistry meets elegance. Luxury bridal makeup, bespoke nail artistry,
          and professional beauty masterclasses — crafted exclusively for you.
        </p>

        <div className="hero-actions" style={{ transform: 'translateY(20px)' }}>
          <a href="#contact" className="btn-primary pulse-glow">
            Book Your Consultation
          </a>
          <a href="#portfolio" className="btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
            View Portfolio →
          </a>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
