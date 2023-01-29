import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders heading My Store', () => {
  render(<App />);
  const headingElement = screen.getByText(/my super store/i);
  expect(headingElement).toBeInTheDocument();
});
