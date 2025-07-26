import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UpdateCampaignForm from "../../Forms/UpdateCampaignForm";

const UpdateCampaign = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: campaignData = [], isLoading } = useQuery({
        queryKey: ['update-campaign'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/campaigns/${id}`)
            return data
        },
    })
    return (
        <div className="my-8 sm:mt-12">
            <h1 className="text-3xl md:text-5xl text-center mb-8 font-bold">Update Campaign</h1>
            <UpdateCampaignForm campaignData={campaignData} isLoading={isLoading}></UpdateCampaignForm>
        </div>
    );
};

export default UpdateCampaign;