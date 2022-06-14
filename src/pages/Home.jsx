import React from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import SortPopup from "../components/SortPopup";
import {
  selectCategoryId,
  selectCurrentPage,
  selectSearchValue,
  selectSortType,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { Link, useNavigate } from "react-router-dom";
import { items } from "../components/SortPopup";
import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice";
import NotFound from "./NotFound";

function Home() {
  const navigate = useNavigate();
  const { pizzas, status } = useSelector(selectPizzas);
  const searchValue = useSelector(selectSearchValue);

  const categoryId = useSelector(selectCategoryId);
  const sortId = useSelector(selectSortType);
  const currentPage = useSelector(selectCurrentPage);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const dispatch = useDispatch();

  const addPizzas = () => {
    const order = sortId.includes("-") ? "asc" : "desc";
    const sortBy = sortId.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        currentPage,
        searchValue,
      })
    );
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      addPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortId, searchValue, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = items.find((obj) => obj.sortProperty === params.sortId);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }

    isSearch.current = true;
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortId,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortId, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => dispatch(setCategoryId(i))}
        />
        <SortPopup />
      </div>
      <h2 className="content__title">Всі піци</h2>
      {status === "error" ? (
        <NotFound />
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(10)].map((_, i) => <Skeleton key={i} />)
            : pizzas.map((item, i) => <PizzaBlock key={i} {...item} />)}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onCnangeItem={(i) => dispatch(setCurrentPage(i))}
      />
    </>
  );
}

export default Home;
