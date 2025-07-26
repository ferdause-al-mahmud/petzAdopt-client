/* eslint-disable react/prop-types */

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TableSkeleton from "../Skeleton/TableSkeleton";

const AdoptionRequestsTable = ({ handleReject, handleAccept }) => {
    const tbodyStyle = 'h-12 px-6 text-xl capitalize transition duration-300 border-t border-l first:border-l-0 border-slate-200 '
    const theadStyle = 'h-12 px-6 text-sm sm:text-2xl font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100';
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: adoptionsData = [], isLoading, refetch } = useQuery({
        queryKey: ['adoption-requests'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/adoption-requests/${user.email}`)
            return data
        },
    })
    // console.log(adoptionsData)
    if (isLoading) {
        return <>
            <TableSkeleton></TableSkeleton>
        </>
    }
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border border-collapse rounded sm:border-separate border-slate-200" cellSpacing="0">
                <tbody>
                    <tr>
                        <th scope="col" className={theadStyle}>Name</th>
                        <th scope="col" className={theadStyle}>Email</th>
                        <th scope="col" className={theadStyle}>Phone</th>
                        <th scope="col" className={theadStyle}>Location</th>
                        <th scope="col" className={theadStyle}>Pet Image</th>
                        <th scope="col" className={theadStyle}>Actions</th>
                    </tr>
                    {
                        adoptionsData?.map((adoption, idx) => <tr key={idx}>
                            <td className={tbodyStyle}>{adoption.userName}</td>
                            <td className='h-12 px-6 text-xl transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500'>{adoption.email}</td>
                            <td className={tbodyStyle}>{adoption.number}</td>
                            <td className={tbodyStyle}>{adoption.address}</td>
                            <td className={tbodyStyle}><img src={adoption.petImage} alt="Pet" className="w-[100px]" /></td>
                            <td className={tbodyStyle}>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <button disabled={adoption?.status === 'Adopted'} onClick={() => handleAccept(adoption, refetch)} className="btn text-white bg-green-500">Accept</button>
                                    <button disabled={adoption?.status === 'Adopted'} onClick={() => handleReject(adoption, refetch)} className="btn text-white bg-red-500">Reject</button>
                                </div>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default AdoptionRequestsTable;