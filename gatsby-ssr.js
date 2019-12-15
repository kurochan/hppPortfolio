import React from 'react';
import { ResetCSS, GlobalCSS } from './src/components';
import { MenuContainer } from './src/store';
import Layout from './src/layouts';

const wrapWithProvider = ({ element }) => (
  <>
    <ResetCSS />
    <GlobalCSS />
    <MenuContainer.Provider>
      <Layout>{element}</Layout>
    </MenuContainer.Provider>
  </>
);

export const wrapRootElement = wrapWithProvider;
