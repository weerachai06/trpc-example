import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import { trpc } from './utils/trpc';

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3001',
          headers: {
            origin: 'http://localhost:3001'
          }
          // optional
          // headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   };
          // },
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
     <QueryClientProvider client={queryClient}>
        <HomePage/>
     </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
