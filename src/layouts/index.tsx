import React from 'react';
import { StyledHeader as Header } from './Header';
import { StyledFooter as Footer } from './Footer';

export const Layout: React.FC = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
