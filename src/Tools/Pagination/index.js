import React, { useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { useFilter } from "../../APIs/useMyAPI";
import Loading from "../Loading";

const Pagination = ({ pageCount, children, loading }) => {
  const { handlePageClick, searchParams } = useFilter();
  const a = useRef();
  useEffect(() => {
    if (a.current) {
      a.current.state.selected = searchParams.get("page")
        ? searchParams.get("page") - 1
        : 0;
    }
  }, [searchParams.get("page")]);
  return (
    <>
      {loading ? <Loading /> : ""}
      <div>{children}</div>
      <div className="text-center text-3xl my-3 ">
        {pageCount ? "" : "There are no data"}
      </div>

      <div className="flex justify-center my-3">
        <ReactPaginate
          className="pagination flex"
          previousLabel=""
          nextLabel=""
          breakLabel="..."
          ref={a}
          pageCount={pageCount || 0}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          pageClassName="page-item"
          pageLinkClassName="page-link"
        />
      </div>
    </>
  );
};

export default Pagination;
