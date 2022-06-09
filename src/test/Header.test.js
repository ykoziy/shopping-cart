import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Header from '../components/App';

describe('Testing UI rendering', () => {
  test('renders logo', () => {
    render(<Header />);
    const headingElement = screen.getByText(/shopping cart!/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders nav links', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const shopLink = screen.getByRole('link', { name: /shop/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const cartLink = screen.getByRole('link', { name: /cart/i });

    expect(homeLink).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  });
});

describe('Testing interactions', () => {
  test('shop button click', () => {
    render(<Header />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);
    const headingElement = screen.getByText(/hello from shop/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('home button click', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);
    const headingElement = screen.getByText(/shop at my store!!!/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('about button click', () => {
    render(<Header />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    fireEvent.click(aboutLink);
    const headingElement = screen.getByText(/hello from about/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('cart button click', () => {
    render(<Header />);
    const cartLink = screen.getByRole('link', { name: /cart/i });
    fireEvent.click(cartLink);
    const headingElement = screen.getByText(/hello from cart/i);
    expect(headingElement).toBeInTheDocument();
  });
});
