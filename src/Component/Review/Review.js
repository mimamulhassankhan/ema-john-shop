import React, { useState, useEffect } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import { Table } from 'react-bootstrap';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect( () => {
        const localCart = getDatabaseCart();
        const productKeys = Object.keys(localCart);

        fetch('https://fathomless-basin-42766.herokuapp.com/selectedProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data));
    }, []);

    const placeOrderButtonClick = () => {
        processOrder();
        setCart([]);
        setOrderPlaced(true);
    }

    const deleteProductHandler = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    let successImage; 
    if(orderPlaced){
        successImage = <img src={happyImage} alt="happyman"/>
    }
    return (
        <div className="d-flex">
            <div style={{width: '70%'}}>
                { successImage }
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>product Details</th>
                            <th>Actions</th>
                            <th>Quantity</th>
                            <th>Total Price</th>     
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(pd => <ReviewItems clickHandler={deleteProductHandler} key={pd.key} product={pd}></ReviewItems>)
                        }
                        <tr>
                            <td className="bg-danger text-right" colSpan="4"><strong>Total : </strong></td>
                            <td className="bg-danger"></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="ml-2 mt-2">
                <Cart items={cart}>
                <button onClick={placeOrderButtonClick} className="btn btn-info">Place Order</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;