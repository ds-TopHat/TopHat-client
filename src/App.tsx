import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes/router';
import '@styles/index.css';
import ThemeProvider from '@styles/themeProvider';
import GlobalErrorBoundary from '@routes/globalErrorBoundary';

import queryClient from './queryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GlobalErrorBoundary>
          <RouterProvider router={router} />
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </GlobalErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
