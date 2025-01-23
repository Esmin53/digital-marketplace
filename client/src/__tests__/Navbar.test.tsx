import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';

jest.mock('../components/MaxWidthWrapper', () => ({ children, className }: any) => (
  <div data-testid="max-width-wrapper" className={className}>{children}</div>
));

describe('Navbar Component', () => {
  test('renders the brand name', () => {
    render(<Navbar />);
    expect(screen.getByText('DigiSeal')).toBeInTheDocument()
  
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();

    expect(screen.getByText('Categories')).toBeInTheDocument()
    
    expect(screen.getByText('Register')).toBeInTheDocument()

    expect(screen.getByText('Sign In')).toBeInTheDocument()
});


});