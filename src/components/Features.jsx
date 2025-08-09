import React from 'react';
import abcPowder from '../assets/abc_powder.jpg';
import sambarMasala from '../assets/sambar_masala.jpg';
import fishMasala from '../assets/fish_masala.jpg';
import pregnantLadyPowder from '../assets/pregnant_lady_powder.jpg';
import childrenBiscuits from '../assets/children_biscuits.jpg';

const products = [
  { name: 'ABC Powder', image: abcPowder },
  { name: 'Sambar Masala', image: sambarMasala },
  { name: 'Fish Masala', image: fishMasala },
  { name: 'Pregnant Lady Powder', image: pregnantLadyPowder },
  { name: 'Children Biscuits', image: childrenBiscuits },
];

const Features = ({ onShowOptions }) => {
  // onShowOptions(product) should be implemented outside to handle navigation or showing purchase options

  return (
    <section className="features" id="products">
      <h2>Best sellers</h2>
      <div className="product-grid">
        {products.map((product, idx) => (
          <div className="product-card" key={idx} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <img src={product.image} alt={product.name} style={{ maxWidth: '100%', borderRadius: '8px' }} />
            <p className="product-name" style={{ fontWeight: 'bold', margin: '0.5rem 0' }}>{product.name}</p>
            <button
              style={{
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              onClick={() => onShowOptions(product)}
            >
              Show Options
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
