import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../shared/NavBar';
import { Helmet } from 'react-helmet-async';

const MainLayout = () => {
    return (
        <div>
            <Helmet>
                <title>Teach Forge</title>
            </Helmet>
            <NavBar></NavBar>
            <Outlet></Outlet>
            {/* Footer */}
        </div>
    );
};

export default MainLayout;