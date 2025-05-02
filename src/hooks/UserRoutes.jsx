import { MdPets } from "react-icons/md";
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
    </>
  );
};

export default UserRoutes;
