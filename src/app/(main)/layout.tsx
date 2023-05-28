import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function HeaderLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    )
}
