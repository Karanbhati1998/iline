import React, { useEffect, useState } from "react";
import VechileTable from "./VechileTable";
import { useLocation } from "react-router-dom";
import BackButton from "../../BackButton";
import { useDispatch, useSelector } from "react-redux";
import { getVechileCategory } from "../../../features/slices/vechileManagement/vechileCategory";
import PendingVechileTable from "./PendingVechileTable";
import {
  handleCatId,
  handlePage,
  handlePendingVechileTable,
  handleVechileServicePage,
} from "../../../features/slices/vechileManagement/vechileManagement";

const Iline_P2pVechile = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  console.log({ state });
  const { VechileCategories } = useSelector((state) => {
    return state?.vechileCategory;
  });
  const { catId, pendingVechileTable } = useSelector((state) => {
    return state?.vechile;
  });
  useEffect(() => {
    dispatch(getVechileCategory({ page: 1 })).then((res) => {
      if (res?.payload?.code == 200) {
        console.log({ res });
        // setCatId({
        //   catType: state?.CatName,
        //   id: state?.ind,
        // });
      }
    });
  }, []);
  const handleClick = (id, type) => {
    dispatch(
      handleCatId({
        id: id,
        catType: type,
      })
    );
    dispatch(handlePendingVechileTable(false));
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">
            {state?.type == "ILINE" ? "I Line" : "P2P "} Vehicles
          </h4>
          <div className="TitleLink">
            <a className="TitleLink">
              <BackButton />
            </a>
          </div>
        </div>
        <div className="SettingsTabs">
          <ul className="nav nav-tabs">
            {VechileCategories?.result?.[0]?.paginationData?.map((res) => {
              return (
                <li
                  className="nav-item"
                  key={res?._id}
                  onClick={() => {
                    handleClick(res?._id, res?.categoryName);
                    dispatch(handlePage(1));
                  }}
                >
                  <a
                    className={
                      catId.catType == res?.categoryName
                        ? "nav-link  active"
                        : "nav-link "
                    }
                  >
                    {res?.categoryName}
                  </a>
                </li>
              );
            })}
            {state?.type == "P2P" && (
              <li
                className="nav-item"
                onClick={() => {
                  dispatch(handlePendingVechileTable(true));
                  dispatch(
                    handleCatId({
                      id: "",
                      catType: "pending",
                    })
                  );
                  dispatch(handleVechileServicePage(1));
                }}
              >
                <a
                  className={
                    catId.catType == "pending"
                      ? "nav-link  active"
                      : "nav-link "
                  }
                >
                  Pending for Approval
                </a>
              </li>
            )}
          </ul>
          {!pendingVechileTable ? (
            catId?.id && (
              <VechileTable vehicleType={state?.type} categoryId={catId?.id} />
            )
          ) : (
            <PendingVechileTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default Iline_P2pVechile;
