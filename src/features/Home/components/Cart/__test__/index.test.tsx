import { Cart } from '..';
import { render, screen, fireEvent } from '../../../../../utils/testing/reduxRender';

describe('Cart Render', () => {
  test('Should display Cart', () => {
    const component = <Cart />;
    render(component);
    const CartItem = screen.getByTestId('cart-item');
    expect(CartItem).toBeInTheDocument();
    const vacio = screen.getByText('Carrito Vacío');
    expect(vacio).toBeInTheDocument();
  });

  test('Should remove item from Cart', () => {
    const initialState = {
      cart: {
        cartList: [
          { id: 1, name: 'ítem1', price: 100, cuantity: 2 },
          { id: 2, name: 'ítem2', price: 200, cuantity: 1 },
        ],
      },
    };
    const component = <Cart />;
    render(component, { initialState });
    const items = screen.getByTestId('cart-items-list');
    expect(items.childElementCount).toBe(2);

    const [secondButton] = screen.getAllByRole('button');
    fireEvent.click(secondButton);
  });
});
