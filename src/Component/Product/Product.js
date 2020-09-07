import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    const {img, name, seller, price, stock} = props.product;
    return (
        <div className="singleProduct">
            <div className="imagePart">
                <img src={img} alt="product-img"/>
            </div>
            <div className="descriptionPart">
                <h3 className="productName">{name}</h3>
                <br/>
                <p><small>by : {seller}</small></p>
                <p>${price}</p>
                <p>only {stock} lrft in the stock. Order soon</p>
                <button onClick={() => props.clickHandler(props.product)} className="addToCartButton"> <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> add to cart</button>
            </div>
        </div>
    );
};

export default Product;