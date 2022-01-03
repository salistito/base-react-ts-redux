import { store } from '../../../app/store';
import { updateCart, getItems, getCart, getItemsStatus, fetchItemsAsync } from '..';
import { fetchItems as fetched } from '../../../api/fetchItems';
import { cartItems } from '../../../__mock__/cartItems';

jest.mock('../../../api/fetchItems');

const fetchItems = fetched as jest.MockedFunction<typeof fetched>;

describe('Cart Reducer', () => {
  test('Should call fetchItemsAsync Success', async () => {
    fetchItems.mockResolvedValue(cartItems);
    await store.dispatch(fetchItemsAsync());
    const status = getItemsStatus(store.getState());
    expect(status).toEqual('idle');
  });

  test('Should call fetchItemsAsync Failed', async () => {
    fetchItems.mockRejectedValue('Error');
    await store.dispatch(fetchItemsAsync());
    expect(fetchItems).toBeCalled();
    const status = getItemsStatus(store.getState());
    expect(status).toEqual('failed');
  });

  test('getItems function should get an empty Array', () => {
    expect(getItems(store.getState())).toHaveLength(0);
  });

  test('getCart function should get an empty Array', () => {
    expect(getCart(store.getState())).toHaveLength(0);
  });

  test('updateCart function should add an Item to cart', async () => {
    const firstItem = [{ id: 1, name: 'ítem1', price: 100, quantity: 1 }];

    store.dispatch(updateCart(firstItem));
    expect(getCart(store.getState())).toHaveLength(1);
  });
});
