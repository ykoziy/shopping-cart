import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from './utils/test-util';
import Header from '../components/App';

describe('Testing UI rendering', () => {
  test('renders logo', () => {
    renderWithProviders(<Header />);
    const headingElement = screen.getAllByText(/bean/i, {
      exact: true,
    })[0];
    expect(headingElement).toBeInTheDocument();
  });

  test('renders nav links', () => {
    renderWithProviders(<Header />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const shopLink = screen.getByRole('link', { name: /shop/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const cartLink = screen.getByTestId('cart-link');

    expect(homeLink).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  });
});

describe('Testing interactions', () => {
  test('shop button click', () => {
    renderWithProviders(<Header />);
    const shopLink = screen.getByRole('link', { name: /shop/i });
    fireEvent.click(shopLink);
    const headingElement = screen.getByText(/roasted coffee/i, { exact: true });
    expect(headingElement).toBeInTheDocument();
  });

  renderWithProviders('home button click', () => {
    renderWithProviders(<Header />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);
    const headingElement = screen.getByText(/shop at bean brigade/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('about button click', () => {
    renderWithProviders(<Header />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    fireEvent.click(aboutLink);
    const headingElement = screen.getByText(/about bean brigade/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('cart button click', () => {
    renderWithProviders(<Header />);
    const cartLink = screen.getByTestId('cart-link');
    fireEvent.click(cartLink);
    const headingElement = screen.getByText(/my cart/i);
    expect(headingElement).toBeInTheDocument();
  });
});
