/* eslint-disable react/prop-types */
import { AiOutlineDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import TableSkeleton from "../Skeleton/TableSkeleton";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const PetTable = ({ refetch, isLoading, data }) => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data?.slice(startIndex, endIndex);

  // Update API
  const { mutateAsync: mutateAdopt } = useMutation({
    mutationFn: async (pet) => {
      try {
        const { data } = await axiosSecure.patch(`/pets/adopt/${pet._id}`);
        return data;
      } catch (error) {
        throw new Error("An error occurred");
      }
    },
    onSuccess: () => {
      toast.success("Pet marked as adopted successfully!");
    },
    onError: (error) => {
      console.error("Error updating pet:", error.message);
    },
  });

  // Delete API
  const { mutateAsync: mutateDelete } = useMutation({
    mutationFn: async (pet) => {
      try {
        const { data } = await axiosSecure.delete(`/pets/delete/${pet._id}`);
        return data;
      } catch (error) {
        throw new Error("An error occurred");
      }
    },
    onSuccess: () => {
      console.log("Deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting pet:", error.message);
    },
  });

  const handleDelete = async (pet) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateDelete(pet);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Pet has been deleted successfully.",
          icon: "success",
        });
      }
    });
  };

  const handleAdopted = async (pet) => {
    if (pet.adopted) {
      toast.info("This pet is already adopted!");
      return;
    }
    await mutateAdopt(pet);
    refetch();
  };

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Table styles
  const tbodyStyle =
    "h-12 px-6 text-xl capitalize transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500";
  const theadStyle =
    "h-12 px-6 text-sm sm:text-2xl font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100";

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table
        className="w-full text-left border border-collapse rounded sm:border-separate border-slate-200"
        cellSpacing="0"
      >
        <tbody>
          <tr>
            <th scope="col" className={theadStyle}>
              Serial No.
            </th>
            <th scope="col" className={theadStyle}>
              Pet Name
            </th>
            <th scope="col" className={theadStyle}>
              Category
            </th>
            <th scope="col" className={theadStyle}>
              Pet Image
            </th>
            <th scope="col" className={theadStyle}>
              Adoption Status
            </th>
            <th scope="col" className={theadStyle}>
              Actions
            </th>
          </tr>
          {currentData?.map((pet, idx) => (
            <tr key={pet._id}>
              <td className={tbodyStyle}>{startIndex + idx + 1}</td>
              <td className={tbodyStyle}>{pet.petName}</td>
              <td className={tbodyStyle}>{pet.category}</td>
              <td className={tbodyStyle}>
                <img
                  src={pet.petImage}
                  alt="Pet"
                  className="w-[50px] h-[50px] object-cover rounded"
                />
              </td>
              <td className={tbodyStyle}>
                <span
                  className={`px-2 py-1 rounded text-sm font-semibold ${
                    pet.adopted
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {pet.adopted ? "Adopted" : "Available"}
                </span>
              </td>
              <td className={tbodyStyle}>
                <div className="flex flex-col md:flex-row gap-3">
                  <Link
                    to={`/dashboard/update-pet/${pet._id}`}
                    className="btn text-white bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded flex items-center justify-center"
                  >
                    <GrUpdate />
                  </Link>
                  <button
                    className="btn text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded flex items-center justify-center"
                    onClick={() => handleDelete(pet)}
                  >
                    <AiOutlineDelete />
                  </button>
                  <button
                    className={`btn text-white px-3 py-2 rounded ${
                      pet.adopted
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => handleAdopted(pet)}
                    disabled={pet.adopted}
                  >
                    {pet.adopted ? "Adopted" : "Mark as Adopted"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {data?.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={goToFirstPage}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-100 rounded">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default PetTable;
