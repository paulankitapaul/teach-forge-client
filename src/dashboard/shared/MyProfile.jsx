import React from 'react';
import useAuth from '../../hooks/useAuth';

const MyProfile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
            <div className="flex flex-col items-center text-center">
                <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800">{user?.displayName || 'No Name'}</h2>
                <p className="text-gray-600 text-sm mt-1 capitalize">{user?.role || 'student'}</p>
                <div className="mt-4 space-y-2 text-left w-full">
                    <div className="bg-gray-100 p-3 rounded">
                        <strong>Email:</strong> {user?.email || 'N/A'}
                    </div>
                    <div className="bg-gray-100 p-3 rounded">
                        <strong>Phone:</strong> {user?.phone || 'Not Provided'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
