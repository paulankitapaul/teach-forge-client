import { Outlet, Link } from "react-router-dom";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();
    const { isAdmin, isTeacher, isLoading } = useRole();

    if (isLoading) return <p className="p-6">Loading dashboard...</p>;

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-5">
                <h2 className="text-xl font-bold mb-6">Dashboard</h2>
                <ul className="space-y-3">

                    {/* Admin Links */}
                    {isAdmin && (
                        <>
                            <li><Link to="/dashboard/teacher-requests" className="hover:underline">Teacher Requests</Link></li>
                            <li><Link to="/dashboard/users" className="hover:underline">All Users</Link></li>
                            <li><Link to="/dashboard/all-classes" className="hover:underline">All Classes</Link></li>
                            <li><Link to="/dashboard/profile" className="hover:underline">Profile</Link></li>
                        </>
                    )}

                    {/* Teacher Links */}
                    {isTeacher && !isAdmin && (
                        <>
                            <li><Link to="/dashboard/add-class" className="hover:underline">Add Class</Link></li>
                            <li><Link to="/dashboard/my-classes" className="hover:underline">My Classes</Link></li>
                            <li><Link to="/dashboard/profile" className="hover:underline">Profile</Link></li>
                        </>
                    )}

                    {/* Student/User Links */}
                    {!isAdmin && !isTeacher && (
                        <>
                            <li><Link to="/dashboard/enrollments" className="hover:underline">My Enrollments</Link></li>
                            <li><Link to="/dashboard/profile" className="hover:underline">Profile</Link></li>
                        </>
                    )}

                    
                    <li><Link to="/" className="hover:underline">Back to Home</Link></li>
                </ul>
            </div>

            {/* Page Content */}
            <div className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
