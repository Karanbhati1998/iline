import React, { useEffect, useState } from 'react'
import BookingSummary from './bookingSummary/BookingSummary';
import ProfileSummary from "./profileSummary/ProfileSummary";
import RideDetails from '../../../UserManagementComponent/rideDetail/RideDetails';
import { useLocation } from 'react-router-dom';
import BackButton from "../../../BackButton"
import { bookingSummaryType } from '../../../../features/slices/DriverManagement/allDriver/allDriverReducer';
import { useDispatch, useSelector } from 'react-redux';
const DetailDriverManagement = () => {
  // const [showBookingSummary,setShowBookingSummary]=useState(false)
  
  const {state}=useLocation()
  const dispatch=useDispatch()
   const { showBookingSummary } = useSelector((state) => {
     return state?.driverManagementAllDrivers;
   });
  console.log({state});
  const [location, setLocation] = useState(false);
const getAddressFromLatLng = async (lat, lng) => {
  const API_KEY = "AIzaSyAy14lzjUql2GchyraO4bHHj4oAwW_GH3Y";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      return data?.results?.[0]?.formatted_address || "Address not found";
    } else {
      return "Location not found";
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Error fetching location";
  }
};


  useEffect(()=>{
    if(state.location.coordinates){
      getAddressFromLatLng(
        state?.location?.coordinates?.[1],
        state?.location?.coordinates?.[0]
      )
        .then((location) => {
          setLocation(location);
        })
        .catch((error) => {
          console.error("Error fetching location:", error);
        });
    }
  },[])
  console.log({ location });
  const handlebookingSummaryType=(type)=>{
    dispatch(bookingSummaryType(type));
  }
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="commenone">
          <div className="CommonTabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={
                    showBookingSummary ? "nav-link" : "nav-link active"
                  }
                  onClick={() => {
                    handlebookingSummaryType(false);
                  }}
                >
                  Profile Summary
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    !showBookingSummary ? "nav-link" : "nav-link active"
                  }
                  onClick={() => {
                    handlebookingSummaryType(true);
                  }}
                >
                  Booking Summary
                </a>
              </li>
            </ul>
          </div>
          <BackButton />
        </div>
        {showBookingSummary ? (
          <BookingSummary state={state} />
        ) : (
          <ProfileSummary state={{...state,newlocation:location}} />
        )}
      </div>
    </div>
  );
}

export default DetailDriverManagement