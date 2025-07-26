import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { user, loading } = useAuth();
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { logOut } = useAuth();
  console.log(user?.photoURL);
  const toggleHamburger = () => {
    setHamburgerOpen(!isHamburgerOpen);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
    setHamburgerOpen(false);
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/pet-listing">Pet Listing</NavLink>
      </li>
      <li>
        <NavLink to="/donation-campaign">Donation campaigns</NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogOut = async () => {
    try {
      await logOut();
      console.log("succesfully logout");
    } catch (error) {
      console.log("didnt logout");
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-rose-100 !text-rose-900 shadow-md">
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={toggleHamburger}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isHamburgerOpen && (
              <ul
                tabIndex={0}
                className="menu  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {links}
              </ul>
            )}
          </div>
          <a className="btn btn-ghost md:text-3xl font-bold">PetzAdopt</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu text-[16px] font-semibold  menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {user && !loading && (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                  onClick={toggleProfile}
                >
                  <div className="">
                    <FaUser className="text-2xl" />
                  </div>
                </div>
                {isProfileOpen && (
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li onClick={handleLogOut}>
                      <a>Logout</a>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
