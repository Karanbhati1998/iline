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
  PaymentAndRevenue,
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
import { io } from "socket.io-client";
import CallRequest from "./components/ticket/CallRequest";
import BlogManagement from "./pages/blogManagement/BlogManagement";
import AddBlog from "./pages/blogManagement/AddBlog";
import EditBlog from "./components/blog/EditBlog";
import ViewBlog from "./components/blog/ViewBlog";
import CreateRole from "./components/subAdmin/CreateRole";
import EditRole from "./components/subAdmin/EditRole";
import SubAdminDetail from "./components/subAdmin/SubAdminDetail";
import Iline_P2pVechile from "./components/vechileManagement/vechileTable/Iline_P2pVechile";
import DeliverTable from "./components/vechileManagement/vechileTable/DeliverTable";
import VechileDetails from "./components/vechileManagement/vechileDetail/VechileDetails";
import PendingVechilePage from "./components/vechileManagement/vechileTable/PendingVechilePage";
import AssignVichel from "./components/driverManagement/allDriver/driverDetailManagement/profileSummary/AssignVichel";
import AssignedVichelHistory from "./components/driverManagement/allDriver/driverDetailManagement/profileSummary/AssignedVichelHistory";
import CanceledDetail from "./components/bookingManagement/canceled/CanceledDetail";
import CompletedDetail from "./components/bookingManagement/completed/CompletedDetail";
import ScheduledDetail from "./components/bookingManagement/scheduled/ScheduledDetail";
import AddNotification from "./components/notification/AddNotification";
import EditNotification from "./components/notification/EditNotification";
import NotificationDetail from "./components/notification/NotificationDetail";
function App() {
  const isAuthenticated = getToken("ilineLogin", "token");
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
                  path="driverManagement/assignVechile"
                  element={<AssignVichel />}
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
                  path="driverManagement/assignVechileHistory"
                  element={<AssignedVichelHistory />}
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
                  path="/bookingManagementTwoWheller/canceldetail"
                  element={<CanceledDetail />}
                />
                <Route
                  path="/bookingManagementTwoWheller/completedetail"
                  element={<CompletedDetail />}
                />
                <Route
                  path="/bookingManagementTwoWheller/scheduledetail"
                  element={<ScheduledDetail />}
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
                  path="/vehicleManagement/iline_p2p"
                  element={<Iline_P2pVechile />}
                />
                <Route
                  path="/vehicleManagement/vechileService"
                  element={<DeliverTable />}
                />
                <Route
                  path="/vehicleManagement/details"
                  element={<VechileDetails />}
                />
                <Route
                  path="/vehicleManagement/pendingVechilePage"
                  element={<PendingVechilePage />}
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
                <Route
                  path="/paymentAndRevenueManagemnt"
                  element={<PaymentAndRevenue />}
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
                  path="/supportTicketManagement/callRequest"
                  element={<CallRequest />}
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
                  path="/pushNotification/add"
                  element={<AddNotification />}
                />
                <Route
                  path="/pushNotification/edit"
                  element={<EditNotification />}
                />
                <Route
                  path="/pushNotification/detail"
                  element={<NotificationDetail />}
                />
                <Route
                  path="/changeManagement"
                  element={<ChangeManagement />}
                />
                <Route path="/subAdmin" element={<SubAdmin />} />
                <Route path="/subAdmin/detail" element={<SubAdminDetail />} />
                <Route path="/subAdmin/createRole" element={<CreateRole />} />
                <Route path="/subAdmin/editRole" element={<EditRole />} />
                <Route path="/blogManagement" element={<BlogManagement />} />
                <Route path="/blogManagement/addblog" element={<AddBlog />} />
                <Route path="/blogManagement/editBlog" element={<EditBlog />} />
                <Route path="/blogManagement/viewBlog" element={<ViewBlog />} />
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
