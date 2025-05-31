import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const AllClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: classes = [], isLoading, refetch } = useQuery({
        queryKey: ['allApprovedClasses'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data.filter(cls => cls.status === 'accepted');
        }
    });

    const handleEnroll = async (cls) => {
        if (!user?.email) {
            return Swal.fire('Unauthorized', 'You must be logged in to enroll.', 'warning');
        }

        const enrollment = {
            classId: cls?._id,
            email: user?.email,
            title: cls?.title,
            image: cls?.image,
            instructor: cls?.name,
        };

        try {
            const res = await axiosSecure.post('/enroll', enrollment);
            if (res.data.insertedId) {
                Swal.fire('Enrolled!', 'You have successfully enrolled.', 'success');
                refetch();
                navigate('/dashboard/enrollments');
            }
        } catch (error) {
            Swal.fire('Error', error?.response?.data?.message || 'Already enrolled', 'error');
        }
    };

    if (isLoading) return <p className="text-center py-10">Loading classes...</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">All Classes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {classes.map(cls => (
                    <div key={cls?._id} className="bg-white rounded-lg shadow-md border overflow-hidden">
                        <img src={cls?.image} alt={cls?.title} className="w-full h-48 object-cover" />
                        <div className="p-4 space-y-2">
                            <h3 className="text-xl font-semibold">{cls?.title}</h3>
                            <p className="text-sm text-gray-600">Teacher: {cls?.name}</p>
                            <p className="text-sm text-gray-500">{cls?.description?.slice(0, 80)}...</p>
                            <p className="text-sm text-gray-800 font-medium">Price: ${cls?.price}</p>
                            <p className="text-sm text-gray-500">Enrolled: {cls?.enrollment || 0}</p>
                            <button
                                onClick={() => handleEnroll(cls)}
                                className="block w-full mt-2 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                Enroll
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllClasses;
