import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { TripCard } from "../component/tripCard.jsx";

export const Home = () => (
	<div className="mt-3">
		<h1>Últimos viajes</h1>
		<TripCard />
	</div>
);
