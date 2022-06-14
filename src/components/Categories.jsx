import React from "react";

const categories = [
  "Всі",
  "Мясні",
  "Вегетаріанські",
  "Гриль",
  "Гострі",
  "Закриті",
];

export default function Categories({ onChangeCategory, value }) {
  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li
            onClick={() => onChangeCategory(index)}
            className={index === value ? "active" : ""}
            key={`${el}_${index}`}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
