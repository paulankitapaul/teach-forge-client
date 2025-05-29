// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { Helmet } from "react-helmet-async";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const AllUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [searchText, setSearchText] = useState("");
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         const delayDebounce = setTimeout(() => {
//             axiosSecure
//                 .get(`/users?search=${searchText}`)
//                 .then(res => setUsers(res.data))
//                 .catch(err => console.error(err));
//         }, 500);

//         return () => clearTimeout(delayDebounce);
//     }, [searchText, axiosSecure]);

//     const handleMakeAdmin = (id) => {
//         axiosSecure.patch(`/users/admin/${id}`)
//             .then(res => {
//                 if (res.data.modifiedCount > 0) {
//                     Swal.fire("Updated!", "User is now Admin", "success");
//                     setUsers(users.map(user => user._id === id ? { ...user, role: "admin" } : user));
//                 }
//             });
//     };

//     return (
//         <div className="p-4">
//             <Helmet>
//                 <title>Admin | All Users</title>
//             </Helmet>

//             <div className="mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search by name or email..."
//                     value={searchText}
//                     onChange={(e) => setSearchText(e.target.value)}
//                     className="input input-bordered w-full max-w-md"
//                 />
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="table w-full">
//                     <thead className="bg-gray-200">
//                         <tr>
//                             <th>#</th>
//                             <th>Image</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Make Admin</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr key={user._id}>
//                                 <td>{index + 1}</td>
//                                 <td>
//                                     <div className="avatar">
//                                         <div className="w-10 rounded-full">
//                                             <img src={user.image} alt="User" />
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.role || "student"}</td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleMakeAdmin(user._id)}
//                                         className="btn btn-xs btn-success"
//                                         disabled={user.role === "admin"}
//                                     >
//                                         Make Admin
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AllUsers;
