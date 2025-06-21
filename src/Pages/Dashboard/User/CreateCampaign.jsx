import CreateCampaignForm from "../../../Components/Forms/CreateCampaignForm";

const CreateCampaign = () => {
    return (
        <div>
            <div className="my-8 sm:mt-12">
                <h1 className="text-3xl md:text-5xl text-center mb-8 font-bold">Create Campaign</h1>
                <CreateCampaignForm></CreateCampaignForm>
            </div>
        </div>
    );
};

export default CreateCampaign;