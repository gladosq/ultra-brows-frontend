'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {ParallaxProvider} from 'react-scroll-parallax';

export default function Providers({children}: { children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 5 * 1000,
            }
        }
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <ParallaxProvider>
                {children}
            </ParallaxProvider>
        </QueryClientProvider>
    )
}
