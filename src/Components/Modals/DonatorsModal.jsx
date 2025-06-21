/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TableSkeleton from "../Skeleton/TableSkeleton";
import { IoCloseSharp } from "react-icons/io5";
const DonatorsModal = ({ setShowModal, campaign }) => {
    const axiosSecure = useAxiosSecure()
    const { _id } = campaign;
    const { data: donorsData = [], isLoading } = useQuery({
        queryKey: ['donators-list'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/donors/${_id}`)
            return data
        },
    })
    // console.log(donorsData)
    if (isLoading) {
        return <>
            <TableSkeleton></TableSkeleton>
        </>
    }
    return (
        <div>
            <div className="bg-black left-0 lg:left-32 z-1 bg-opacity-30 fixed top-0 w-full  h-[100vh] flex items-center  justify-center">
                <div className="overflow-x-auto relative top-0 right-0 z-10 bg-white shadow-xl p-8">
                    <div className="flex justify-end">
                        <button className="text-5xl text-red-500" onClick={() => setShowModal(false)}><IoCloseSharp /></button>
                    </div>
                    <div className="">
                        <table className="table-auto border-collapse w-full">
                            {/* head */}
                            <thead>
                                <tr className="text-2xl border border-gray-300">
                                    <th className="border border-gray-300 p-2">#</th>
                                    <th className="border border-gray-300 p-2">Email</th>
                                    <th className="border border-gray-300 p-2">Donation Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donorsData.length > 0 ? donorsData.map((donorData, idx) => (
                                    <tr key={donorData._id} className="text-xl bg-base-200 border border-gray-300">
                                        <th className="border border-gray-300 p-2">{idx + 1}</th>
                                        <td className="border border-gray-300 p-2">{donorData.email}</td>
                                        <td className="border border-gray-300 p-2">{donorData.amount}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="text-center text-4xl py-4 border border-gray-300">No one donated</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default DonatorsModal;