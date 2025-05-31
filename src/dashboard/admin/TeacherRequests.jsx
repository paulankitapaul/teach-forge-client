import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const TeacherRequests = () => {
    const axiosSecure = useAxiosSecure();

    // ✅ Fetch all teacher requests
    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ["teacherRequests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/teacher-requests");
            return res.data;
        },
    });

    // ✅ Approve request
    const handleApprove = async (id, email) => {
        const res = await axiosSecure.patch(`/teacher-requests/approve/${id}`, { email });
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Success", "Teacher request approved!", "success");
            queryClient.invalidateQueries(["teacherRequests"]);
        }
    };

    // ✅ Reject request with confirmation
    const handleReject = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This request will be marked as rejected.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Reject",
        });

        if (confirm.isConfirmed) {
            const res = await axiosSecure.patch(`/teacher-requests/reject/${id}`);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire("Rejected", "Teacher request has been rejected.", "info");
                queryClient.invalidateQueries(["teacherRequests"]);
            }
        }
    };

    return (
        <div className="p-4 min-h-screen">
            <Helmet><title>Admin | Teacher Requests</title></Helmet>
            <h2 className="text-2xl font-bold mb-4">Teacher Requests</h2>

            {/* Loading & Empty States */}
            {isLoading ? (
                <p className="text-lg">Loading...</p>
            ) : requests.length === 0 ? (
                <p>No teacher requests found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border">
                        <thead className="bg-base-200">
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Experience</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req, index) => (
                                <tr key={req._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={req.image} alt="user" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{req.name}</td>
                                    <td>{req.email}</td>
                                    <td>{req.title}</td>
                                    <td>{req.category}</td>
                                    <td className="capitalize">{req.experience}</td>
                                    <td>
                                        <span
                                            className={`badge ${req.status === "pending"
                                                ? "badge-warning"
                                                : req.status === "accepted"
                                                    ? "badge-success"
                                                    : "badge-error"
                                                }`}
                                        >
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="flex flex-col gap-1 items-center">
                                        <button
                                            onClick={() => handleApprove(req._id, req.email)}
                                            disabled={req.status === "accepted" || req.status === "rejected"}
                                            className="btn btn-xs btn-success w-24"
                                        >
                                            ✅ Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(req._id)}
                                            disabled={req.status === "rejected"}
                                            className="btn btn-xs btn-error w-24"
                                        >
                                            ❌ Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TeacherRequests;
