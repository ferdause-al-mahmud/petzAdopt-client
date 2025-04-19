import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useGetRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { email } = user;
    const { data } = useQuery({
        queryKey: ['user-role'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${email}`)
            return data
        },
    })
    return data?.role;
};

export default useGetRole;