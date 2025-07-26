import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import DonationCampaign from "../Pages/DonationCampaign/DonationCampaign";
import DonationDetails from "../Components/donationDetails/DonationDetails";
import PetListing from "../Pages/PetListing/PetListing";
import Dashboard from "../Layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AddPet from "../Pages/Dashboard/User/AddPet";
import PetCardDetails from "../Components/PetCardDetails/PetCardDetails";
import CreateCampaign from "../Pages/Dashboard/User/CreateCampaign";
import MyAddedPets from "../Pages/Dashboard/User/MyAddedPets";
import MyDonationCampaigns from "../Pages/Dashboard/User/MyDonationCampaigns";
import UpdateCampaign from "../Components/Dashboard/User/UpdateCampaign";
import Updatepet from "../Components/Dashboard/User/Updatepet";
import AdoptionRequests from "../Pages/Dashboard/User/AdoptionRequests";
import MyDonations from "../Pages/Dashboard/User/MyDonations";
import AdminRoute from "./AdminRoute";
import AllCampaigns from "../Pages/Dashboard/Admin/AllCampaigns";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AllPets from "../Pages/Dashboard/Admin/AllPets";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/pet-listing",
        element: <PetListing></PetListing>,
      },
      {
        path: "/pet-details/:id",
        element: <PetCardDetails></PetCardDetails>,
      },
      {
        path: "/donation-campaign",
        element: <DonationCampaign></DonationCampaign>,
      },
      {
        path: "/donation-campaign/:id",
        element: <DonationDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <AddPet />,
      },
      {
        path: "add-pet",
        element: <AddPet />,
      },
      {
        path: "added-pets",
        element: <MyAddedPets />,
      },
      {
        path: "update-pet/:id",
        element: <Updatepet />,
      },
      {
        path: "create-campaign",
        element: <CreateCampaign />,
      },
      {
        path: "donation-campaigns",
        element: <MyDonationCampaigns />,
      },
      {
        path: "update-campaign/:id",
        element: <UpdateCampaign />,
      },
      {
        path: "my-donations",
        element: <MyDonations />,
      },
      {
        path: "adoption-requests",
        element: <AdoptionRequests />,
      },

      // admin routes
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: 'all-pets',
        element: (
          <AdminRoute>
            <AllPets />
          </AdminRoute>
          ),
      },
      {
        path: "all-donations",
        element: (
          <AdminRoute>
            <AllCampaigns />
          </AdminRoute>
        ),
      },
    ],
  },
]);
