import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PetDetailSkeleton from "../Skeleton/PetDetailSkeleton";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import AdoptModal from "../Modals/AdoptModal";

const PetCardDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [detailPet, setDetailPet] = useState([]);
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: petDetails = [], isLoading } = useQuery({
    queryKey: ["pet-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/pets/${id}`);
      return data;
    },
  });
  if (isLoading) {
    return <PetDetailSkeleton></PetDetailSkeleton>;
  }
  const {
    petImage,
    petName,
    description,
    petAge,
    petLocation,
    longDescription,
  } = petDetails;

  return (
    <div className="mt-16">
      <section className="bg-gray-100 text-gray-800 ">
        <div className=" max-w-7xl mx-auto container flex flex-col justify-center p-6 gap-6 sm:py-12 lg:py-24 md:flex-row">
          <div className="flex md:w-1/2 items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img src={petImage} alt="" className="object-contain " />
          </div>
          <div className="flex space-y-4 flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-3xl capitalize sm:text-5xl font-bold">
              {petName}
            </h1>
            <p className="text-xl">{description}</p>
            <div className="flex text-xl flex-col sm:flex-row gap-6">
              <p className="text-green-500">
                <span className="font-semibold text-black">Age:</span> {petAge}
              </p>
              <p className="text-blue-600">
                <span className="font-semibold text-black">Location: </span>
                {petLocation}
              </p>
            </div>
            {/* Render the long description as HTML */}
            <div
              dangerouslySetInnerHTML={{ __html: longDescription }}
              className="text-lg text-gray-700"
            ></div>
            <div>
              <button
                disabled={!user}
                onClick={() => {
                  setShowModal(true);
                  setDetailPet(petDetails);
                }}
                className="btn w-full bg-[#ff946b] text-lg font-semibold rounded"
              >
                Adopt
              </button>
              {!user && (
                <p className="mt-2 text-red-500 font-medium">
                  You need to login to adopt
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <>
          <AdoptModal
            detailPet={detailPet}
            setShowModal={setShowModal}
          ></AdoptModal>
        </>
      )}
    </div>
  );
};

export default PetCardDetails;
