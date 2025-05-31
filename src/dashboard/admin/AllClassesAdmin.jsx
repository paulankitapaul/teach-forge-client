import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllClassesAdmin = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allClasses = [], refetch } = useQuery({
        queryKey: ['allClasses'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        }
    });

    const handleApprove = async (id) => {
        try {
            await axiosSecure.patch(`/classes/approve/${id}`);
            Swal.fire('Approved!', 'Class has been approved.', 'success');
            refetch();
        } catch (error) {
            Swal.fire('Error', 'Failed to approve class', 'error');
        }
    };

    const handleReject = async (id) => {
        try {
            await axiosSecure.patch(`/classes/reject/${id}`);
            Swal.fire('Rejected!', 'Class has been rejected.', 'info');
            refetch();
        } catch (error) {
            Swal.fire('Error', 'Failed to reject class', 'error');
        }
    };

    return (
        <div className="p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-6">All Classes</h2>
            <table className="min-w-full border divide-y divide-gray-200 shadow-sm">
                <thead className="bg-gray-100">
                    <tr className="text-left text-sm font-semibold text-gray-700">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Teacher Email</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                        <th className="px-4 py-2">Progress</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                    {allClasses.map((cls) => (
                        <tr key={cls._id}>
                            <td className="px-4 py-2">{cls.title}</td>
                            <td className="px-4 py-2">
                                <img src={cls.image} alt="Class" className="h-12 w-12 rounded" />
                            </td>
                            <td className="px-4 py-2">{cls.email}</td>
                            <td className="px-4 py-2">${cls.price}</td>
                            <td className="px-4 py-2 capitalize">{cls.status}</td>
                            <td className="px-4 py-2 space-x-2">
                                <button
                                    onClick={() => handleApprove(cls._id)}
                                    className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                                    disabled={cls.status === 'accepted' || cls.status === 'rejected'}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(cls._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
                                    disabled={cls.status === 'accepted' || cls.status === 'rejected'}
                                >
                                    Reject
                                </button>
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    className={`px-3 py-1 text-sm text-white rounded ${cls.status === 'accepted'
                                            ? 'bg-blue-600 hover:bg-blue-700'
                                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        }`}
                                    disabled={cls.status !== 'accepted'}
                                >
                                    Progress
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllClassesAdmin;
