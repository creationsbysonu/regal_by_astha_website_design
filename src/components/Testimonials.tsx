import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: '"Aastha made me feel like an absolute queen on my wedding day. Every detail was perfect — from the lashes to the lip colour. My makeup lasted 14 hours without a single touch-up!"',
    name: 'Priya Sharma',
    role: 'Bride — December 2025',
    stars: 5,
  },
  {
    text: '"The nail artistry at Regal is unmatched. I came in with a vague idea and Aastha created the most stunning set I\'ve ever had. I get compliments everywhere I go!"',
    name: 'Sneha Gupta',
    role: 'Nail Art Client',
    stars: 5,
  },
  {
    text: '"I took the bridal masterclass and it completely transformed my skills. Aastha is patient, incredibly knowledgeable, and truly passionate about what she does. Best investment I\'ve made."',
    name: 'Anjali Thakur',
    role: 'Masterclass Student',
    stars: 5,
  },
  {
    text: '"For my engagement, I wanted something bold but elegant. Aastha nailed it. The smokey eye she created was editorial-level. I felt like a magazine cover star."',
    name: 'Ritu Mehta',
    role: 'Engagement Client',
    stars: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);

    // 3D card flip out
    gsap.to(cardRef.current, {
      rotateY: -90,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(index);
        // 3D card flip in
        gsap.fromTo(cardRef.current,
          { rotateY: 90, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power3.out',
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (activeIndex + 1) % testimonials.length;
      goTo(next);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonials-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-header',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo('.testimonial-carousel',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonial-carousel',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = testimonials[activeIndex];

  return (
    <section ref={sectionRef} className="testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <span className="section-label">Client Love</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="gold-line-center" />
        </div>

        <div className="testimonial-carousel perspective-container">
          <div ref={cardRef} className="testimonial-card preserve-3d">
            <div className="testimonial-stars">
              {Array.from({ length: current.stars }).map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
            <p className="testimonial-text">{current.text}</p>
            <div className="testimonial-author">
              <span className="testimonial-name">{current.name}</span>
              <span className="testimonial-role">{current.role}</span>
            </div>
          </div>

          <div className="testimonial-nav">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === activeIndex ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
