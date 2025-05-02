import { FiList, FiGitPullRequest } from "react-icons/fi";
import { MdCampaign, MdCreateNewFolder, MdPets } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
const UserRoutes = () => {
  return (
    <>
      <li className="px-3">
        <NavLink
          to="/dashboard/add-pet"
          className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-[#F2D4C8] hover:text-[#ff946b] focus:bg-[#F2D4C8]"
        >
          <MdPets
            className="h-6 w-6"
            aria-label="Dashboard icon"
            role="graphics-symbol"
          />
          <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
            Add pet
          </div>
        </NavLink>
      </li>
      <li className="px-3">
        <NavLink
          to="/dashboard/added-pets"
          className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-[#F2D4C8] hover:text-[#ff946b] focus:bg-[#F2D4C8]"
          aria-current="page"
        >
          <FiList className="h-6 w-6" />
          <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
            My added pets
          </div>
        </NavLink>
      </li>
      <li className="px-3">
        <NavLink
          to="/dashboard/adoption-requests"
          className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-[#F2D4C8] hover:text-[#ff946b] focus:bg-[#F2D4C8]"
        >
          <FiGitPullRequest className="h-6 w-6" />
          <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
            Adoption request
          </div>
        </NavLink>
      </li>
      <li className="px-3">
        <NavLink
          to="/dashboard/create-campaign"
          className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-[#F2D4C8] hover:text-[#ff946b] focus:bg-[#F2D4C8]"
        >
          <MdCreateNewFolder className="h-6 w-6" />
          <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
            Create Donation Campaign
          </div>
        </NavLink>
      </li>
      <li className="px-3">
        <NavLink
          to="/dashboard/donation-campaigns"
          className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-[#F2D4C8] hover:text-[#ff946b] focus:bg-[#F2D4C8]"
        >
          <MdCampaign className="h-6 w-6" />
          <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
            My Donation Campaigns
          </div>
        </NavLink>
      </li>
      <li className="px-3">
        <NavLink
          to="/dashboard/my-donations"
          className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-[#F2D4C8] hover:text-[#ff946b] focus:bg-[#F2D4C8]"
        >
          <RiFileList2Line className="h-6 w-6" />
          <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
            My Donations
          </div>
        </NavLink>
      </li>
    </>
  );
};

export default UserRoutes;
