import React, { useContext } from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    
    const [loggedInUser] = useContext(UserContext);
    const [shippingData, setShippingData] = useState(null);
    
    const onSubmit = data => {
        setShippingData(data);
    };

    const handlePaymentSuccess = paymentId => {
        const savedCart = getDatabaseCart();
        const orderDetails = {
            ...loggedInUser, 
            shipping: shippingData,
            paymentId, 
            orderedItems: savedCart, 
            orderTime: new Date()
        };
        console.log(orderDetails);
        fetch('https://fathomless-basin-42766.herokuapp.com/addOrder', {
            method: 'POST',
            headers: { 'Content-type':'application/json'},
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                processOrder();
            }
        })
    }
    return (
        <Container>
            <Row className="mt-5 align-items-center mx-auto">
                <Col style={{display: shippingData ? 'none' : 'block'}}>
                    <form className="form-group" onSubmit={handleSubmit(onSubmit)} placeholder="Enter name">
                        <input style={{ width:'300px'}} className="form-control" name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Enter Name"/>
                        {errors.name && <span>Name is required</span>}

                        <br/>
                        <input style={{ width:'300px'}} size="md" className="form-control" name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder="Enter email"/>
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

export default Shipment;