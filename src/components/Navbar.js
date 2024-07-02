import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faGauge, faRightFromBracket, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700', '800']
});

const Navbar = ({ searchTerm, setSearchTerm }) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userName, setUserName] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        const adminRole = localStorage.getItem('userRole') === 'admin';
        const name = localStorage.getItem('userName'); // Assuming you store the user's name in localStorage
        setUserLoggedIn(loggedIn);
        setIsAdmin(adminRole);
        setUserName(name);
    }, []);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="flex lg:flex-nowrap flex-wrap px-12 py-4 justify-center items-center gap-4 lg:gap-0">
            <div className="basis-auto w-full h-full flex justify-center lg:justify-start">
                <div className={`text-3xl font-extrabold text-ijo ${poppins.className}`}>
                    PUSH!
                </div>
            </div>
            <div className="basis-auto w-full h-full">
                <input
                    type="text"
                    placeholder="Search in Push!..."
                    name="searchName"
                    className="py-2 px-3 w-full rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-ijo focus:outline-none transition-all"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>
            <div className="basis-auto w-full h-full flex gap-2 justify-center lg:justify-end items-center">
                {!userLoggedIn ? (
                    <Link href="/Login">
                        <Button name="Login" />
                    </Link>
                ) : (
                    <div className="relative">
                        <div
                            className="flex items-center cursor-pointer hover:bg-black/5 p-2 rounded-md transition-all"
                            onClick={toggleDropdown}
                        >
                            <span className="ml-0 lg:ml-2 font-semibold flex items-center gap-2 text-sm lg:text-base">
                                {userName}
                                <FontAwesomeIcon icon={faCircleUser} className="text-3xl text-gray-300" />
                            </span>
                        </div>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md z-10 bg-white border border-black/20 overflow-hidden">
                                <Link href="/Logout">
                                    <div
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition-all"
                                    >
                                        <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
                                        Logout
                                    </div>
                                </Link>
                                {isAdmin && (
                                    <Link href="/Dashboard">
                                        <hr />
                                        <div
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition-all"
                                        >
                                            <FontAwesomeIcon icon={faGauge} className="mr-1" />
                                            Dashboard
                                        </div>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Navbar;
