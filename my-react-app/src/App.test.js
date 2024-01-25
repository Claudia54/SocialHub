import { render, screen } from '@testing-library/react';
import App from './App';


/**
 * Test case to check if the 'learn react' link is rendered in the App component.
 * 
 * The test renders the App component, looks for an element containing the text 'learn react',
 * and asserts that such an element is present in the document.
 */
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
