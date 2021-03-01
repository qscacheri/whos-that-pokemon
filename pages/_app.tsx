import { ChakraProvider, GlobalStyle } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React, { Component } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CustomChakraTheme } from '../components/CustomChakraTheme';
import { fonts } from '../components/font-face';
import '../styles/globals.css';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomChakraTheme>
        <Global styles={fonts} />
        <Component {...pageProps} />
      </CustomChakraTheme>
    </QueryClientProvider>
  );
}

export default MyApp;
