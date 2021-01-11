import React from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToCart, fetchAllOrders } from '../../Redux/Actions/StoreActions';
import { processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = ({user,cart, addToCart, orders, fetchAllOrders}) => {
    const { register, handleSubmit, errors } = useForm();
    const [shippingData, setShippingData] = useState(null);
    const history = useHistory();
    
    const onSubmit = data => {
        setShippingData(data);
    };

    const handlePaymentSuccess = paymentId => {
        const orderDetails = { 
            ordererName: user.displayName || 'Unknown',
            ordererEmail: user.email || 'Unknown',
            shipping: shippingData,
            paymentId,
            orderedItems: cart,
            status: 'pending',
            orderTime: new Date()
        };
        fetch('https://fathomless-basin-42766.herokuapp.com/addOrder', {
            method: 'POST',
            headers: { 'Content-type':'application/json'},
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                addToCart([]);
                fetchAllOrders([data, ...orders])
                history.push('/myAccount');
                processOrder();
            }
        })
    }
    return (
        <Container>
            <Row className="mt-5 align-items-center mx-auto">
                <Col style={{display: shippingData ? 'none' : 'block'}}>
                    <form className="form-group" onSubmit={handleSubmit(onSubmit)} placeholder="Enter name">
                        <input style={{ width:'300px'}} className="form-control" name="name" defaultValue={user.displayName || ''} ref={register({ required: true })} placeholder="Enter Name" readOnly/>
                        {errors.name && <span>Name is required</span>}

                        <br/>
                        <input style={{ width:'300px'}} size="md" className="form-control" name="email" defaultValue={user.email || ''} ref={register({ required: true })}  placeholder="Enter email" readOnly/>
                        {errors.email && <span>Email is required</span>}

                        <br/>
                        <input style={{ width:'300px'}} size="md" className="form-control" name="address" ref={register({ required: true })} placeholder="Enter address"/>
                        {errors.address && <span>Address is required</span>}
                        
                        <br/>
                        <input style={{ width:'300px'}} size="md" className="form-control" name="phone" ref={register({ required: true })} placeholder="Enter phone"/>
                        {errors.phone && <span>Phone is required</span>}
                        
                        <br/>
                        <input style={{ width:'300px'}} size="md" type="submit" />
                    </form>
                </Col>
                <Col className="text-center" style={{display: shippingData ? 'block' : 'none'}}>
                    <ProcessPayment handlePayment={handlePaymentSuccess}/>
                </Col>
            </Row>
        </Container>
       );
}

const mapStateToProps = state => {
    return{
        user: state.user,
        cart: state.cart,
        orders: state.orders
    }
}

const mapDispatchToProps = {
    addToCart : addToCart,
    fetchAllOrders : fetchAllOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipment);