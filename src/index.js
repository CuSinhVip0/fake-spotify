import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import GlobalStyle from '~/components/GlobalStyle';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { counter } from './Reducer';
const store = configureStore({ reducer: counter });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <GlobalStyle>
            <App />
        </GlobalStyle>
    </Provider>,
);
