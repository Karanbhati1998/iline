import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authReducer";
import userManagementReducer from "./slices/userManagementReducer";
import allDriverReducer from "./slices/DriverManagement/allDriver/allDriverReducer";
import pendngForApproval from "./slices/DriverManagement/pendingForApproval/pendingForApproval";
import imageUploadReducer from "./slices/imageUpload";
import supportTicketSlice from "./slices/supportTicketManagement";
import contentManagement from "./slices/staticContentManagement";
import vechileCategory from "./slices/vechileManagement/vechileCategory";
import bannerSlice from "./slices/bannerSlice";
import blogSlice from "./slices/blogSlice";
import subAdminSlice from "./slices/subAdmin";
import  dashboardSlice from "./slices/Dashboard";
import bookingManagementSlice from "./slices/bookingManagementSlice";
import vechileSlice from "./slices/vechileManagement/vechileManagement";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userManagement: userManagementReducer,
    driverManagementAllDrivers: allDriverReducer,
    driverManagementPendingForApproval: pendngForApproval,
    imageUpload: imageUploadReducer,
    supportTicket: supportTicketSlice,
    contentManagement: contentManagement,
    vechileCategory: vechileCategory,
    banner: bannerSlice,
    blog: blogSlice,
    subAdmin: subAdminSlice,
    dashboard: dashboardSlice,
    vechile: vechileSlice,
    bookingManagement: bookingManagementSlice,
  },
});
export default store;
