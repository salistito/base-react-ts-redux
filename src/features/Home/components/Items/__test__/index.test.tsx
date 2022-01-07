import { Items } from '..';
import { render, fireEvent, screen, waitFor } from '../../../../../utils/testing/reduxRender';
import { cartItems } from '../../../../../__mock__/cartItems';
import * as cartSlice from '../../../../../redux/cartSlice';

describe('Items Component Render', () => {
  test('Should display an empty view', () => {
    render(<Items list={[]} />);
    const itemsComponent = screen.getByTestId('container-item');
    expect(itemsComponent.childElementCount).toBe(0);
  });

  test('Should display items', () => {
    render(<Items list={cartItems} />);
    const itemsComponent = screen.getByTestId('container-item');
    expect(itemsComponent.childElementCount).toBeGreaterThan(0);
  });

  test('Should add an Item to Cart', async () => {
    const updateCart = jest.spyOn(cartSlice, 'updateCart');

    render(<Items list={cartItems} />);
    const [firstButton] = screen.getAllByRole('button');

    fireEvent.click(firstButton);

    const firstItem = [{ ...cartItems[0], quantity: 1 }];
    expect(updateCart).toHaveBeenCalledWith(firstItem);
    expect(updateCart).toHaveBeenCalled();

    fireEvent.click(firstButton);

    const firstItem2 = [{ ...cartItems[0], quantity: 2 }];
    expect(updateCart).toHaveBeenCalledWith(firstItem2);
  });
});
