import { useInfiniteQuery } from "@tanstack/react-query";
import DonationCard from "../../Components/Cards/DonationCard";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import CampaignSkeleton from "../../Components/Skeleton/CampaignSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet } from "react-helmet-async";

const DonationCampaign = () => {
    const axiosCommon = useAxiosCommon()
    const ITEMS_PER_PAGE = 6;

    const fetchCampaigns = async ({ pageParam = 0 }) => {
        const { data } = await axiosCommon.get(`/campaigns?limit=${ITEMS_PER_PAGE}&offset=${pageParam}`);
        return { campaigns: data, nextPage: pageParam + ITEMS_PER_PAGE };
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ['campaigns'],
        queryFn: fetchCampaigns,
        getNextPageParam: (lastPage) => lastPage.campaigns.length === ITEMS_PER_PAGE ? lastPage.nextPage : undefined,
    });

    return (
        <div className="my-12 max-w-7xl mx-auto">
            <Helmet>
                <title>PetzAdopt | Donation Campaigns</title>
            </Helmet>
            <h1 className="text-2xl mb-6 sm:text-5xl font-bold text-center">Our Campaigns</h1>
            {isLoading ? <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {
                    Array(6).fill().map((_, index) => (
                        <CampaignSkeleton key={index} />
                    ))
                }
            </div> : <InfiniteScroll
                dataLength={data.pages.flat().length}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={<div className=" mt-6 flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span>
                </div>}

            >
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.pages.flat().map((page) =>
                        page.campaigns.map((campaign, index) => (
                            <DonationCard key={index} campaign={campaign} />
                        ))
                    )}
                </div>

            </InfiniteScroll>}

        </div>
    );
};

export default DonationCampaign;