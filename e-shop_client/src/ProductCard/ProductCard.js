import React from 'react';
import "./ProductCard.css"

const ProductCard = (props) => {
  if(!props.productData) {
    return <div>"Error: Data not received"</div>
  }
  else {
    return (
      <div className="product-card">
        <img src={props.productData.image[0]} alt="flipkart"/>
          <p>{props.productData.product_name}</p>
          <p>{props.productData.retail_price}</p>
          {
            props.productData.retail_price !== props.productData.discounted_price ?
            <p>{props.productData.discounted_price}</p> : null
          }
          
      </div>
    );
  }
  
}

export default ProductCard
