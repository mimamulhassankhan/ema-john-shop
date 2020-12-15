import React, { useState, useEffect } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import { Button, Table } from 'react-bootstrap';
import ReviewItems from '../ReviewItems/ReviewItems';
import { Link, Redirect } from 'react-router-dom';
import happyImage from '../../images/giphy.gif';
import { connect } from 'react-redux';

const Review = ({cartForReview}) => {
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
            {
                cartForReview.length === 0 ?
                <Redirect to={`/`} />
                :

                <div>
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
                            cartForReview && cartForReview.map(pd => <ReviewItems clickHandler={deleteProductHandler} key={pd._id} product={pd}></ReviewItems>)
                        }
                        <tr>
                            <td className="bg-danger text-right" colSpan="4"><strong>Total : </strong></td>
                            <td className="bg-danger"></td>
                        </tr>
                    </tbody>
                    </Table>
                    {
                        cartForReview.length > 0 ? 
                        <Link to={`/shipment`} className="btn btn-info float-right">Checkout</Link>
                        :
                        <Button variant="danger" className="float-right" disabled>Please Add Some Product For Review</Button>
                    }
                </div>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return{
        cartForReview : state.cart
    }
}

export default connect(mapStateToProps)(Review);