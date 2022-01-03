import Home from '..';
import { fetchItems as fetched } from '../../../api/fetchItems';
import { render } from '../../../utils/testing/reduxRender';
import { cartItems } from '../../../__mock__/cartItems';

jest.mock('../../../api/fetchItems');

describe('Render Home', () => {
  test('Should display Home', () => {
    const fetchItems = fetched as jest.MockedFunction<typeof fetched>;
    fetchItems.mockResolvedValue(cartItems);
    const component = <Home />;
    render(component);
    expect(component).toBeDefined();
  });
});
