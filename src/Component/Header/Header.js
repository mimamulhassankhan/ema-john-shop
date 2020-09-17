import React from 'react';
import './Header.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="logo"/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review Cart</Link>
                <Link to="/manage">Manage Shop</Link>
            </nav>
        </div>
    );
};

export default Header;