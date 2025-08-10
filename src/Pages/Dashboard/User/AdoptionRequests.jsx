import Swal from "sweetalert2";
import AdoptionRequestsTable from "../../../Components/Tables/AdoptionRequestsTable";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AdoptionRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { mutateAsync: mutateAccept } = useMutation({
    mutationFn: async (adoption) => {
      try {
        const { data } = await axiosSecure.put(
          `adoption-requests/accept`,
          adoption
        );
        return data;
      } catch (error) {
        throw new Error("An error occurred");
      }
    },
    onSuccess: () => {
      toast.success("Adoption accepted successfully!");
    },
    onError: (error) => {
      console.error("Error accepting pet:", error.message);
    },
  });

  const { mutateAsync: mutateDelete } = useMutation({
    mutationFn: async (adoption) => {
      try {
        const { data } = await axiosSecure.delete(
          `/adoption-request/delete/${adoption._id}`
        );
        return data;
      } catch (error) {
        throw new Error("An error occurred");
      }
    },
    onSuccess: () => {
      console.log("Deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting adoption request:", error.message);
    },
  });

  const handleReject = (adoption, refetch) => {
    // console.log(adoption)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateDelete(adoption);
        refetch();
        Swal.fire({
          title: "Rejected!",
          text: "Adoption request has been rejected.",
          icon: "success",
        });
      }
    });
  };

  const handleAccept = async (adoption, refetch) => {
    // console.log(adoption);
    await mutateAccept(adoption);
    refetch();
  };
  return (
    <div>
      <div className="my-8 sm:mt-12">
        <h1 className="text-3xl md:text-5xl text-center mb-8 font-bold">
          Adoption Requests
        </h1>
        <AdoptionRequestsTable
          handleAccept={handleAccept}
          handleReject={handleReject}
        ></AdoptionRequestsTable>
      </div>
    </div>
  );
};

export default AdoptionRequests;
