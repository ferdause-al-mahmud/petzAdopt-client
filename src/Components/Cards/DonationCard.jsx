/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const DonationCard = ({ campaign }) => {
    const { _id, petName, petImage, maximumAmount, donatedAmount } = campaign;
    // console.log(campaign)
    return (
        <div className="max-w-sm rounded border overflow-hidden shadow-lg m-4 bg-white">
            <img className="w-full h-48 object-cover" src={petImage} alt={petName} />
            <div className="px-6 space-y-3  py-4">
                <div className="font-bold text-2xl mb-2">{petName}</div>
                <p className="text-gray-700 md:text-xl  text-base">
                    <span className="font-semibold ">Maximum Donation Amount:</span> ${maximumAmount}
                </p>
                <p className="text-gray-700 md:text-xl text-base">
                    <span className="font-semibold ">Donated Amount:</span> ${donatedAmount}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                <Link to={`/donation-campaign/${_id}`} className="btn bg-[#ff946b] text-white f rounded">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default DonationCard;
