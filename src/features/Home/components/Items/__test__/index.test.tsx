import { Items } from '..';
import { render, fireEvent, screen, waitFor } from '../../../../../utils/testing/reduxRender';
import { cartItems } from '../../../../../__mock__/cartItems';
import * as cartSlice from '../../../../../redux/cartSlice';

describe('Items Component Render', () => {
  test('Should display an empty view', () => {
    render(<Items list={[]} />);
    const container = screen.getByTestId('container-item');
    expect(container.childElementCount).toBe(0);
  });

  test('Should add an Item toCart', async () => {
    const updateCart = jest.spyOn(cartSlice, 'updateCart');

    render(<Items list={cartItems} />);

    const container = screen.getByTestId('container-item');
    expect(container.childElementCount).toBe(4);
    // eslint-disable-next-line prefer-destructuring
    const [firstButton] = screen.getAllByRole('button');
    await waitFor(() => {
      fireEvent.click(firstButton);
    });

    const first = [{ id: 1, name: 'ítem1', price: 100, quantity: 1 }];
    expect(updateCart).toHaveBeenCalledWith(first);

    await waitFor(() => {
      fireEvent.click(firstButton);
    });
    const second = [{ id: 1, name: 'ítem1', price: 100, quantity: 2 }];
    expect(updateCart).toHaveBeenCalledWith(second);
    expect(updateCart).toHaveBeenCalledTimes(2);
  });
});
