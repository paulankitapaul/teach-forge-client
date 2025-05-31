import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem('access-token');

  const { data, isLoading } = useQuery({
    queryKey: [user?.email, 'userRole', token],
    enabled: !!user?.email && !!token,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data;
    },
  });

  return {
    isAdmin: data?.admin || false,
    isTeacher: data?.teacher || false,
    isLoading
  };
};

export default useRole;
