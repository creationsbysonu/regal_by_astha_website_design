import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Bridal Artistry',
    desc: 'Flawless, long-lasting glamour for your most important day. Customized looks that complement your outfit, skin tone, and personality.',
    image: '/images/service-bridal.png',
  },
  {
    title: 'Event & Editorial',
    desc: 'Stand out with bespoke looks for engagements, receptions, parties, and editorial shoots that turn heads.',
    image: '/images/service-event.png',
  },
  {
    title: 'Nail Artistry',
    desc: 'Precision nail extensions, intricate nail art, and luxurious manicures that are wearable works of art.',
    image: '/images/service-nails.png',
  },
  {
    title: 'Masterclasses',
    desc: 'Elevate your skills with our professional makeup courses. Learn industry techniques from a seasoned expert.',
    image: '/images/service-masterclass.png',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.services-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-header',
            start: 'top 85%',
          },
        }
      );

      // Cards: enter with rotateX tilt, staggered
      gsap.fromTo('.service-card',
        { opacity: 0, rotateX: 20, y: 60 },
        {
          opacity: 1,
          rotateX: 8,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="services" id="services">
      <div className="container">
        <div className="services-header">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Our Signature Services</h2>
          <div className="gold-line-center" />
        </div>

        <div className="services-grid perspective-container">
          {services.map((service, i) => (
            <div key={i} className="service-card">
              <div className="service-card-image">
                <img src={service.image} alt={service.title} />
                <div className="service-card-overlay">
                  <button className="btn-secondary">Learn More</button>
                </div>
              </div>
              <div className="service-card-body">
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
