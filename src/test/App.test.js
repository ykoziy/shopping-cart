import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders heading Shopping Cart!', () => {
  render(<App />);
  const headingElement = screen.getByText(/shopping cart!/i);
  expect(headingElement).toBeInTheDocument();
});
