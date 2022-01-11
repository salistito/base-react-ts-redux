import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchItems } from '../../api/fetchItems';
import { RootState } from '../../app/store';

export interface IItem {
  id: number;
  name: string;
  price: number;
}
export interface ICartItem extends IItem {
  quantity: number;
}
export type ICartState = {
  status: 'idle' | 'loading' | 'failed';
  items: IItem[];
  cartList: ICartItem[];
};

// Definition of initial value
export const initialState: ICartState = {
  status: 'idle',
  items: [],
  cartList: [],
};

/*
Cuando es necesario crear una acción en el reducer de carácter asíncrono, entra a funcionar la integración con Redux-Thunk.
Estas acción manejan 3 estados: pending, fulfilled y rejected.
Para su creación se utiliza el método createAsyncThunk y se integran al reducer por medio de extraReducers.
*/
export const fetchItemsAsync = createAsyncThunk('cart/fetchItems', async () => {
  const response = await fetchItems();
  return response;
});

// Slice creation
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<ICartState['cartList']>) => { // Actualiza el carrito (recibe un array con los datos actualizados del carro -> items del carro)
      state.cartList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchItemsAsync.rejected, (state) => {
        state.status = 'failed';
        state.items = [];
      });
  },
});

// Export of actions
export const { updateCart } = cartSlice.actions;

// Definition and export of selectors
export const getItems = (state: RootState) => state.cart.items;
export const getItemsStatus = (state: RootState) => state.cart.status;
export const getCart = (state: RootState) => state.cart.cartList;

export default cartSlice.reducer;
