import { CartProvider, CartContext } from 'context/cartContext';
import { renderWithAuthProvider } from 'lib/test/test-utils';
// import { CartProvider } from 'contexts/cart-context';

import CartDrawer from './CartDrawer';

describe('[components] - CartDrawer', () => {
  const setup = () => {
    return renderWithAuthProvider(
      <CartProvider>
        <CartDrawer/>
      </CartProvider>
    );
  };

  test('should render correctly', () => {
    const view = setup();
    expect(view).toMatchSnapshot();
  });
});
