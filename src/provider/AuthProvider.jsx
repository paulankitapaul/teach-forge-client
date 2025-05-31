import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const provider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const handleWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const authInfo = {
        user,
        setUser,
        createUser,
        userLogin,
        handleWithGoogle,
        logOut,
        updateUserProfile,
        loading

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userInfo = { email: currentUser.email };

                const res = await axiosPublic.post('/jwt', userInfo);
                if (res.data.token) {
                    localStorage.setItem('access-token', res.data.token);
                }
                setUser(currentUser);

            } else {
                localStorage.removeItem('access-token');
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [axiosPublic]);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;