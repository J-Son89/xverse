import {render, screen} from '@testing-library/react';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {HomePage} from './index';

test('renders HomePage screen', () => {
  render(
    <BrowserRouter
      future={{v7_relativeSplatPath: true, v7_startTransition: true}}
    >
      <HomePage />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Ordinal Inscription Lookup/i);
  expect(linkElement).toBeInTheDocument();
});
