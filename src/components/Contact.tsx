import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend
    alert('Thank you for your inquiry! We will get back to you within 24 hours. 🌟');
    setFormData({ name: '', email: '', phone: '', service: '', date: '', message: '' });
    setFormStep(0);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-header',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo('.contact-form',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo('.contact-info',
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="contact" id="contact">
      <div className="container">
        <div className="contact-header" style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <span className="section-label" style={{ color: 'var(--gold)' }}>Get In Touch</span>
          <h2 className="section-title">Book Your Regal Experience</h2>
          <div className="gold-line-center" />
          <p>Ready to unveil your best look? Fill in the form below and we'll get back to you within 24 hours.</p>
        </div>

        <div className="contact-inner">
          <form className="contact-form" onSubmit={handleSubmit}>
            {formStep === 0 && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+977 98XXXXXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us what you're looking for..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      if (formData.name && formData.phone) setFormStep(1);
                    }}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Next — Tell Us About Your Event →
                  </button>

                  <div style={{ textAlign: 'center', color: 'rgba(247, 235, 232, 0.6)', fontSize: '0.8rem', margin: '0.25rem 0' }}>
                    — OR —
                  </div>

                  <a
                    href="https://wa.me/9779807022233"
                    className="btn-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: '100%', justifyContent: 'center', color: 'var(--ivory)', borderColor: 'rgba(212, 175, 55, 0.5)', textDecoration: 'none' }}
                  >
                    Chat on WhatsApp Directly 💬
                  </a>
                </div>
              </>
            )}

            {formStep === 1 && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service">Service Required</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="bridal">Bridal Makeup</option>
                      <option value="engagement">Engagement / Reception</option>
                      <option value="event">Event / Party Makeup</option>
                      <option value="nails">Nail Art & Extensions</option>
                      <option value="masterclass">Masterclass Enrollment</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date of Event</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setFormStep(0)}
                    style={{ color: 'var(--gold)', borderColor: 'var(--gold)' }}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Send Inquiry ✦
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="contact-info">
            <h3 className="contact-info-title">Visit Our Studio</h3>

            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <div className="info-label">Location</div>
                <div className="info-value">tintoliya, Aqua Park, Biratnagar<br />Nepal, 977</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">🕐</div>
              <div>
                <div className="info-label">Studio Hours</div>
                <div className="info-value">Sun – Sat: 10:00 AM – 7:00 PM<br />By Appointment Only</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📱</div>
              <div>
                <div className="info-label">WhatsApp / Call</div>
                <div className="info-value">
                  <a href="tel:+9779807022233" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'block', marginBottom: '0.25rem' }}>
                    +977 980-7022233
                  </a>
                  <a href="https://wa.me/9779807022233" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div>
                <div className="info-label">Email</div>
                <div className="info-value">hello@regalbyaastha.com</div>
              </div>
            </div>

            <div className="contact-socials">
              <a href="https://www.facebook.com/regalmakeupstudio/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                f
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                IG
              </a>
              <a href="#" className="social-link" aria-label="TikTok">
                TT
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                YT
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bar">
          <p>© 2026 Regal By Aastha. All rights reserved.</p>
          <p>
            Designed with ❤️ by <a href="#">Sonu</a>
          </p>
        </div>
      </div>
    </section>
  );
}
