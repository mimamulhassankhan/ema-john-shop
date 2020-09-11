import React, { useState, useEffect } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import { CardGroup, Table } from 'react-bootstrap';
import ReviewItems from '../ReviewItems/ReviewItems';

const Review = () => {
    const [cart, setCart] = useState([]);

    useEffect( () => {
        const localCart = getDatabaseCart();
        const productKeys = Object.keys(localCart);

        const cartProducts = productKeys.map(key => {
            const singleProduct = fakeData.find(pd => pd.key === key);
            singleProduct.quantity = localCart[key];
            return singleProduct;
        });
        setCart(cartProducts);
    }, []);
    const price = cart.reduce((pd, price) => price + pd.price , 0);
    console.log(cart);
    return (
        <div>
            <h3>Items in the cart : {cart.length}</h3>
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
                        cart.map(pd => <ReviewItems key={pd.key} product={pd}></ReviewItems>)
                    }
                    <tr>
                        <td className="bg-danger text-right" colSpan="4"><strong>Total : </strong></td>
                        <td className="bg-danger">{price}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default Review;