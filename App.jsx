
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import LinkHubSection from './components/LinkHubSection';
import PortfolioSection from './components/PortfolioSection';
import Footer from './components/Footer';

const App = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-100 selection:text-cyan-900">
            <Navbar />
            <main>
                <HeroSection />
                <ServicesSection />
                <LinkHubSection />
                <PortfolioSection />
            </main>
            <Footer />
        </div>
    );
};

export default App;
