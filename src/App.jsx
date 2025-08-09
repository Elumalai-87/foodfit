// App.jsx
import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Features from './components/Features';
import Juices from './components/Juices';
import Promo from './components/Promo';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Hero />
        <Features />
        <Juices />
        <Promo />
        {/* <Contact /> */}
        <Footer />
      </main>
      
    </div>
  );
}

export default App;
