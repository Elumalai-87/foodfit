import React from 'react';

const juices = [
  {
    name: 'Strawberry juice',
    desc: 'Relish Naturest Strawberry Juice—a low glycemic, sweet delight packed with antioxidants.'
  },
  {
    name: 'Mango juice',
    desc: 'Savor the goodness of Naturest Mango Juice—low in calories and brimming with powerful vitamins.'
  },
  {
    name: 'Grape juice',
    desc: "Enjoy the richness of Naturest Grape Juice—a nutrient-packed, flavorful choice that’s great for your heart health."
  },
];

const Juices = () => (
  <section id="menu" className="juices">
    <h2>Fresh Fruit Juices</h2>
    {juices.map((j, i) => (
      <article key={i}>
        <h3>{j.name}</h3>
        <p>{j.desc}</p>
      </article>
    ))}
  </section>
);

export default Juices;
