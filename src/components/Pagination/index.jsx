import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagintaion.module.scss";

const Pagination = ({ currentPage, onCnangeItem }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onCnangeItem(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
