import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import currentReducer from '@/Components/Context/currentRedux';
import cartReducer from '@/Components/Context/cartRedux';
import editorReducer from '@/Components/Context/editorRedux';

import thunk from 'redux-thunk';

const store = configureStore({
  middleware: [thunk],
  reducer: {
    currentProduct: currentReducer,
    cartProducts: cartReducer,
    editor: editorReducer,
  },
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
