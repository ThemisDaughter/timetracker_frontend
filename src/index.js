import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import store from './redux/store';
import { Provider } from 'react-redux';
import theme from './styles/theme';

// how the fuck do I style chakra?!!?!?!?!?!!?!?

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
       <App />
     </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

 