import { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import style from '../styles/layout.module.scss';

const MyLayout = ({ children, auth }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleNavbar = () => setIsOpen(!isOpen);

    return (
        <div className={style.layout}>
            <Navbar light className={style.navbar} expand="sm">
                <NavbarBrand href="/" className="mr-auto">Game News</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className={style.link} href="/about">About</NavLink>
                        </NavItem>
                        {
                            auth ?
                            <>
                                <NavItem>
                                    <NavLink className={style.link} href="/app/logout">Logout</NavLink>
                                </NavItem>
                            </> :
                            <>
                                <NavItem>
                                    <NavLink className={style.link} href="/app/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={style.link} href="/app/register">Get Started</NavLink>
                                </NavItem>
                            </>
                        }                        
                    </Nav>
                </Collapse>
            </Navbar>
            <div className={style.content}>
                {children}
            </div>
            <div className={style.footer}>Footer</div>
        </div>
    )
};

export default MyLayout;
