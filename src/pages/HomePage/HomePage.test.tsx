import {render, screen} from '@testing-library/react';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {HomePage} from './index';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

test('renders HomePage screen', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{v7_relativeSplatPath: true, v7_startTransition: true}}
      >
        <HomePage />
      </BrowserRouter>
    </QueryClientProvider>
  );
  const linkElement = screen.getByText(/Ordinal Inscription Lookup/i);
  expect(linkElement).toBeInTheDocument();
});
