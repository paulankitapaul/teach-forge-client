import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddClass = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const classData = {
            ...data,
            name: user?.displayName,
            email: user?.email,
            status: 'pending',
            enrollment: 0,
        };

        try {
            const res = await axiosSecure.post('/classes', classData);
            if (res.data.insertedId) {
                Swal.fire('Success!', 'Class added successfully!', 'success');
                reset();
            } else {
                Swal.fire('Error', 'Failed to add class', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Something went wrong!', 'error');
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Class</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <label className="block mb-1 font-medium">Class Title</label>
                    <input
                        type="text"
                        {...register('title', { required: 'Class title is required' })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('price', { required: 'Price is required' })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Image URL</label>
                    <input
                        type="url"
                        {...register('image', { required: 'Image URL is required' })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Teacher Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        readOnly
                        className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Teacher Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Add Class
                </button>
            </form>
        </div>
    );
};

export default AddClass;
