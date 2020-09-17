import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt="logo"/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review Cart</Link>
                <Link to="/manage">Manage Shop</Link>
                <Button onClick={() => setLoggedInUser({})} className="mx-auto" variant="danger">Sign Out</Button>
            </nav>
        </div>
    );
};

export default Header;