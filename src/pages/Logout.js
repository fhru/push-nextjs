import { useEffect } from 'react';
import Login from './Login';

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('cart');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
    }, []);

    return <>
        <Login />
    </>;
};

export default Logout;
