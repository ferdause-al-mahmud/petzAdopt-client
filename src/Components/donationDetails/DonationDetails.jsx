import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DonateModal from "../Modals/DonateModal";
import parse from "html-react-parser";
import CampaginDetailsSkeleton from "../Skeleton/CampaginDetailsSkeleton";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DonationCard from "../Cards/DonationCard";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useAuth from "../../hooks/useAuth";
const DonationDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();
  const {
    data: campaign,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donation-campaign-details", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/campaigns/${id}`);
      return data;
    },
    enabled: !!id,
  });
  const { data: recommendedCampaigns, isLoading: isLoadingRecommended } =
    useQuery({
      queryKey: ["recommended-campaigns", id],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/recommended-campaigns/${id}`);
        return data;
      },
      enabled: !!id,
    });
  if (isLoading) return <CampaginDetailsSkeleton></CampaginDetailsSkeleton>;
  if (isLoadingRecommended)
    return <CampaginDetailsSkeleton></CampaginDetailsSkeleton>;

  const {
    petImage,
    petName,
    maximumAmount,
    donatedAmount,
    lastDateOfDonation,
    shortDescription,
    longDescription,
    pause,
  } = campaign;

  // console.log(parseFloat(campaign.maximumAmount) >= parseFloat(campaign.donatedAmount))
  return (
    <>
      <div className="mx-auto px-4 mt-16 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            className="w-full md:h-[600px] object-cover"
            src={petImage}
            alt={petName}
          />
          <div className="p-4 md:p-6">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
            >
              {petName}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gray-600 mt-2 md:text-lg"
            >
              {shortDescription}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-700 mt-4 md:text-base"
            >
              {parse(longDescription)}
            </motion.p>
            <div className="mt-4">
              <button
                disabled={
                  pause ||
                  parseFloat(campaign.maximumAmount) <=
                    parseFloat(campaign.donatedAmount) ||
                  !user
                }
                onClick={() => setShowModal(true)}
                className="btn bg-rose-100 !text-rose-900 text-white  md:mt-0"
              >
                Donate Now
              </button>
              {!user && (
                <p className="mt-2 text-red-500 font-medium">
                  You need to login to donate
                </p>
              )}
            </div>
            <div className="flex flex-col md:flex-row md:justify-between mt-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex-1 flex flex-col justify-center space-y-2 animate__animated animate__fadeInUp"
              >
                <div className="text-gray-800 font-semibold">
                  Maximum Donation Amount:
                </div>
                <div className="text-[#ff946b] font-semibold">
                  ${maximumAmount}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex-1 flex flex-col justify-center space-y-2 animate__animated animate__fadeInUp"
              >
                <div className="text-gray-800 font-semibold">
                  Donated Amount:
                </div>
                <div className="text-[#ff946b] font-semibold">
                  ${donatedAmount}
                </div>
              </motion.div>
              {/* <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex-1 flex flex-col justify-center space-y-2 animate__animated animate__fadeInUp"
              >
                <div className="text-[#ff946b] font-semibold">
                  Last Date of Donation:
                </div>
                <div>{lastDateOfDonation}</div>
              </motion.div> */}
            </div>
          </div>
        </motion.div>
        {showModal && (
          <DonateModal
            refetch={refetch}
            campaign={campaign}
            setShowModal={setShowModal}
          ></DonateModal>
        )}
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl mb-16 text-center font-bold">
          Recommended Campaigns
        </h1>
        <div className="flex flex-wrap justify-center">
          {recommendedCampaigns.map((campaign, index) => (
            <DonationCard key={index} campaign={campaign} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DonationDetails;
