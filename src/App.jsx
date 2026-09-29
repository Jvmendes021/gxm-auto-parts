import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Categories from "./components/Categories/Categories";
import OrderRequest from "./components/OrderRequest/OrderRequest";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Marketplaces from "./components/Marketplaces/Marketplaces";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <OrderRequest />
        <HowItWorks />
        <Marketplaces />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
