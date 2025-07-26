import { FiUsers } from "react-icons/fi";
import { MdCampaign } from "react-icons/md";
import { RiListIndefinite } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const AdminRoutes = () => {
    return (
        <>
            <div className=" flex items-center justify-center">
                <div className="my-6 border-slate-500 border-b-2 w-[80%]" />

            </div>
            <li className="px-3">
                <NavLink
                    to='/dashboard/all-users'
                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-[#F2D4C8] hover:text-[#ff946b] focus:bg-[#F2D4C8]"
                >
                    <FiUsers className="h-6 w-6" aria-label="Dashboard icon" role="graphics-symbol" />
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                        Users
                    </div>
                </NavLink>
            </li>
            <li className="px-3">
                <NavLink
                    to='/dashboard/all-pets'
                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-[#F2D4C8] hover:text-[#ff946b] focus:bg-[#F2D4C8]"
                >
                    <RiListIndefinite className="h-6 w-6" aria-label="Dashboard icon" role="graphics-symbol" />
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                        All Pets
                    </div>
                </NavLink>
            </li>
            <li className="px-3">
                <NavLink
                    to='/dashboard/all-donations'
                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-[#F2D4C8] hover:text-[#ff946b] focus:bg-[#F2D4C8]"
                >
                    <MdCampaign className="h-6 w-6" aria-label="Dashboard icon" role="graphics-symbol" />
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                        All Donations
                    </div>
                </NavLink>
            </li>


        </>
    );
};

export default AdminRoutes;