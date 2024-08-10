import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ContextProvider } from "./contexts/ContextProvider";
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Provider } from "react-redux";
import rootReducer from "./slices";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({ reducer: rootReducer, devTools: true });
defineCustomElements(window);
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.Fragment>
    <Provider store={store}>
    <ContextProvider>
      <App />
    </ContextProvider>
    </Provider>
  </React.Fragment>
);