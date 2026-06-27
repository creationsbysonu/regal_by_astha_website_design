import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax with 3D rotateY
      gsap.fromTo('.about-image',
        { rotateY: -15, opacity: 0, x: -60 },
        {
          rotateY: -5,
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-image-wrapper',
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Text reveals staggered
      const textElements = ['.about-content .section-label', '.about-content .section-title', '.about-text', '.about-stats'];
      textElements.forEach((sel, i) => {
        gsap.fromTo(sel,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sel,
              start: 'top 85%',
            },
            delay: i * 0.15,
          }
        );
      });

      // Gold line draw animation
      gsap.fromTo('.about .gold-line',
        { width: 0 },
        {
          width: 60,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about .gold-line',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about" id="about">
      <div className="container">
        <div className="about-inner">
          <div className="about-image-wrapper perspective-container">
            <div className="about-image">
              <img src="/images/images_from_facebook/rba_image_4.jpg" alt="Aastha — Makeup Artist at Regal Studio" />
            </div>
            <div className="about-image-decoration" />
          </div>

          <div className="about-content">
            <span className="section-label">The Regal Treatment</span>
            <h2 className="section-title">Where Artistry Meets Elegance</h2>
            <div className="gold-line" />
            <p className="about-text">
              At Regal By Aastha, we believe that makeup is not about masking — it's about
              revealing the queen within you. Every brushstroke is guided by passion, precision,
              and a deep understanding of what makes you uniquely beautiful.
              <br /><br />
              With years of experience in luxury bridal artistry, nail art, and beauty education,
              Aastha has crafted a sanctuary where every client receives the royal treatment they deserve.
              From intimate bridal sessions to professional masterclasses, every experience at Regal
              is designed to be transformative.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Brides Styled</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">8+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">4.9</div>
                <div className="stat-label">Client Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
