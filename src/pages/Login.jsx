import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const { userLogin, setUser, handleWithGoogle } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = event => {
        event.preventDefault();

        const form = new FormData(event.target);
        const email = form.get('email');

        const password = form.get('password');


        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully Login',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                navigate("/");
            })
            .catch((err) => {
                setError(err.message);
            });
    }

    const handleGoogleLogin = () => {
        handleWithGoogle()
            .then(result => {
                const user = result.user;
                setUser(user);
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully Login',
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
        <div className='max-w-screen-2xl mx-auto my-7'>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleLogin} className="card-body">
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
                        <input type="password" name='password' placeholder="password" className="input input-bordered" autoComplete='off' required />
                        <label className="label">
                            <a className="label-text-alt btn link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                    <p>New to Website?<span className='text-red-500'><Link to='/register'>Register</Link></span></p>
                </form>
                <button onClick={handleGoogleLogin} className="btn bg-blue-200 m-4"><FcGoogle /> Login With Google</button>
                {error && <p className="text-red-500 p-3">{error}</p>}
            </div>
        </div>
    );
};

export default Login;