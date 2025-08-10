import { useMutation, useQuery } from "@tanstack/react-query";
import AllUsersForm from "../../../Components/Tables/AllUsersForm";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: usersData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users`);
      return data;
    },
  });

  const { mutateAsync: mutateUpdate } = useMutation({
    mutationFn: async ({ userId, newRole }) => {
      try {
        const { data } = await axiosSecure.put(`/user/update/${userId}`, {
          role: newRole,
        });
        return data;
      } catch (error) {
        throw new Error("An error occurred");
      }
    },
    onSuccess: () => {
      console.log("Role updated successfully");
    },
    onError: (error) => {
      console.error("Error updating user role:", error.message);
    },
  });

  const handleRoleChange = (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    const actionText =
      newRole === "admin" ? "make admin" : "remove admin privileges";
    const confirmText =
      newRole === "admin" ? "Yes, make admin!" : "Yes, remove admin!";

    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${actionText} for this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmText,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateUpdate({ userId: user._id, newRole });
        refetch();
        Swal.fire({
          title: "Success!",
          text: `User role has been updated to ${newRole}.`,
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl md:text-5xl my-8 text-center font-bold">
        All users
      </h1>
      <AllUsersForm
        usersData={usersData}
        isLoading={isLoading}
        handleRoleChange={handleRoleChange}
      />
    </div>
  );
};

export default AllUsers;
