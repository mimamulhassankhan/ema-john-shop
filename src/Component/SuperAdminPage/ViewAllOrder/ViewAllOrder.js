import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge, Button, Table } from 'react-bootstrap';

const ViewAllOrder = () => {
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
                        <Badge pill variant="primary">
                            Primary
                        </Badge>
                    </td>
                    <td className="d-flex justify-content-around" >
                        <Button variant="success"><FontAwesomeIcon icon={faEye} /></Button>
                    </td>
                    
                </tr>
            </tbody>
        </Table> 
        </>
    );
};

export default ViewAllOrder;