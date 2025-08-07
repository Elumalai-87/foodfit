import React from "react";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;
