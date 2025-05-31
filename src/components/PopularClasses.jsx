import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';

const PopularClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { data: popular = [] } = useQuery({
        queryKey: ['popularClasses'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data
                .filter(cls => cls?.status === 'accepted')
                .sort((a, b) => b?.enrollment - a?.enrollment)
                .slice(0, 6);
        }
    });

    return (
        <div className="py-10 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Popular Classes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {popular.map(cls => (
                    <div key={cls?._id} className="bg-white shadow-md rounded p-4 border">
                        <img src={cls?.image} alt={cls?.title} className="h-40 w-full object-cover rounded mb-2" />
                        <h3 className="text-lg font-semibold">{cls?.title}</h3>
                        <p className="text-sm text-gray-500">Instructor: {cls?.name}</p>
                        <p className="text-sm text-gray-700">Enrolled: {cls?.enrollment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularClasses;
