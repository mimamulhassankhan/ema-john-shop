import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const firstTenProducts = fakeData.slice(0,10);
    const [products, setProducts] = useState(firstTenProducts);
    const [cart,setCart] = useState([]);

    const addProductToCart = (product) =>{
        console.log('Clicked', product);
        const newCart = [...cart, product];
        setCart(newCart);
    }
    
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(oneProduct => <Product clickHandler={addProductToCart} product={oneProduct} key={oneProduct.key}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart items={cart}></Cart>
            </div>  
        </div>
    );
};

export default Shop;