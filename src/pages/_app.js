import '../app/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Open_Sans } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'next/router';
import Login from './Login';
import { useState, useEffect } from 'react'; // tambahkan useState dan useEffect untuk manajemen status login
config.autoAddCss = false;

const openSans = Open_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
});

function MyApp({ Component, pageProps }) {

    return (
        <main className={openSans.className}>
            <Component {...pageProps} />
        </main>
    );
}

export default MyApp;
