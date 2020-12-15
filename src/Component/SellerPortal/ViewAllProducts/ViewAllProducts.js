import { faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Table } from 'react-bootstrap';

const ViewAllProducts = ({products}) => {
    return (
        <>
        <Table className="text-center rounded m-2 bg-white" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Current Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((prod, idx) => 
                    <tr key={prod.key || prod._id} className="align-center">
                        <td>{idx+1}</td>
                        <td>{prod.key || prod._id}</td>
                        <td>{prod.name || prod.productName}</td>
                        <td>{prod.price || prod.productPrice}</td>
                        <td>{prod.stock || prod.productStock}</td>
                        <td className="d-flex justify-content-around" >
                            <Button variant="success"><FontAwesomeIcon icon={faEye} /></Button>
                            <Button variant="info"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                            <Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button>
                        </td>
                    </tr>)
                }
                
            </tbody>
        </Table>
        </>
    );
};

export default ViewAllProducts;