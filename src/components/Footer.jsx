import React from 'react';

const links = ['About Us', 'Gallery', 'FAQ', 'Contact', 'Packing', 'Services'];

const Footer = () => (
  <footer className="footer">
    <div className="links">
      {links.map((l, i) => <a key={i} href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}>{l}</a>)}
    </div>
  </footer>
);

export default Footer;
