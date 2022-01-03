import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import CartReducer from '../redux/cartSlice';
import { RecursivePartial } from '../utils/recursivePartialType';

export const rootReducer = {
  cart: CartReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type InitialRootState = RecursivePartial<RootState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
