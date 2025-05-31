import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://teach-forge-server.vercel.app/'
})

const useAxiosPublic = () => {

    return axiosPublic;
    
};

export default useAxiosPublic;