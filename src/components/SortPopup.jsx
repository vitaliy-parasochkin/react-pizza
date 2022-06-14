import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortType } from "../redux/slices/filterSlice";

export const items = [
  {
    name: "популярністю (за спаданням)",
    sortProperty: "rating",
  },
  {
    name: "популярністю (за зростанням)",
    sortProperty: "-rating",
  },
  {
    name: "ціною (за спаданням)",
    sortProperty: "price",
  },
  {
    name: "ціною (за зростанням)",
    sortProperty: "-price",
  },
  {
    name: "алфавітом (за спаданням)",
    sortProperty: "title",
  },

  {
    name: "алфавітом (за зростанням)",
    sortProperty: "-title",
  },
];

export default function SortPopup() {
  const [isOpen, setIsOpen] = React.useState(false);
  const sortElem = React.useRef();
  const sortType = useSelector((state) => state.filter.sort);
  const dispatch = useDispatch();

  const setActiveItem = (obj) => {
    dispatch(setSortType(obj));
    setIsOpen(false);
  };

  React.useEffect(() => {
    const hideSortPopup = (e) => {
      if (!e.path.includes(sortElem.current)) {
        setIsOpen(false);
      }
    };

    document.querySelector("body").addEventListener("click", hideSortPopup);

    return () =>
      document
        .querySelector("body")
        .removeEventListener("click", hideSortPopup);
  }, []);

  return (
    <div className="sort" ref={sortElem}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортування за:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortType.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {items.map((obj, i) => (
              <li
                key={i}
                onClick={() => setActiveItem(obj)}
                className={
                  sortType.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
