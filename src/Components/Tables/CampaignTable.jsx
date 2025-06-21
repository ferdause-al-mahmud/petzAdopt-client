/* eslint-disable react/prop-types */
import { FaEdit, FaPause } from "react-icons/fa";
import TableSkeleton from "../Skeleton/TableSkeleton";
import { VscDebugStart } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useState } from "react";
import DonatorsModal from "../Modals/DonatorsModal";

const CampaignTable = ({ handlePause, isLoading, campaignsData }) => {
  const [showModal, setShowModal] = useState(false);
  const [campaign, setCampaign] = useState([]);

  const tbodyStyle =
    "h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500";
  const theadStyle =
    "h-12 px-6 text-sm sm:text-2xl font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100";

  if (isLoading) {
    return (
      <>
        <TableSkeleton></TableSkeleton>
      </>
    );
  }
  return (
    <div>
      <div className="w-full mb-8 overflow-x-auto">
        <table
          className="w-full text-left border border-collapse rounded sm:border-separate border-slate-200"
          cellSpacing="0"
        >
          <tbody>
            <tr>
              <th scope="col" className={theadStyle}>
                Pet Name
              </th>
              <th scope="col" className={theadStyle}>
                Maximum donation amount
              </th>
              <th scope="col" className={theadStyle}>
                Donation progress
              </th>
              <th scope="col" className={theadStyle}>
                Actions
              </th>
            </tr>
            {campaignsData.map((campaign) => (
              <tr key={campaign._id}>
                <td className={tbodyStyle}>{campaign.petName}</td>
                <td className={tbodyStyle}>{campaign.maximumAmount}</td>
                <td className={tbodyStyle}>
                  <progress
                    className="progress progress-success w-56"
                    value={
                      (campaign.donatedAmount / campaign.maximumAmount) * 100
                    }
                    max="100"
                  ></progress>
                </td>
                <td className={tbodyStyle}>
                  <div className="flex flex-col md:flex-row gap-3">
                    <Link
                      to={`/dashboard/update-campaign/${campaign._id}`}
                      className="btn bg-orange-400"
                    >
                      <FaEdit></FaEdit>
                    </Link>
                    <button
                      onClick={() => handlePause(campaign)}
                      className="btn bg-red-300"
                    >
                      {campaign.pause ? <VscDebugStart /> : <FaPause />}
                    </button>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setCampaign(campaign);
                      }}
                      className="btn bg-green-400"
                    >
                      Donators
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <>
            <DonatorsModal
              campaign={campaign}
              setShowModal={setShowModal}
            ></DonatorsModal>
          </>
        )}
      </div>
    </div>
  );
};

export default CampaignTable;
