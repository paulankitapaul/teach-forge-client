import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../shared/NavBar';
import { Helmet } from 'react-helmet-async';
import Footer from '../shared/Footer';

const MainLayout = () => {
    return (
        <div>
            <Helmet>
                <title>Teach Forge</title>
            </Helmet>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;