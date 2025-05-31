import { Link } from 'react-router-dom';

const BecomeTeacherCTA = () => {
    return (
        <div className="bg-blue-600 text-white py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Become a Teacher at Teach Forge</h2>
            <p className="mb-6">Inspire the next generation. Share your skills and knowledge today.</p>
            <Link to="/teach-on" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100">
                Apply to Teach
            </Link>
        </div>
    );
};

export default BecomeTeacherCTA;
