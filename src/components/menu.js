import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
    renderLinks() {
        // Show a link to sign in or sign up
        return [
            < li className='nav-item' key='signin' >
                <Link className='nav-link' to='/Shop'>Shop</Link>
            </li >,
            <li className='nav-item' key='signout'>
                <Link className='nav-link' to='/Sale'>Sale</Link>
            </li>,
            <li className='nav-item' key='contact'>
                <Link className='nav-link' to='/Contact'>Contact</Link>
            </li>

        ];
    }

    render() {
        return (
            <nav className='navbar navbar-light'>
                <Link to='/' className='navbar-brand'>Horeca</Link>
                <ul className='nav navbar-nav'>
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
};

export default Header;
