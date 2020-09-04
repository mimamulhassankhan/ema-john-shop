import React from 'react';
import './Header.css'
import logo from '../../images/logo.png'

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="logo"/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Review Cart</a>
                <a href="/manage">Manage Shop</a>
            </nav>
        </div>
    );
};

export default Header;