import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: "'Pokemon Solid', sans-serif",
    body: "'LCDSolid.ttf', sans-serif",
    mono: "'My Monospaced Font', monospace",
  },
});
export const CustomChakraTheme: React.FC = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);
