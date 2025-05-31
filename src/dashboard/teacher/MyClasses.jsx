import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyClasses = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myClasses = [], refetch } = useQuery({
        queryKey: ['myClasses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This class will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/classes/${id}`);
                Swal.fire('Deleted!', 'Your class has been removed.', 'success');
                refetch();
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete class.', 'error');
            }
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">My Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myClasses.map((cls) => (
                    <div key={cls._id} className="bg-white shadow-md rounded-lg overflow-hidden border">
                        <img src={cls.image} alt={cls.title} className="h-48 w-full object-cover" />
                        <div className="p-4 space-y-2">
                            <h3 className="text-lg font-semibold">{cls.title}</h3>
                            <p className="text-sm text-gray-600">Status: <span className="capitalize">{cls.status}</span></p>
                            <p className="text-sm">Price: ${cls.price}</p>
                            <p className="text-sm text-gray-500">{cls.description?.slice(0, 80)}...</p>
                            <div className="flex justify-between gap-2 pt-3">
                                {/* Update Link - you can also use a modal */}
                                {/* to={`/dashboard/update-class/${cls._id}`}  */}
                                <Link className="text-sm text-white bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600">
                                    Update
                                </Link>

                                <Link
                                    className={`text-sm px-3 py-1 rounded ${cls.status === 'accepted' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                                        }`}
                                >
                                    See Details
                                </Link>

                                {/* Delete */}
                                <button
                                    onClick={() => handleDelete(cls._id)}
                                    className="text-sm text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyClasses;
