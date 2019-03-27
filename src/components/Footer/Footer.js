import React from 'react';
import './Footer.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <footer className="footer">
    {/* <img src="/images/gaardoneBirds.png" alt="gaard one"/> */}
    &copy;TeamGaardOne
  </footer>
);

export default Footer;
