import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn && router.pathname === '/Login') {
            router.push('/');
        }
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://enjoyed-totally-gorilla.ngrok-free.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', data.user.role);
                localStorage.setItem('userName', data.user.name); // assuming the API returns the user's name
                router.push('/');
            } else {
                throw new Error('Login Gagal');
            }
        } catch (error) {
            setLoginError('Login gagal. Periksa kembali username dan password Anda.');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md lg:m-0 m-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Welcome to PUSH!</h2>
                {loginError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{loginError}</span>
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            required
                        />
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={showPassword}
                                    onChange={toggleShowPassword}
                                />
                                <span className="ml-2 text-gray-700">Show Password</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-green-500 p-4 w-full rounded-lg text-lg font-semibold text-white">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
