import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../provider/AuthProvider';

const Register = () => {
    const { createUser, setUser, handleWithGoogle, updateUserProfile } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleRegister = event => {
        event.preventDefault();

        setError('');

        const form = new FormData(event.target);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');

        if (password.length < 6) {
            setError('Password should be at least 6');
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).*$/;

        if (!passwordRegex.test(password)) {
            setError('at least one uppercase, and one lowercase character!');
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Successfully Register',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        });
                        navigate('/');
                    })
                    .catch((err) => {
                        setError(err.message)
                    });
            })
            .catch(err => {
                setError(err.message)
            })

    }

    const handleGoogleRegister = () => {
        handleWithGoogle()
            .then(result => {
                const user = result.user;
                setUser(user);
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully Register',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                navigate('/');
            })
            .catch(err => {
                setError(err.message)
            })
    }

    return (
        <div className='max-w-screen-2xl mx-auto flex justify-center items-center'>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleRegister} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' placeholder="Your Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">PhotoURL</span>
                        </label>
                        <input type="text" name='photo' placeholder="photoURL link" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type='password' name='password' placeholder="password" className="input input-bordered" autoComplete='off' required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                    <p>Already have an account?<span className='text-red-500'><Link to='/login'>Login</Link></span></p>
                </form>
                <button onClick={handleGoogleRegister} className="btn bg-blue-200 m-5"><FcGoogle /> SignUp with Google</button>
                {error && <p className="text-red-500 p-3">{error}</p>}
            </div>

        </div>
    );
};

export default Register;