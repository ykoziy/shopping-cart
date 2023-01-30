import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../components/App';

describe('Testing UI rendering', () => {
  it('renders my store app', () => {
    render(<App />);
    const headingElement = screen.getByText(/my super store/i);
    expect(headingElement).toBeInTheDocument();
  });
});

describe('Testing Shop page', () => {
  it('should open the shop page, when clicking on shop now', () => {
    render(<App />);
    const openShopButton = screen.getByRole('button', {
      name: /shop now/i,
    });
    fireEvent.click(openShopButton);
    const headingElement = screen.getByText(/my shop/i);
    expect(headingElement).toBeInTheDocument();
  });

  it('should allow user to add item to cart', () => {
    render(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);
    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.click(addToCartBtn);
    const cartItem = screen.getAllByRole('link', { name: /cart \(1\)/i });
    expect(cartItem[0]).toBeInTheDocument();
  });

  it('should allow user to add same item to the cart twice', () => {
    render(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);
    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.click(addToCartBtn);
    fireEvent.click(addToCartBtn);
    const cartItem = screen.getAllByRole('link', { name: /cart \(2\)/i });
    expect(cartItem[0]).toBeInTheDocument();
  });

  it('should add a typed in quantity of item to the cart', () => {
    render(<App />);
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
    const cartItem = screen.getAllByRole('link', { name: /cart \(20\)/i });
    expect(cartItem[0]).toBeInTheDocument();
  });

  it('should have item input for quantity that accepts only positive integers', () => {
    render(<App />);
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
    const cartItem = screen.getAllByRole('link', { name: /cart \(1\)/i });
    expect(cartItem[0]).toBeInTheDocument();
  });

  it('should be able to increment item count and add it to cart', () => {
    render(<App />);
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
    const cartItem = screen.getAllByRole('link', { name: /cart \(3\)/i });
    expect(cartItem[0]).toBeInTheDocument();
  });

  it('should be able to decrement item count and add it to cart', () => {
    render(<App />);
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
    const cartItem = screen.getAllByRole('link', { name: /cart \(2\)/i });
    expect(cartItem[0]).toBeInTheDocument();
  });

  it('should not decrement past 1', () => {
    render(<App />);
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
    const cartItem = screen.getAllByRole('link', { name: /cart \(1\)/i });
    expect(cartItem[0]).toBeInTheDocument();
  });
});

describe('Testing Cart page', () => {
  it('should empty the entire cart', () => {
    render(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);

    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.click(addToCartBtn);

    const cartLink = screen.getByRole('link', { name: /cart/i });
    fireEvent.click(cartLink);

    const emptyCartBtn = screen.getByRole('button', {
      name: /empty cart/i,
    });
    fireEvent.click(emptyCartBtn);

    const cartItem = screen.getByRole('link', { name: /cart \(0\)/i });
    expect(cartItem).toBeInTheDocument();
  });

  it('should allow user to increment count', () => {
    render(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);

    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.click(addToCartBtn);

    const cartLink = screen.getByRole('link', { name: /cart/i });
    fireEvent.click(cartLink);

    const incrementCountBtn = screen.getByRole('button', {
      name: /\+/i,
    });
    fireEvent.click(incrementCountBtn);

    const cartItem = screen.getByRole('link', { name: /cart \(2\)/i });
    expect(cartItem).toBeInTheDocument();
  });

  it('should allow user to increment count, for one time and others unchanged', () => {
    render(<App />);
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

    const cartLink = screen.getByRole('link', { name: /cart/i });
    fireEvent.click(cartLink);

    const incrementCountBtn = screen.getAllByRole('button', {
      name: /\+/i,
    })[0];
    fireEvent.click(incrementCountBtn);

    const cartItem = screen.getByRole('link', { name: /cart \(3\)/i });
    expect(cartItem).toBeInTheDocument();
  });

  it('should remove item when decreasing count to 0', () => {
    render(<App />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);

    const addToCartBtn = screen.getAllByRole('button', {
      name: /add to cart/i,
    })[0];
    fireEvent.click(addToCartBtn);

    const cartLink = screen.getByRole('link', { name: /cart/i });
    fireEvent.click(cartLink);

    const incrementCountBtn = screen.getByRole('button', {
      name: /\-/i,
    });
    fireEvent.click(incrementCountBtn);

    const cartItem = screen.getByRole('link', { name: /cart \(0\)/i });
    expect(cartItem).toBeInTheDocument();
  });

  it('should remove one of the items from the cart', () => {
    render(<App />);
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

    const cartLink = screen.getByRole('link', { name: /cart/i });
    fireEvent.click(cartLink);

    const removeFromCartBtn = screen.getAllByRole('button', {
      name: /remove/i,
    })[0];
    fireEvent.click(removeFromCartBtn);

    const cartItem = screen.getByRole('link', { name: /cart \(1\)/i });
    expect(cartItem).toBeInTheDocument();
  });
});
