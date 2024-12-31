import React from "react";
import Pagination from "react-js-pagination";

const CommonPagination = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  onChange,
  itemClass,
  linkClass,
}) => {
  return (
    <Pagination
      activePage={activePage}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={pageRangeDisplayed}
      onChange={onChange}
      itemClass={itemClass}
    />
  );
};

export default CommonPagination;
