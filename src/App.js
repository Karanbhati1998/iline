import { useEffect } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./layout/RootLayout";
import {
  AddNewDriver,
  AllDriverDetail,
  BannerManagement,
  ContentManagement,
  CreatePassword,
  Dashboard,
  DriverManagement,
  ForgotPassword,
  Login,
  LoginSuccess,
  Otp,
  PendingForApproval,
  UserManagement,
  UserManagementDetail,
  TwoWheller,
  VehicleManagement,
  PushNotification,
  ChangeManagement,
  SupportTicketManagement,
  OnlineBookingView,
  ChargingStation,
  SubAdmin,
} from "./pages/index";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomToastContainer from "./components/CustomToastContainer";
import BookingDetail from "./components/UserManagementComponent/rideDetail/BookingDetail";
import Detail_ride from "./components/UserManagementComponent/rideDetail/Detail_ride";
import DetailDriverManagement from "./components/driverManagement/allDriver/driverDetailManagement/DetailDriverManagement";
import VechileStatus from "./components/driverManagement/pendingForApproval/VechileStatus";
import BookingManagementDetail from "./components/bookingManagement/BookingManagementDetail";
import BookingManagementTrack from "./components/bookingManagement/BookingManagementTrack";
import { isInternetAvailable } from "./utils/isInternetAvailable";
import { getToken } from "./utils/getToken";
import EditContentManagement from "./components/EditContentManagement";
import AddFaq from "./components/FAQ/AddFaq";
import EditFaq from "./components/FAQ/EditFaq";
import VechileCategory from "./components/vechileManagement/vechileCategory/VechileCategory";
import AddVechileCategory from "./components/vechileManagement/vechileCategory/AddVechileCategory";
import EditVechileCategory from "./components/vechileManagement/vechileCategory/EditVechileCategory";
import VechileCategoryDetail from "./components/vechileManagement/vechileCategory/VechileCategoryDetail";
import AddVechile from "./components/vechileManagement/AddVechile";
import AddFeatureList from "./components/vechileManagement/vechileCategory/AddFeatureList";
import AddOffer from "./components/vechileManagement/vechileCategory/AddOffer";
import Reply from "./components/ticket/Reply";
function App() {
  const isAuthenticated = getToken("adminLogin", "token");
  useEffect(() => {
    isInternetAvailable();
  }, []);
  return (
    <>
      <HashRouter>
        <Routes>
          <Route>
            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
              }
            ></Route>
            <Route path="login" element={<Login />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="otp" element={<Otp />} />
            <Route path="createPassword" element={<CreatePassword />} />
            <Route path="loginSucess" element={<LoginSuccess />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<RootLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="userManagement" element={<UserManagement />} />
                <Route
                  path="userManagement/userManagementDetail"
                  element={<UserManagementDetail />}
                />
                <Route
                  path="userManagement/userBookingDetail"
                  element={<BookingDetail />}
                />
                <Route
                  path="userManagement/detail_ride"
                  element={<Detail_ride />}
                />
                <Route path="driverManagement" element={<DriverManagement />} />
                <Route
                  path="driverManagement/all_driver"
                  element={<AllDriverDetail />}
                />
                <Route
                  path="driverManagement/detailDriverManagement"
                  element={<DetailDriverManagement />}
                />
                <Route
                  path="driverManagement/addNewDriver"
                  element={<AddNewDriver />}
                />
                <Route
                  path="driverManagement/pendingForApproval"
                  element={<PendingForApproval />}
                />
                <Route
                  path="/driverManagement/pendingForApprovalDetail"
                  element={<VechileStatus />}
                />
                <Route
                  path="/contentManagement"
                  element={<ContentManagement />}
                />
                <Route
                  path="/editContentManagemnt"
                  element={<EditContentManagement />}
                />
                <Route path="/addFaq" element={<AddFaq />} />
                <Route path="/editFaq" element={<EditFaq />} />
                <Route
                  path="/bannerManagement"
                  element={<BannerManagement />}
                />
                <Route
                  path="/bookingManagementTwoWheller"
                  element={<TwoWheller />}
                />
                <Route
                  path="/bookingManagementTwoWheller/detail"
                  element={<BookingManagementDetail />}
                />
                <Route
                  path="/bookingManagementTwoWheller/track"
                  element={<BookingManagementTrack />}
                />
                <Route
                  path="/vehicleManagement"
                  element={<VehicleManagement />}
                />
                <Route
                  path="/vehicleManagement/addVechile"
                  element={<AddVechile />}
                />
                <Route
                  path="/vehicleManagement/vehicleCategory"
                  element={<VechileCategory />}
                />
                <Route
                  path="/vehicleManagement/addVehicleCategory"
                  element={<AddVechileCategory />}
                />
                <Route
                  path="/vehicleManagement/addFeatureList"
                  element={<AddFeatureList />}
                />
                <Route
                  path="/vehicleManagement/addOffer"
                  element={<AddOffer />}
                />
                <Route
                  path="/vehicleManagement/editVehicleCategory"
                  element={<EditVechileCategory />}
                />
                <Route
                  path="/vehicleManagement/vehicleCategoryDetail"
                  element={<VechileCategoryDetail />}
                />
                <Route path="/chargingStation" element={<ChargingStation />} />
                <Route
                  path="/onlineBookingView"
                  element={<OnlineBookingView />}
                />
                <Route
                  path="/supportTicketManagement"
                  element={<SupportTicketManagement />}
                />
                <Route
                  path="/supportTicketManagement/reply"
                  element={<Reply />}
                />
                <Route
                  path="/pushNotification"
                  element={<PushNotification />}
                />
                <Route
                  path="/changeManagement"
                  element={<ChangeManagement />}
                />
                <Route path="/subAdmin" element={<SubAdmin />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </HashRouter>
      <CustomToastContainer />
    </>
  );
}

export default App;
