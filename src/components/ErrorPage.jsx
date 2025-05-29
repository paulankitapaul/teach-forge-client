import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const ErrorPage = () => {
    return (
        <div className='max-w-screen-2xl mx-auto m-10 space-y-5'>
            <Helmet>
                <title>Error!</title>
            </Helmet>
            <div className='flex flex-col justify-center items-center min-h-[700px] gap-5'>
                <h1 className="text-6xl font-bold text-red-600">404!</h1>
                <h2 className="text-4xl font-bold">No Page Found!!</h2>
                <Link to='/'
                    className="btn bg-blue-400 font-bold text-xl text-white">Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;