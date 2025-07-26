import { useMutation, useQuery } from "@tanstack/react-query";
import AllUsersForm from "../../../Components/Tables/AllUsersForm";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: usersData, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users`)
            return data
        },
    })
    const { mutateAsync: mutateUpdate } = useMutation({
        mutationFn: async (user) => {
            try {
                const { data } = await axiosSecure.put(`/user/update/${user._id}`);
                return data;
            } catch (error) {
                throw new Error("An error occurred");
            }
        },
        onSuccess: () => {
            console.log('Deleted successfully');

        },
        onError: (error) => {
            console.error('Error deleting user request:', error.message);
        }
    });
    const handleMakeAdmin = (user) => {
        // console.log(user)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await mutateUpdate(user)
                refetch()
                Swal.fire({
                    title: "Success!",
                    text: "User role has been updated.",
                    icon: "success"
                });
            }
        });
    }
    return (
        <div>
            <h1 className="text-3xl md:text-5xl my-8 text-center font-bold">All users</h1>
            <AllUsersForm usersData={usersData} isLoading={isLoading} handleMakeAdmin={handleMakeAdmin} />
        </div>
    );
};

export default AllUsers;