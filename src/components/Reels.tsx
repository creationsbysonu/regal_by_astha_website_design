import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  { src: '/videos/rba_video_1.mp4', title: 'Bridal Glamour' },
  { src: '/videos/rba_video_2.mp4', title: 'Studio Session' },
  { src: '/videos/rba_video_3.mp4', title: 'Masterclass Snippets' },
  { src: '/videos/rba_video_4.mp4', title: 'Behind the Scenes' }
];

export default function Reels() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reels-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reels-header',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo('.reel-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reels-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="reels" id="reels" style={{ padding: 'var(--space-2xl) 0', backgroundColor: 'var(--bg-section-alt)' }}>
      <div className="container">
        <div className="reels-header" style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <span className="section-label">Studio Highlights</span>
          <h2 className="section-title">Video Reels</h2>
          <div className="gold-line-center" />
        </div>

        <div className="reels-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {videos.map((video, i) => (
            <div key={i} className="reel-card" style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              aspectRatio: '9/16'
            }}>
              <video
                src={video.src}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '1.5rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                color: 'white'
              }}>
                <h3 className="font-signature" style={{ fontSize: '1.8rem', margin: 0, textTransform: 'none' }}>{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
