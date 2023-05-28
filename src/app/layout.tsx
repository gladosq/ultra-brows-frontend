import React from 'react';
import localFont from 'next/font/local';
import './../styles/global.scss';
import './../styles/libs.scss';
import Providers from '../providers';

export const metadata = {
    title: 'ULTRA Brows',
    description: 'ULTRA Brows',
    icons: {
        icon: './next.svg'
    },
};

const montserrat = localFont({
    src: [
        {
            path: './../../public/fonts/montserrat-400.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: './../../public/fonts/montserrat-300.woff',
            weight: '300',
            style: 'normal',
        },
        {
            path: './../../public/fonts/montserrat-700.woff',
            weight: '700',
            style: 'normal',
        }
    ],
    variable: '--montserrat-font'
});

const sofia = localFont({
    src: [
        {
            path: './../../public/fonts/sofia-sans-600.ttf',
            weight: '400',
            style: 'normal',
        }
    ],
    variable: '--sofia-font'
});


export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang='ru' className={`${montserrat.variable} ${sofia.variable}`}>
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}
