/* eslint-disable react/prop-types */

import TableSkeleton from "../Skeleton/TableSkeleton";

const AllUsersForm = ({ usersData, handleMakeAdmin, isLoading }) => {
    const tbodyStyle = 'h-12 px-6 text-xl capitalize transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500'
    const theadStyle = 'h-12 px-6 text-sm sm:text-2xl font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100';

    if (isLoading) {
        return <>
            <TableSkeleton />
        </>
    }
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border border-collapse rounded sm:border-separate border-slate-200" cellSpacing="0">
                <tbody>
                    <tr>
                        <th scope="col" className={theadStyle}>Name</th>
                        <th scope="col" className={theadStyle}>Email</th>
                        <th scope="col" className={theadStyle}>Profile picture</th>
                        <th scope="col" className={theadStyle}>Actions</th>
                    </tr>
                    {
                        usersData?.map((user, idx) => <tr key={idx}>
                            <td className={tbodyStyle}>{user.name}</td>
                            <td className='h-12 px-6 text-xl transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500'>{user.email}</td>
                            <td className={tbodyStyle}><img src={user.profilePicture} alt="Pet" className="w-[100px]" /></td>
                            <td className={tbodyStyle}>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <button disabled={user?.role === 'admin'} onClick={() => handleMakeAdmin(user)} className="btn text-white bg-green-500">Make Admin</button>

                                </div>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default AllUsersForm;