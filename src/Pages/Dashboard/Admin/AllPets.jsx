import { useQuery } from "@tanstack/react-query";
import PetTable from "../../../Components/Tables/PetTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllPets = () => {
    const axiosSecure = useAxiosSecure();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['pets',],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-pets`)
            return data
        },
    })
    return (
        <div>
            <h1 className="text-3xl md:text-5xl my-8 text-center font-bold">All Pets</h1>
            <PetTable data={data} isLoading={isLoading} refetch={refetch}></PetTable>
        </div>
    );
};

export default AllPets;