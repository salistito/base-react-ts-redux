import Home from '..';
import { fetchItems as fetched } from '../../../api/fetchItems';
import { render, screen, waitFor } from '../../../utils/testing/reduxRender';
import { cartItems } from '../../../__mock__/cartItems';

jest.mock('../../../api/fetchItems');

describe('Render Home', () => {
  test('Should display Home', async () => {
    const fetchItems = fetched as jest.MockedFunction<typeof fetched>;
    fetchItems.mockResolvedValue(cartItems);
    const component = <Home />;
    render(component);
    const loading = screen.getByText('Loading...');
    const loadingId = screen.getByTestId('el_loading');
    expect(loadingId).toBeInTheDocument();
    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
      const tienda = screen.getByText('Tienda');
      expect(tienda).toBeInTheDocument();
    });
  });
});
