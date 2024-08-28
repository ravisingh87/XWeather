import React from "react";
import "./Card.css";
const Card = ({ title, data, type }) => {
  return (
    <div className='weather-card'>
      <p>
        <b>{title}</b>
      </p>
      <p>
        {data}
        &nbsp;
        {type}
      </p>
    </div>
  );
};

export default Card;
