import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const NavBar = () => {
    const { user, logOut } = useAuth();
    return (
        <div className='navbar bg-base-100 shadow-sm container px-4 mx-auto'>
            <div className='flex-1'>
                <p className='flex gap-2 items-center'>
                    <span className='font-bold'>Teach Forge</span>
                </p>
            </div>
            <div className='flex-none'>
                <ul className='menu menu-horizontal px-1'>
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Lost & Found Items</NavLink>
                    </li>

                    {!user && (
                        <li>
                            <NavLink to='/login'>Login</NavLink>
                        </li>
                    )}
                </ul>

                {user && (
                    <div className='dropdown dropdown-end z-50'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='btn btn-ghost btn-circle avatar'
                        >
                            <div title={user?.displayName} className='w-10 rounded-full'>
                                <img
                                    alt='User Profile Photo'
                                    src={user?.photoURL}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2'
                        >
                            <li>
                                <NavLink to='/dashboard'>Dashboard</NavLink>
                            </li>
                            <li className='mt-2'>
                                <button
                                    onClick={logOut}
                                    className='bg-gray-200 block text-center'
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
};

export default NavBar;