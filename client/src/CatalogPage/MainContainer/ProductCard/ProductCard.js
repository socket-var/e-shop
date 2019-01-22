import React from "react";
import "./ProductCard.css";

const ProductCard = props => {
  if (!props.productData) {
    return <div>"Error: Data not received"</div>;
  } else {
    return (
      <div className="product-card">
        {props.productData.image ? (
          <img src={props.productData.image[0]} alt="flipkart"/>
        ) : (
          ""
        )}
        

        <div>{props.productData.product_name}</div>
        <div>{props.productData.retail_price}</div>
        {props.productData.retail_price !==
        props.productData.discounted_price ? (
          <div>{props.productData.discounted_price}</div>
        ) : null}
      </div>
    );
  }
};

export default ProductCard;
