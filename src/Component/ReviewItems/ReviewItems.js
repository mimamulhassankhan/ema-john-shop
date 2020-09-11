import React from 'react';
import { Button, Image } from 'react-bootstrap';

const ReviewItems = (props) => {
    const {key, quantity, name, img, category, price, seller, shipping} = props.product;
    return (
        <>          
            <tr>
                <td>{key}</td>
                <td className="d-flex">
                    <div>
                        <Image height={100} src={img} alt="pdr" rounded />
                    </div>
                    <div className="ml-2">
                        <h5>{name}</h5>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p>Category : {category}</p>
                                <p className="text-warning">Price : {price}</p>
                            </div>
                            <div>
                                <p className="text-info">Seller : {seller}</p>
                                <p><small>Shipping : {shipping}</small></p>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="d-flex align-items-center">
                        <Button variant="danger">Delete</Button>
                    </div>
                </td>
                <td className="align-items-center">{quantity}</td>
                <td>{price * quantity}</td>
            </tr>
        </>
    );
};

export default ReviewItems;
