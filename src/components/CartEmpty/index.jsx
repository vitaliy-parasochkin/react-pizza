import React from "react";
import { Link } from "react-router-dom";
import CartEmptyUrl from "../../assets/images/empty-cart.png";
function CartEmpty() {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Кошик порожній <span>😕</span>
          </h2>
          <p>
            Більшість всього, ви ще не замовляли піц.
            <br />
            Для того, щоб замовити піцу, перейдіть на головну сторінку.
          </p>
          <img src={CartEmptyUrl} alt="Empty cart" />
          <Link className="button button--black" to="/">
            <span>Повернутись назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartEmpty;
