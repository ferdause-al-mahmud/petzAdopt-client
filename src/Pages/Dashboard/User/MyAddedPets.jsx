import { useQuery } from "@tanstack/react-query";
import PetTable from "../../../Components/Tables/PetTable";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyAddedPets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/pets-added/${user.email}`);
      return data;
    },
  });
  return (
    <div className="my-8 sm:mt-12">
      <h1 className="text-3xl md:text-5xl text-center font-bold mb-8">
        My added pets
      </h1>
      <PetTable data={data} isLoading={isLoading} refetch={refetch}></PetTable>
    </div>
  );
};

export default MyAddedPets;
