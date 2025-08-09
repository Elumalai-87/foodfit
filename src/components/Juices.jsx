import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// Demo product images — adjust paths as necessary
import abcPowder from '../assets/abc_powder.jpg';
import sambarMasala from '../assets/sambar_masala.jpg';
import fishMasala from '../assets/fish_masala.jpg';
import pregnantLadyPowder from '../assets/pregnant_lady_powder.jpg';
import childrenBiscuits from '../assets/children_biscuits.jpg';

// Products list
const products = [
  { name: 'ABC Powder', image: abcPowder, price: 120, discount: 20 },
  { name: 'Sambar Masala', image: sambarMasala, price: 90, discount: 15 },
  { name: 'Fish Masala', image: fishMasala, price: 150, discount: 25 },
  { name: 'Pregnant Lady Powder', image: pregnantLadyPowder, price: 300, discount: 30 },
  { name: 'Children Biscuits', image: childrenBiscuits, price: 80, discount: 10 },
];

const weightOptions = [
  { label: '250 gm', multiplier: 0.25 },
  { label: '500 gm', multiplier: 0.5 },
  { label: '750 gm', multiplier: 0.75 },
  { label: '1 kg', multiplier: 1 },
];

// Generate Order ID function
function generateOrderId() {
  return "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

const Products = () => {
  const [cart, setCart] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState(
    products.reduce((acc, p) => ({ ...acc, [p.name]: 0.25 }), {})
  );
  // Modal visibility & user details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  // Message state for feedback notifications
  const [message, setMessage] = useState('');

  // Calculate discounted price
  const getDiscountedPrice = (price, discount) =>
    price - (price * discount) / 100;

  // Handle weight selection changes per product
  const handleWeightChange = (product, weightMultiplier) => {
    setSelectedWeights((prev) => ({
      ...prev,
      [product.name]: weightMultiplier,
    }));
  };

  // Add selected product with quantity to cart
  const handleAddToCart = (product) => {
    const weightMultiplier = selectedWeights[product.name];
    const finalPrice = (
      getDiscountedPrice(product.price, product.discount) * weightMultiplier
    ).toFixed(2);

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.name === product.name);
      if (existing) {
        // Update existing item in cart
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, weight: weightMultiplier, price: finalPrice }
            : item
        );
      } else {
        // Add new item to cart
        return [
          ...prevCart,
          {
            ...product,
            weight: weightMultiplier,
            price: finalPrice,
          },
        ];
      }
    });
    setMessage(`${product.name} added to cart!`);
    setTimeout(() => setMessage(''), 2000);
  };

  // Open order modal if cart not empty, else show message
  const openOrderModal = () => {
    if (cart.length === 0) {
      setMessage('Your cart is empty!');
      return;
    }
    setMessage('');
    setIsModalOpen(true);
  };

  // Close modal and clear messages
  const closeModal = () => {
    setIsModalOpen(false);
    setMessage('');
  };

  // Handle input change in modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Submit order and send email
  const handleOrderSubmit = () => {
    if (!userDetails.name.trim() || !userDetails.email.trim()) {
      setMessage('Please fill out name and email!');
      return;
    }

    const orderId = generateOrderId();
    const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

    const templateParams = {
      to_email: 'elumalaivelu2004@gmial.com',  // Your receiving email
      user_name: userDetails.name,
      user_email: userDetails.email,
      user_phone: userDetails.phone,
      user_address: userDetails.address,
      order_id: orderId,
      order_details: cart
        .map((item) => `${item.name} (${item.weight * 1000} gm) - ₹${item.price}`)
        .join('\n'),
      total_price: totalPrice.toFixed(2),
    };

    emailjs
      .send(
        'service_ycwzgcf',    // Your EmailJS service ID
        'template_ue3nknt',   // Your EmailJS template ID
        templateParams,
        'f59i6bs0MZIUv2FiC'     // Your EmailJS public key
      )
      .then(() => {
        setMessage('Order placed successfully!');
        setCart([]);
        setUserDetails({ name: '', email: '', phone: '', address: '' });
        setIsModalOpen(false);
        setTimeout(() => setMessage(''), 4000);
      })
      .catch(() => {
        setMessage('Failed to send order email.');
        setTimeout(() => setMessage(''), 4000);
      });
  };

  return (
    <section style={{ padding: '2rem' }}>
      {/* Products Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
        }}
      >
        {products.map((p, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #eee',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Product Image */}
            <div style={{ textAlign: 'center' }}>
              <img
                src={p.image}
                alt={p.name}
                style={{
                  maxWidth: '100%',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
              />
            </div>

            {/* Product Info */}
            <div style={{ marginTop: '1rem' }}>
              <h2 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                {p.name}
              </h2>
              <div style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                <span
                  style={{
                    textDecoration: 'line-through',
                    color: '#888',
                    marginRight: '0.5rem',
                  }}
                >
                  ₹{p.price}
                </span>
                <span
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: '#4caf50',
                  }}
                >
                  ₹{getDiscountedPrice(p.price, p.discount).toFixed(2)}
                </span>
                <span
                  style={{
                    marginLeft: '0.5rem',
                    color: '#e53935',
                    fontWeight: 'bold',
                  }}
                >
                  -{p.discount}%
                </span>
              </div>

              {/* Weight Selection */}
              <div style={{ margin: '1rem 0' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                  }}
                >
                  Select Quantity
                </label>
                <select
                  onChange={(e) =>
                    handleWeightChange(p, parseFloat(e.target.value))
                  }
                  value={selectedWeights[p.name]}
                  style={{
                    padding: '10px 15px',
                    fontSize: '16px',
                    borderRadius: '0',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    width: '100%',
                    backgroundColor: '#fff',
                    fontWeight: 'bold',
                    color: '#000',
                  }}
                >
                  {weightOptions.map((opt, idx) => (
                    <option key={idx} value={opt.multiplier}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  onClick={() => handleAddToCart(p)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    flex: 1,
                  }}
                >
                  Add to cart
                </button>
                <button
                  onClick={openOrderModal}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#ff9800',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    flex: 1,
                  }}
                >
                  Place Order
                </button>
              </div>

              {/* Feedback Message */}
              {message && (
                <p
                  style={{
                    marginTop: '1rem',
                    color: message.includes('successfully')
                      ? 'green'
                      : message.includes('added to cart')
                      ? '#0066cc'
                      : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div
          style={{
            marginTop: '2rem',
            background: '#fafafa',
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          <h3>Your Cart:</h3>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - {item.weight * 1000} gm - ₹{item.price}
              </li>
            ))}
          </ul>
          <div>
            <strong>
              Total: ₹
              {cart.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2)}
            </strong>
          </div>
        </div>
      )}

      {/* Modal for user details */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '8px',
              width: '400px',
              maxWidth: '90%',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            <h2>Enter Your Details</h2>

            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={userDetails.name}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
            />

            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={userDetails.email}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
            />

            <textarea
              name="address"
              placeholder="Address"
              value={userDetails.address}
              onChange={handleInputChange}
              rows={3}
              style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                onClick={handleOrderSubmit}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Submit Order
              </button>
              <button
                onClick={closeModal}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
