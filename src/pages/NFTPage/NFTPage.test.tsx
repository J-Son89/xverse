import {render, screen} from '@testing-library/react';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {NFTPage} from './index';

test('renders NFTPage screen', () => {
  render(
    <BrowserRouter
      future={{v7_relativeSplatPath: true, v7_startTransition: true}}
    >
      <NFTPage />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Details/i);
  expect(linkElement).toBeInTheDocument();
});
