import { faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Form, Table } from 'react-bootstrap';

const ViewSellerOrders = () => {
    return (
        <>
            <Table className="text-center rounded m-2 bg-white p-3" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Order No</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Seller</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr className="align-center">
                    <td>1</td>
                    <td>pt.appointmentDate</td>
                    <td>pt.docId</td>
                    <td>pt.docId</td>
                    <td>pt.docId</td>
                    <td>pt.docId</td>
                    <td>
                        <Form.Control as="select" defaultValue={0}>
                            <option value="Accept">Accept</option>
                            <option value="Processing">Processing</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Control>
                    </td>
                    <td className="d-flex justify-content-around" >
                        <Button variant="success"><FontAwesomeIcon icon={faEye} /></Button>
                        <Button variant="info"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                        <Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button>
                    </td>
                    
                </tr>
            </tbody>
        </Table>
        </>
    );
};

export default ViewSellerOrders;