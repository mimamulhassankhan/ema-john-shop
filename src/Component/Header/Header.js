import React, { useState } from 'react';
import './Header.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';
import { Button, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';

const Header = ({user}) => {
    const [show, setShow] = useState(false);
    
    const showDropdown = e => {
        setShow(!show);
    }
    
    const hideDropdown = e => {
        setShow(false);
    }
    return (
        <div className="header">
            <Image src={logo} alt="logo" fluid/>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to={`/shop`}>Shop</Nav.Link>
                        <Nav.Link as={Link} to={`/review`}>Review Cart</Nav.Link>
                        {/* <NavDropdown title="Categories" show={show} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                        <Nav.Link as={Link} to={`/sellerPortal`}>Manage Shop</Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            user.email ?
                            <>
                            <Nav.Link>{user.displayName}</Nav.Link>
                            <Nav.Link as={Button} variant="danger">Sign Out</Nav.Link>
                            </>
                            :
                            <>
                            <Nav.Link as={Link} className="btn btn-danger" to={`/myAccount`}>My Account</Nav.Link>
                            </>
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);