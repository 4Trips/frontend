import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logoAloj from "../../img/alojamientoicon.png";
import logoMultia from "../../img/actividadesicon.png";
import logoBbq from "../../img/barbacoaicon.png";
import logoComida from "../../img/comidaicon.png";
import logoPiscina from "../../img/piscinaicon.png";

export const TripCard = props => {
	const { store, actions } = useContext(Context);
	const logos = {
		//creo un nuevo objeto cuyas keys coinciden con los valores del array que me devuelve props.trip.needs_trip, de modo que cuando hago un mapeo en linea 48 y coincide me devuelve el valor de la key del objeto que es la imagen
		sleep: logoAloj,
		eat: logoComida,
		bbq: logoBbq,
		adventure: logoMultia,
		relax: logoPiscina
	};
	const formatDay = day => {
		let newFormatDay = new Date(day);
		return newFormatDay.getDate() + "/" + (newFormatDay.getMonth() + 1) + "/" + newFormatDay.getUTCFullYear();
	};

	return (
		<div className="col-md-4 col-sm-1">
			<div className="card">
				<div className="card-header">
					<div className="row">
						<div className="col-4">
							<h5 className="card-title">Avatar</h5>
						</div>
						<div className="col-8">
							<h5 className="card-title">Usuario</h5>
						</div>
					</div>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">Destino:</li>
					<li className="list-group-item">Desde:</li>
					<li className="list-group-item">Hasta:</li>
				</ul>
				<div className="card-body">
					<p className="card-text">Descripción del viaje:</p>
				</div>
				<div className="card-footer text-muted">Número de ofertas recibidas:</div>
				<div className="card-footer">icons</div>
			</div>
		</div>
	);
};

TripCard.propTypes = {
	history: PropTypes.object,
	trip: PropTypes.object
};
