import React from "react";
import { Link } from "react-router-dom";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { TripCard } from "../component/tripCard.jsx";

export const Home = () => (
	<div className="container-fluid">
		<div className="col">
			<h3>Últimos viajes publicados:</h3>
		</div>
		<div className="col-md-3 offset-md-9">
			<Link className="btn btn-dark" to="/publicarViaje">
				Publicar viaje
			</Link>
		</div>
		<TripCard />
	</div>
);
