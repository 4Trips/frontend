import React, { useEffect, Fragment, useContext, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import logotipo from "../../img/LOGOblanco_4_trps_navbar.png";

const Menu = props => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">
					<img src={logotipo} className="logo" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#pricing">¿Qué es 4Trips?</Nav.Link>
						<Nav.Link href="#pricing">¿Cómo publicar un viaje?</Nav.Link>
					</Nav>
					<Nav className="me-auto">
						<Form className="d-flex">
							<FormControl
								type="search"
								placeholder="Buscar viajes"
								className="mr-2"
								aria-label="Search"
							/>
							<Button variant="outline-light">Buscar</Button>
						</Form>
					</Nav>
					<Nav>
						<NavDropdown title="Registro" id="collasible-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Viajero</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Profesional</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link eventKey={2} href="#memes">
							Iniciar sesión
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default Menu;

Navbar.propTypes = {
	history: PropTypes.object
};
