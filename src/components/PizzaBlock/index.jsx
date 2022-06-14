import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../../redux/slices/cartSllce";

const typesPizza = ["тонке", "традиційне"];
const sizesPizza = ["26см", "30см", "40см"];

export default function PizzaBlock({
  id,
  imageUrl,
  price,
  sizes,
  title,
  types,
}) {
  const [size, setSize] = React.useState(0);
  const [type, setType] = React.useState(0);
  const dispatch = useDispatch();
  const catrItem = useSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  );

  const addedCount = catrItem ? catrItem.count : "0";

  const setItem = () => {
    const item = {
      id,
      imageUrl,
      price,
      title,
      size: sizesPizza[size],
      type: typesPizza[type],
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizzas/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((el, i) => (
              <li
                onClick={() => setType(i)}
                className={type === i ? "active" : ""}
                key={`${el}_${i}`}
              >
                {typesPizza[i]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((el, i) => (
              <li
                onClick={() => setSize(i)}
                className={size === i ? "active" : ""}
                key={`${el}_${i}`}
              >
                {el} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">від {price} грн</div>
          <button
            onClick={setItem}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Додати</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}
