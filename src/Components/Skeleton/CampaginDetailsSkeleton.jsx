import Skeleton from 'react-loading-skeleton';

const CampaginDetailsSkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Skeleton height={400} />
                <div className="p-4 md:p-6">
                    <Skeleton height={40} width="80%" />
                    <Skeleton count={3} height={20} width="100%" />
                    <div className="flex flex-col md:flex-row md:justify-between mt-6">
                        <Skeleton height={40} width="30%" />
                        <Skeleton height={40} width="30%" />
                        <Skeleton height={40} width="30%" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaginDetailsSkeleton;