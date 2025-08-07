import React from 'react';

const features = [
  'Pesticide-free',
  'Preservative-free',
  'Pollution-free',
  'Sugar-free',
];

const Features = () => (
  <section className="features">
    <h2>Why Our Juices</h2>
    <ul>
      {features.map((feat, idx) => <li key={idx}>{feat}</li>)}
    </ul>
  </section>
);

export default Features;
