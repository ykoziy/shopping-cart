import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils/test-util';
import App from '../components/App';

describe('Testing UI rendering', () => {
  it('renders my store app', () => {
    renderWithProviders(<App />);
    const headingElement = screen.getAllByText(/bean/i, {
      exact: true,
    })[0];
    expect(headingElement).toBeInTheDocument();
  });
});

describe('Testing Checkout page', () => {
  it('should be able to add item and checkout', () => {
    renderWithProviders(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);

    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.click(addToCartBtn);

    const cartLink = screen.getByTestId('cart-link');
    fireEvent.click(cartLink);

    const checkoutBtn = screen.getByText(/checkout/i);
    fireEvent.click(checkoutBtn);

    const headingElement = screen.getByText(/checkout/i);
    expect(headingElement).toBeInTheDocument();
  });
});

describe('Testing Shop page', () => {
  it('should open the shop page, when clicking on shop now', () => {
    renderWithProviders(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);

    const openShopButton = screen.getByRole('button', {
      name: /shop now/i,
    });
    fireEvent.click(openShopButton);
    const cartHeadingElement = screen.getByText(/roasted coffee/i, {
      exact: true,
    });
    expect(cartHeadingElement).toBeInTheDocument();
  });

  it('should allow user to add item to cart', () => {
    renderWithProviders(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);
    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.click(addToCartBtn);
    const cartItem = screen.queryByTestId('cart-count');
    expect(cartItem.innerHTML).toBe('1');
  });

  it('should allow user to add same item to the cart twice', () => {
    renderWithProviders(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);
    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.click(addToCartBtn);
    fireEvent.click(addToCartBtn);
    const cartItem = screen.queryByTestId('cart-count');
    expect(cartItem.innerHTML).toBe('2');
  });

  it('should add a typed in quantity of item to the cart', () => {
    renderWithProviders(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);
    const inputBox = screen.getAllByRole('spinbutton')[0];
    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    userEvent.clear(inputBox);
    userEvent.type(inputBox, '20');
    expect(inputBox).toHaveValue(20);
    fireEvent.click(addToCartBtn);
    const cartItem = screen.queryByTestId('cart-count');
    expect(cartItem.innerHTML).toBe('20');
  });

  it('should have item input for quantity that accepts only positive integers', () => {
    renderWithProviders(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);
    const inputBox = screen.getAllByRole('spinbutton')[0];
    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.focus(inputBox);
    userEvent.clear(inputBox);
    userEvent.type(inputBox, '-1');
    fireEvent.blur(inputBox);
    expect(inputBox).toHaveValue(1);
    fireEvent.click(addToCartBtn);
    const cartItem = screen.queryByTestId('cart-count');
    expect(cartItem.innerHTML).toBe('1');
  });

  it('should be able to increment item count and add it to cart', () => {
    renderWithProviders(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);
    const inputBox = screen.getAllByRole('spinbutton')[0];

    const incrementBtn = screen.getAllByRole('button', {
      name: /\+/i,
    })[0];

    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];

    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expect(inputBox).toHaveValue(3);

    fireEvent.click(addToCartBtn);
    const cartItem = screen.queryByTestId('cart-count');
    expect(cartItem.innerHTML).toBe('3');
  });

  it('should be able to decrement item count and add it to cart', () => {
    renderWithProviders(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);
    const inputBox = screen.getAllByRole('spinbutton')[0];

    const incrementBtn = screen.getAllByRole('button', {
      name: /\+/i,
    })[0];

    const decrementBtn = screen.getAllByRole('button', {
      name: /-/i,
    })[0];

    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];

    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    fireEvent.click(decrementBtn);
    expect(inputBox).toHaveValue(2);

    fireEvent.click(addToCartBtn);
    const cartItem = screen.queryByTestId('cart-count');
    expect(cartItem.innerHTML).toBe('2');
  });

  it('should not decrement past 1', () => {
    renderWithProviders(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);
    const inputBox = screen.getAllByRole('spinbutton')[0];

    const decrementBtn = screen.getAllByRole('button', {
      name: /-/i,
    })[0];

    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];

    fireEvent.click(decrementBtn);
    fireEvent.click(decrementBtn);
    fireEvent.click(decrementBtn);
    expect(inputBox).toHaveValue(1);

    fireEvent.click(addToCartBtn);
    const cartItem = screen.queryByTestId('cart-count');
    expect(cartItem.innerHTML).toBe('1');
  });
});

describe('Testing Cart page', () => {
  it('should empty the entire cart', () => {
    renderWithProviders(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);

    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.click(addToCartBtn);

    const cartLink = screen.getByTestId('cart-link');
    fireEvent.click(cartLink);

    const emptyCartBtn = screen.getByRole('button', {
      name: /empty cart/i,
    });
    fireEvent.click(emptyCartBtn);

    const cartItem = screen.queryByTestId('cart-count');
    expect(cartItem).toBeNull();
  });

  it('should allow user to increment count', () => {
    renderWithProviders(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);

    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.click(addToCartBtn);

    const cartLink = screen.getByTestId('cart-link');
    fireEvent.click(cartLink);

    const incrementCountBtn = screen.getByRole('button', {
      name: /\+/i,
    });
    fireEvent.click(incrementCountBtn);

    const cartItem = screen.queryByTestId('cart-count');
    expect(cartItem.innerHTML).toBe('2');
  });

  it('should allow user to increment count, for one time and others unchanged', () => {
    renderWithProviders(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);

    const addToCartBtn1 = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.click(addToCartBtn1);

    const addToCartBtn2 = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[1];
    fireEvent.click(addToCartBtn2);

    const cartLink = screen.getByTestId('cart-link');
    fireEvent.click(cartLink);

    const incrementCountBtn = screen.getAllByRole('button', {
      name: /\+/i,
    })[0];
    fireEvent.click(incrementCountBtn);

    const cartItem = screen.queryByTestId('cart-count');
    expect(cartItem.innerHTML).toBe('3');
  });

  it('should remove item when decreasing count to 0', () => {
    renderWithProviders(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);

    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.click(addToCartBtn);

    const cartLink = screen.getByTestId('cart-link');
    fireEvent.click(cartLink);

    const incrementCountBtn = screen.getByRole('button', {
      name: /\-/i,
    });
    fireEvent.click(incrementCountBtn);

    const cartItem = screen.queryByTestId('cart-count');
    expect(cartItem).toBeNull();
  });

  it('should remove one of the items from the cart', () => {
    renderWithProviders(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);

    const addToCartBtn1 = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.click(addToCartBtn1);

    const addToCartBtn2 = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[1];
    fireEvent.click(addToCartBtn2);

    const cartLink = screen.getByTestId('cart-link');
    fireEvent.click(cartLink);

    const removeFromCartBtn = screen.getAllByRole('button', {
      name: /remove/i,
    })[0];
    fireEvent.click(removeFromCartBtn);

    const cartItem = screen.queryByTestId('cart-count');
    expect(cartItem.innerHTML).toBe('1');
  });
});
