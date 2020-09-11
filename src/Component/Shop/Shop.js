import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const firstTenProducts = fakeData.slice(0,10);
    const [products, setProducts] = useState(firstTenProducts);
    const [cart,setCart] = useState([]);

    const addProductToCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
        const productCount = newCart.filter(pd => pd.key === product.key).length;
        addToDatabaseCart(product.key, productCount);
    }
    
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(oneProduct => <Product showAddToCart={true} clickHandler={addProductToCart} product={oneProduct} key={oneProduct.key}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart items={cart}></Cart>
            </div>  
        </div>
    );
};

export default Shop;