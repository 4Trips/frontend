import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

const registerTravelerNo = props => {
	const { store, actions } = useContext(Context);
	const [datos, setDatos] = useState({
		username: "",
		email: "",
		password: "",
		repeatPassword: "",
		avatar: ""
	});
	const [valid, setValid] = useState(false);

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
	const handleSubmit = e => {
		if (!username) {
			setNameError("Obligatorio");
		} else if (username.length > 15) {
			setNameError("Debe tener 15 caracteres o menos");
		} else setValid(true);
		if (!email) {
			setNameError("Obligatorio");
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
			setNameError("Dirección de correo electrónico errónea");
		} else setValid(true);
	};
	console.log(valid);
	const divStyle = {
		display: "none"
	};
	return (
		<div className="container fluid">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<form className="mb-5 mt-2 p-2">
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

						<button type="submit">Enviar</button>
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
