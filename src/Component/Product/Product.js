import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img, name, seller, price, stock, key} = props.product;
    return (
        <div className="singleProduct">
            <div className="imagePart">
                <img className="rounded float-left" src={img} alt="product-img"/>
            </div>
            <div className="descriptionPart">
                <h3 className="productName"><Link to={"/product/"+key}>{name}</Link></h3>
                <br/>
                <p><small>by : {seller}</small></p>
                <p>${price}</p>
                <p>only {stock} lrft in the stock. Order soon</p>
                {props.showAddToCart && <button onClick={() => props.clickHandler(props.product)} className="btn btn-success"> <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;