import React from 'react';
import Header from './header';
import Footer from './footer';

export const Layout: React.FC = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
