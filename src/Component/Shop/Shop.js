import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const firstTenProducts = fakeData.slice(0,10);
    const [products, setProducts] = useState(firstTenProducts);
    const [cart,setCart] = useState([]);

    useEffect( () => {
        const products = getDatabaseCart();
        const productKeys = Object.keys(products);
        const previousProducts = productKeys.map( pdKey => {
            const productOnCart = fakeData.find(pd => pd.key === pdKey);
            productOnCart.quantity = products[pdKey];
            return productOnCart;
        })
        setCart(previousProducts);
    },[])

    const addProductToCart = (product) =>{
        let productCount = 1;
        let newCart;
        const sameProduct = cart.find(pd => pd.key === product.key);
        if(sameProduct){
            productCount = sameProduct.quantity + 1;
            sameProduct.quantity = productCount;
            const otherProducts = cart.filter(pd => pd.key !== product.key);
            newCart = [...otherProducts, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart , product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, productCount);
    }
    
    return (
        <div className="d-flex" style={{borderBottom: '1px solid #000', backgroundColor: 'lightgray'}}>
            <div className="w-75 p-3 ml-5">
                {
                    products.map(oneProduct => <Product showAddToCart={true} clickHandler={addProductToCart} product={oneProduct} key={oneProduct.key}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart items={cart}>
                    <Link to="/shipment"><button className="btn btn-danger">Procced Checkout</button></Link>
                </Cart>
            </div>  
        </div>
    );
};

export default Shop;