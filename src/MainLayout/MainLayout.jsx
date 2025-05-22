import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../shared/NavBar';

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            {/* Footer */}
        </div>
    );
};

export default MainLayout;