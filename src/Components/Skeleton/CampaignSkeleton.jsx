import Skeleton from 'react-loading-skeleton';

const CampaignSkeleton = () => {
    return (
        <div className="max-w-sm rounded border overflow-hidden shadow-lg m-4 bg-white">
            <Skeleton height={192} />
            <div className="px-6 space-y-3 py-4">
                <Skeleton height={30} width={`80%`} />
                <Skeleton height={20} width={`60%`} />
                <Skeleton height={20} width={`40%`} />
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                <Skeleton height={36} width={`30%`} />
            </div>
        </div>
    );
};

export default CampaignSkeleton;
