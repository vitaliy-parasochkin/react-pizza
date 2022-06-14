import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState({});

  React.useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          "https://6294b658a7203b3ed06f5238.mockapi.io/pizzas/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPizza();
  }, []);

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <span>{pizza.price}</span>
    </div>
  );
};

export default FullPizza;
