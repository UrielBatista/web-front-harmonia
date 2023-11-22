import React, {useState, memo } from "react";

import Logo from '../../assests/png/IBM-Oficial.png';
import { Link } from "react-scroll";

import './header.css';



import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
  } from 'reactstrap';


  const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div className="header">
        <Navbar  light expand="md" className="navbar-main">
          {/* <NavbarBrand > */}
          <Link to="/">
                <img  className="logo" src={Logo} alt="logo fastdating"/>
            </Link>
        {/* </NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="nav-dir">
        <Nav className="mr-auto" navbar></Nav>
          <NavItem >
            <Link className="link-item"
              to="steps"
              smooth={true}
              offset={0}
              duration={100}>Como Trabalhamos
            </Link>
          </NavItem>

          <NavItem >
            <Link className="link-item"
              to="faq"
              smooth={true}
              offset={20}
              duration={100}
              >Evento 
            </Link>
          </NavItem>

          <NavItem className="selected">
            <Link className="link-item"
              to="steps-form"
              smooth={true}
              offset={50}
              duration={100}>
              Cadastre-se
            </Link>
          </NavItem>
        </Collapse>
      </Navbar>
      </div>
    );
  }
  export default memo(Header);