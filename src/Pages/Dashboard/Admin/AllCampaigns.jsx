import { useMutation, useQuery } from "@tanstack/react-query";
import CampaignTable from "../../../Components/Tables/CampaignTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AllCampaigns = () => {
  const axiosSecure = useAxiosSecure();

  const { data: campaignsData = [], isLoading } = useQuery({
    queryKey: ["my-donation-campaign"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/campaigns`);
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
      // console.log('Data Updated Successfully');
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
    <div>
      <h1 className="text-3xl md:text-5xl my-8 text-center font-bold">
        All Donations
      </h1>
      <CampaignTable
        campaignsData={campaignsData}
        isLoading={isLoading}
        handlePause={handlePause}
      ></CampaignTable>
    </div>
  );
};

export default AllCampaigns;
