import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import CampaignTable from "../../../Components/Tables/CampaignTable";

const MyDonationCampaigns = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: campaignsData = [], isLoading } = useQuery({
    queryKey: ["my-donation-campaign"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/campaigns/my-added/${user.email}`
      );
      return data;
    },
  });
  //update campaign
  const { mutateAsync } = useMutation({
    mutationFn: async (campaign) => {
      try {
        const { data } = await axiosSecure.patch(
          `/campaign/pause/${campaign._id}`
        );
        return data;
      } catch (error) {
        throw new Error("An error occurred");
      }
    },
    onSuccess: () => {
      console.log("Data Updated Successfully");
      toast.success("Data Updated Successfully!");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const handlePause = async (campaign) => {
    campaign.pause = !campaign.pause;
    await mutateAsync(campaign);
  };
  return (
    <div className="my-8 sm:mt-12">
      <h1 className="text-3xl md:text-5xl text-center mb-8 font-bold">
        My donation campaigns
      </h1>
      <CampaignTable
        campaignsData={campaignsData}
        isLoading={isLoading}
        handlePause={handlePause}
      ></CampaignTable>
    </div>
  );
};

export default MyDonationCampaigns;
