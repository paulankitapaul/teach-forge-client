import React from 'react';
import Banner from '../../components/Banner';
import Partners from '../../components/Partners';
import PopularClasses from '../../components/PopularClasses';
import BecomeTeacherCTA from '../../components/BecomeTeacherCTA';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div>
                <Partners></Partners>
                <PopularClasses></PopularClasses>
                <BecomeTeacherCTA></BecomeTeacherCTA>
            </div>
        </div>
    );
};

export default Home;