import React, { useEffect, Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import logotipo from "../../img/LOGOblanco_4_trps_navbar.png";

const Navbar = props => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">
					<img src={logotipo} className="navbar-brand" />
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link" href="#">
								Registro
							</a>
						</li>
					</ul>
				</div>
				<div className="container-fluid">
					<form className="d-flex">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Buscar viajes"
							aria-label="Search"
						/>
						<button className="btn btn-outline-light" type="submit">
							Buscar
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;

Navbar.propTypes = {
	history: PropTypes.object
};
