import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyEnrollClass = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: enrolledClasses = [], isLoading } = useQuery({
        queryKey: ['enrolledClasses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enroll/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    if (isLoading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">My Enrolled Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledClasses.map(cls => (
                    <div key={cls?.classId} className="bg-white border rounded shadow">
                        <img src={cls?.image} alt={cls?.title} className="w-full h-48 object-cover" />
                        <div className="p-4 space-y-2">
                            <h3 className="text-xl font-semibold">{cls?.title}</h3>
                            <p className="text-gray-600 text-sm">Instructor: {cls.instructor}</p>
                            <Link
                                className="block bg-blue-600 text-white px-4 py-2 rounded mt-2 text-center hover:bg-blue-700"
                            >
                                Continue
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEnrollClass;
