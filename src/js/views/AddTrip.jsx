import React, { useContext, useState } from "react";
import useFormAddTrip from "../hooks/useFormAddTrip.jsx";
import { Context } from "../store/appContext";

const AddTrip = () => {
	const { store, actions } = useContext(Context);
	const [trip, setTrip] = useState({
		needs_trip: [],
		destination: "",
		first_day: "",
		last_day: "",
		description: ""
	});
	return (
		<div className="container">
			<div className="row">
				<form>
					<div className="row">
						<p className="servicios">¿Qué servicio o servicios buscas?</p>
					</div>
					<div className="d-flex justify-content-center">
						<div className="form-check form-check-inline m-0">
							<img src="" title="alojamiento" />
							<input defaultValue="sleep" type="checkbox" className="form-check-input" name="sleep" />
							<label className="form-check-label" />
						</div>
						<div className="form-check form-check-inline m-0">
							<img src="" title="comer" />
							<input defaultValue="eat" type="checkbox" className="form-check-input" name="eat" />
							<label className="form-check-label" />
						</div>
						<div className="form-check form-check-inline m-0">
							<img src="" title="jardín/barbacoa" />
							<input defaultValue="bbq" type="checkbox" className="form-check-input" name="bbq" />
							<label className="form-check-label" />
						</div>
						<div className="form-check form-check-inline m-0">
							<img src="" title="multiaventura" />
							<input
								defaultValue="adventure"
								type="checkbox"
								className="form-check-input"
								name="adventure"
							/>
							<label className="form-check-label" />
						</div>
						<div className="form-check form-check-inline m-0">
							<img src="" title="piscina/jacuzzi" />
							<input defaultValue="relax" type="checkbox" className="form-check-input" name="relax" />
							<label className="form-check-label" />
						</div>
					</div>
					<div className="form-group m-3"></div>
					<div className="form-group m-3">
						<label>Destino/s</label>
						<input
							defaultValue={trip.destination}
							type="text"
							className="form-control"
							placeholder="Destino/s"
							name="destination"
						/>
					</div>
					<div className="form-group m-3">
						<label>Fecha de entrada</label>
						<input
							defaultValue={trip.first_day}
							type="date"
							className="form-control"
							placeholder="Fecha de entrada"
							name="first_day"
						/>
					</div>
					<div className="form-group m-3">
						<label>Fecha de salida</label>
						<input
							defaultValue={trip.last_day}
							type="date"
							className="form-control"
							placeholder="Fecha de salida"
							name="last_day"
						/>
					</div>
					<div className="form-group m-3">
						<label>Descripción</label>
						<textarea
							defaultValue={trip.description}
							type="text"
							className="form-control"
							placeholder="Describe tu viaje. ¿Qué quieres hacer, cuántas personas...?"
							name="description"
						/>
					</div>
					<div className="row">
						<div className="obligatorios">Todos los campos son obligatorios</div>
					</div>
					<button type="submit" className="btn btn-primary center publicar">
						publicar viaje
						<span> </span>
						<div className="oculto" id="loading" />
					</button>
				</form>
			</div>
		</div>
	);
};
export default AddTrip;
