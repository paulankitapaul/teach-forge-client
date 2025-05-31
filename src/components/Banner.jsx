import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
    return (
        <div className="mb-10">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="h-[400px] rounded-lg overflow-hidden"
            >
                <SwiperSlide>
                    <div className="h-full bg-gradient-to-r from-blue-700 to-purple-600 flex flex-col justify-center items-center text-white text-center px-6">
                        <h1 className="text-4xl font-bold mb-4">Welcome to Teach Forge</h1>
                        <p className="text-lg">Empowering teachers and students through modern online education</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 flex flex-col justify-center items-center text-white text-center px-6">
                        <h1 className="text-4xl font-bold mb-4">Skill Up with Expert-led Classes</h1>
                        <p className="text-lg">Join thousands of learners on their journey to mastery</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="h-full bg-gradient-to-r from-pink-600 to-yellow-500 flex flex-col justify-center items-center text-white text-center px-6">
                        <h1 className="text-4xl font-bold mb-4">Become a Teacher Today</h1>
                        <p className="text-lg">Share your knowledge and inspire the next generation</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
