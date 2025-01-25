import {render, screen} from '@testing-library/react';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {NFTPage} from './index';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

test('renders NFTPage screen', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{v7_relativeSplatPath: true, v7_startTransition: true}}
      >
        <NFTPage />
      </BrowserRouter>
    </QueryClientProvider>
  );
  const linkElement = screen.getByText(/Details/i);
  expect(linkElement).toBeInTheDocument();
});
