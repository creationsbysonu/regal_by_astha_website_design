import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  { title: 'Elegant Bridal Glam', category: 'Bridal', image: '/images/images_from_facebook/rba_image_8.jpg' },
  { title: 'Red & Gold Bride', category: 'Bridal', image: '/images/images_from_facebook/rba_image_9.jpg' },
  { title: 'Editorial Smokey Eye', category: 'Event', image: '/images/images_from_facebook/rba_image_10.jpg' },
  { title: 'Luxury Nail Art', category: 'Nails', image: '/images/images_from_facebook/rba_image_11.jpg' },
  { title: 'Studio Session', category: 'Event', image: '/images/images_from_facebook/rba_image_13.jpg' },
  { title: 'Masterclass Look', category: 'Event', image: '/images/images_from_facebook/rba_image_14.jpg' },
  { title: 'Golden Hour Bride', category: 'Bridal', image: '/images/images_from_facebook/rba_image_15.jpg' },
  { title: 'Burgundy Nail Set', category: 'Nails', image: '/images/images_from_facebook/rba_image_5.jpg' },
];

const categories = ['All', 'Bridal', 'Event', 'Nails'];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('All');

  const filteredItems = activeTab === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeTab);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.portfolio-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-header',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!trackRef.current || !wrapperRef.current) return;

    // Kill existing portfolio ScrollTriggers
    ScrollTrigger.getAll()
      .filter(st => st.vars.id === 'portfolio-scroll')
      .forEach(st => st.kill());

    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    const scrollWidth = track.scrollWidth - wrapper.offsetWidth;

    if (scrollWidth <= 0) return;

    const st = gsap.to(track, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        id: 'portfolio-scroll',
        trigger: wrapper,
        start: 'top 20%',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Scale items as they enter center
    gsap.utils.toArray<HTMLElement>('.portfolio-item').forEach((item) => {
      gsap.fromTo(item,
        { scale: 0.85, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            containerAnimation: st,
            start: 'left 80%',
            end: 'left 40%',
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll()
        .filter(s => s.vars.id === 'portfolio-scroll')
        .forEach(s => s.kill());
    };
  }, [filteredItems]);

  return (
    <section ref={sectionRef} className="portfolio" id="portfolio">
      <div className="container">
        <div className="portfolio-header">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">The Gallery</h2>
          <div className="gold-line-center" />
        </div>

        <div className="portfolio-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`portfolio-tab ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div ref={wrapperRef} className="portfolio-scroll-wrapper">
        <div ref={trackRef} className="portfolio-track" style={{ paddingLeft: 'calc((100vw - 1280px) / 2 + 1.5rem)' }}>
          {filteredItems.map((item, i) => (
            <div key={`${item.title}-${i}`} className="portfolio-item">
              <img src={item.image} alt={item.title} />
              <div className="portfolio-item-overlay">
                <span className="portfolio-item-cat">{item.category}</span>
                <span className="portfolio-item-title">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
