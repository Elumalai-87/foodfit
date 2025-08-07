import React from "react";

export default function Navbar() {
  return (
    <header className="bg-green-700 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold">Fit & Food Tamil</h1>
      <nav>
        <ul className="flex gap-6">
          <li>Home</li>
          <li>Collections</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
      </nav>
      <button className="bg-yellow-500 px-4 py-2 rounded-md">Cart (0)</button>
    </header>
  );
}
