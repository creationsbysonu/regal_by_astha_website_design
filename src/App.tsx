import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useGSAPScrollTrigger } from './hooks/useGSAP';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Reels from './components/Reels';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

import './styles/animations.css';
import './styles/sections.css';

function App() {
  const { scrollTo } = useSmoothScroll();
  useGSAPScrollTrigger();

  return (
    <>
      <Navbar scrollTo={scrollTo} />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Reels />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}

export default App;
