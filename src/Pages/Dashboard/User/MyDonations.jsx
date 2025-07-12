import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MyDonationsTable from "../../../Components/Tables/MyDonationsTable";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyDonations = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: donationsData = [], isLoading, refetch } = useQuery({
        queryKey: ['my-donations'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-donations/${user.email}`)
            return data
        },
    })

    const { mutateAsync: mutatePayment } = useMutation({
        mutationFn: async (donation) => {
            try {
                const { data } = await axiosSecure.delete(`/payment/refund/${donation.paymentId}`);
                return data;
            } catch (error) {
                throw new Error("An error occurred");
            }
        },
        onSuccess: () => {
            console.log('Deleted successfully');

        },
        onError: (error) => {
            toast.error('Error deleting pet:', error.message);
        }
    });

    const { mutateAsync: mutateCampaign } = useMutation({
        mutationFn: async donation => {
            try {
                const { data } = await axiosSecure.put(`/campaign/update/`, donation);
                return data;
            } catch (error) {
                throw new Error("An error occurred");
            }
        },
        onSuccess: () => {
            console.log('Campaign Successfully');
            // toast.success('Refunded Successfully!');
        },
        onError: (error) => {
            console.log(error.message);
        }
    });

    const handleRefund = (donation) => {
        console.log(donation)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await mutateCampaign(donation);
                await mutatePayment(donation)
                refetch()
                Swal.fire({
                    title: "Refunded!",
                    text: "Your donation has been refunded.",
                    icon: "success"
                });
            }
        })
    }
    return (
        <div className="my-8 sm:mt-12">
            <h1 className="text-3xl md:text-5xl text-center mb-8 font-bold">My Donations</h1>
            <MyDonationsTable handleRefund={handleRefund} donationsData={donationsData} isLoading={isLoading}></MyDonationsTable>
        </div>
    );
};

export default MyDonations;