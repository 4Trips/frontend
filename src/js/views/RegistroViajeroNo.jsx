import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

const registerTravelerNo = props => {
	const { store, actions } = useContext(Context);
	const firstRender = useRef(true);

	const [datos, setDatos] = useState({
		username: "",
		email: "",
		password: "",
		repeatPassword: "",
		avatar: ""
	});
	const [disable, setDisable] = useState(false);
	const handleChange = e => {
		if (e.target.name == "avatar") {
			// verficamos el nombre del input con el nombre "avatar"
			const reader = new FileReader(); // creamos una instancia new FileReader que nos permite leer archivos
			reader.onload = event => {
				// esta es la parte que lee el archivo
				console.log(reader.readyState);
				if (reader.readyState === 2) {
					// el estado que esta el archivo "2 el estado final que se ha leido el archivo por completo"
					console.log("target", e.target);
					setDatos({ ...datos, avatar: reader.result }); // seteamos en el estado el resultado que hemos tenido
				}
			};
			if (e.target.files[0] != undefined) {
				//verfeicamos que existe un elemento de tipo file
				console.log("targen unbdefin", e.target.files[0]);
				reader.readAsDataURL(e.target.files[0]); // inicio eel proceso para convertit en una url y pasamos el archivo orginal e.target.files[0]
			}
		} else {
			setDatos({ ...datos, [e.target.name]: e.target.value });
		}
	};
	const formValidation = event => {
		const errors = {};
		if (!datos.username) {
			errors.username = "Obligatorio";
			console.log("dentro de form");
			setDisable(true);
		} else if (datos.username.length > 15) {
			errors.firstName = "Debe tener 15 caracteres o menos";
			setDisable(true);
		} else setDisable(false);
		if (!datos.email) {
			errors.email = "Obligatorio";
			setDisable(true);
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(datos.email)) {
			errors.email = "Dirección de correo electrónico errónea";
			setDisable(true);
		} else setDisable(false);
		if (!datos.password) {
			errors.password = "Obligatorio";
			setDisable(true);
		} else if (datos.password.length < 6) {
			errors.password = "La contraseña debe tener al menos 6 caracteres";
			setDisable(true);
		} else setDisable(false);
		if (!datos.repeatPassword) {
			errors.repeatPassword = "Obligatorio";
			setDisable(true);
		} else if (datos.password != datos.repeatPassword) {
			errors.repeatPassword = "Las contraseñas deben coincidir";
			setDisable(true);
		} else setDisable(false);
	};

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
		formValidation();
	}, [datos]);
	console.log(datos);
	console.log(disable);

	const handleSubmit = event => {
		event.preventDefault();
		const file = document.querySelector("#file");
		actions.registerTraveler(datos, file.files[0]);
	};
	const divStyle = {
		display: "none"
	};
	return (
		<div className="container fluid">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<form className="mb-5 mt-2 p-2" onSubmit={handleSubmit} onChange={handleChange}>
						<div className="row justify-content-center">
							<div className="row justify-content-center">
								<div className="col text-center">
									<div className="mb-3 mt-3">
										<label htmlFor="file" className="btn btn-outline-dark btn-sm">
											Sube una foto
										</label>
										<input
											className="btn"
											type="file"
											accept="image/*"
											name="avatar"
											id="file"
											style={divStyle}
										/>
									</div>
								</div>
							</div>
						</div>
						<label htmlFor="username">Nombre de usuario</label>
						<input id="username" name="username" type="text" placeholder="nombre de usuario" />

						<label htmlFor="email">Email</label>
						<input id="email" name="email" type="text" placeholder="email" />

						<label htmlFor="password">Contraseña</label>
						<input id="password" name="password" type="password" placeholder="contraseña" />

						<label htmlFor="repeatPassword">Repite la contraseña</label>
						<input
							id="repeatPassword"
							name="repeatPassword"
							type="password"
							placeholder="repite la contraseña"
						/>

						<button type="submit" disabled={disable}>
							Enviar
						</button>
					</form>
				</div>
			</div>
			<div className="row">
				<span>
					<p>
						<br></br>
					</p>
				</span>
			</div>
		</div>
	);
};

registerTravelerNo.propTypes = {
	history: PropTypes.object
};
export default registerTravelerNo;
