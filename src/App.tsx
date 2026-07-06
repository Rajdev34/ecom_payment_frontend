import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Industries from './components/Industries';
import Features from './components/Features';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CtaBanner from './components/CtaBanner';
import FAQ from './components/FAQ';
import ApplyForm from './components/ApplyForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <Industries />
        <Features />
        <Process />
        <Testimonials />
        <CtaBanner />
        <FAQ />
        <ApplyForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
