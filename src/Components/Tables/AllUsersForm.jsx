/* eslint-disable react/prop-types */

import TableSkeleton from "../Skeleton/TableSkeleton";

const AllUsersForm = ({ usersData, handleRoleChange, isLoading }) => {
  const tbodyStyle =
    "h-12 px-6 text-xl capitalize transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500";
  const theadStyle =
    "h-12 px-6 text-sm sm:text-2xl font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100";

  if (isLoading) {
    return (
      <>
        <TableSkeleton />
      </>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table
        className="w-full text-left border border-collapse rounded sm:border-separate border-slate-200"
        cellSpacing="0"
      >
        <tbody>
          <tr>
            <th scope="col" className={theadStyle}>
              Name
            </th>
            <th scope="col" className={theadStyle}>
              Email
            </th>
            <th scope="col" className={theadStyle}>
              Profile picture
            </th>
            <th scope="col" className={theadStyle}>
              Role
            </th>
            <th scope="col" className={theadStyle}>
              Actions
            </th>
          </tr>
          {usersData?.map((user, idx) => (
            <tr key={idx}>
              <td className={tbodyStyle}>{user.name}</td>
              <td className="h-12 px-6 text-xl transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                {user.email}
              </td>
              <td className={tbodyStyle}>
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-[100px]"
                />
              </td>
              <td className={tbodyStyle}>
                <span
                  className={`px-2 py-1 rounded text-sm font-semibold ${
                    user.role === "admin"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {user.role || "user"}
                </span>
              </td>
              <td className={tbodyStyle}>
                <div className="flex flex-col md:flex-row gap-3">
                  <button
                    onClick={() => handleRoleChange(user)}
                    className={`btn text-white ${
                      user?.role === "admin"
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {user?.role === "admin" ? "Remove Admin" : "Make Admin"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsersForm;
