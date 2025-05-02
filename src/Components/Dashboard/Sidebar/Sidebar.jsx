import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import useGetRole from "../../../hooks/useGetRole";
import UserRoutes from "../../../hooks/UserRoutes";

const Sidebar = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const userRole = useGetRole();
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Set the role when userRole is available
    if (userRole) {
      setRole(userRole);
    }
  }, [userRole]);

  console.log(role);
  return (
    <>
      <button
        title="Side navigation"
        type="button"
        className={`fixed right-0 top-[68px] z-50 order-10 h-10 w-10 self-center rounded bg-transparent  opacity-100 lg:hidden ${
          isSideNavOpen ? "visible opacity-100" : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? "true" : "false"}
        aria-controls="nav-menu-1"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        {isSideNavOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside
        id="nav-menu-1"
        aria-label="Side navigation"
        className={`fixed top-[68px] bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <div className="mt-4">
            <ul className="flex flex-1 flex-col gap-1 py-3">
              <UserRoutes />
            </ul>
          </div>
        </nav>
      </aside>

      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
    </>
  );
};

export default Sidebar;
