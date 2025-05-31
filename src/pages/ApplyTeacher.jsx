import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRole from "../hooks/useRole";

const ApplyTeacher = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { isTeacher, isLoading: roleLoading } = useRole();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);

    const { data: requestData, isLoading: requestLoading, refetch } = useQuery({
        queryKey: ["teacherRequest", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/teacher-requests/${user?.email}`);
            return res.data;
        },
    });

    // Watch status and control button state
    useEffect(() => {
        const status = requestData?.status;
        if (status === "pending" || status === "accepted") {
            setIsAlreadySubmitted(true);
        } else {
            setIsAlreadySubmitted(false);
        }
    }, [requestData]);

    // Form Submit
    const onSubmit = async (data) => {
        const teacherData = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
            title: data?.title,
            category: data?.category,
            experience: data?.experience,
            status: "pending"
        };

        try {
            const res = await axiosSecure.post("/teacher-requests", teacherData);
            if (res.data.insertedId) {
                Swal.fire("Submitted!", "Your application is under review.", "success");
                setIsAlreadySubmitted(true); // lock button again
                refetch(); // refresh request data
                reset();
            }
        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Could not submit form.", "error");
        }
    };

    if (roleLoading || requestLoading) return <p className="p-4">Loading...</p>;

    const status = requestData?.status;

    if (isTeacher) {
        return (
            <div className="max-w-lg mx-auto p-6 min-h-[700px] my-10">
                <Helmet><title>Teacher Dashboard</title></Helmet>
                <h2 className="text-2xl font-bold mb-4">Welcome, {user?.displayName} 👋</h2>
                <p>You're already a <strong>teacher</strong>. Here's what you can do:</p>
                <div className="mt-4 space-y-3">
                    <Link to="/dashboard/add-class" className="btn btn-primary w-full">➕ Add Class</Link>
                    <Link to="/dashboard/my-classes" className="btn btn-secondary w-full">📋 My Classes</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            <Helmet><title>Apply as Teacher</title></Helmet>
            <h2 className="text-2xl font-semibold mb-4">Apply to Teach on EduManage</h2>

            {status === "pending" && (
                <div className="alert alert-info mb-4">
                    Your request is currently <strong className="text-white">Pending</strong>.
                </div>
            )}
            {status === "rejected" && (
                <div className="alert alert-error mb-4">
                    ❌ Your previous request was <strong>Rejected</strong>. You can submit again.
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={user?.displayName}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="block font-medium mb-1">Experience</label>
                    <select
                        {...register("experience", { required: "Experience level is required" })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select</option>
                        <option value="beginner">Beginner</option>
                        <option value="mid-level">Mid-Level</option>
                        <option value="experienced">Experienced</option>
                    </select>
                    {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>}
                </div>

                {/* Title */}
                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        className="input input-bordered w-full"
                        placeholder="e.g., Full Stack Web Developer"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium mb-1">Category</label>
                    <select
                        {...register("category", { required: "Category is required" })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Choose one</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Data Science">Data Science</option>
                        <option value="AI & ML">AI & ML</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isAlreadySubmitted}
                >
                    {isAlreadySubmitted ? "Already Submitted" : "Submit for Review"}
                </button>
            </form>
        </div>
    );
};

export default ApplyTeacher;
