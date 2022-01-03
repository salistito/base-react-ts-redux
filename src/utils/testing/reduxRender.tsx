import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { InitialRootState, rootReducer } from '../../app/store';
// import { BrowserRouter as Router, Switch } from 'react-router-dom';

type wrap = any;
// const initialReducerState: Partial<RootState> = {};
const initialReducerState: InitialRootState = {};

const render = (
  ui: any,
  {
    initialState = initialReducerState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper: React.FC<wrap> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
