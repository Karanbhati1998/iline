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
  },
});
export default store;
