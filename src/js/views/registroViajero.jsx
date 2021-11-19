import React from "react";
import useFormRegTraveler from "../hooks/useFormRegTraveler.jsx";
import validate from "../registerTravelervalidations.jsx";

import PropTypes from "prop-types";
import Avatar from "../../img/default_avatar.png";
import Image from "react-bootstrap/Image";

const FormRegisterTraveler = () => {
	const { values, errors, handleChange, handleSubmit } = useFormRegTraveler(signUp, validate); //Pasamos al hook useFormRegTraveler la función de validación por parámetros
	function signUp() {
		console.log("No errores, callback realizada");
	}
	const divStyle = {
		display: "none"
	};
	return (
		<div className="container fluid">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<form className="mb-5 mt-2 p-2" onSubmit={handleSubmit} noValidate>
						<label htmlFor="username">Nombre de usuario</label>
						<input
							id="username"
							name="username"
							type="text"
							placeholder="nombre de usuario"
							onChange={handleChange}
							value={values.username || ""}
						/>
						{errors.username && <p>{errors.username}</p>}
						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							type="text"
							placeholder="email"
							onChange={handleChange}
							value={values.email || ""}
						/>
						{errors.email && <p>{errors.email}</p>}
						<label htmlFor="password">Contraseña</label>
						<input
							id="password"
							name="password"
							type="password"
							placeholder="contraseña"
							onChange={handleChange}
							value={values.password || ""}
						/>
						{errors.password && <p>{errors.password}</p>}
						<label htmlFor="repeatPassword">Repite la contraseña</label>
						<input
							id="repeatPassword"
							name="repeatPassword"
							type="password"
							placeholder="repite la contraseña"
							onChange={handleChange}
							value={values.repeatPassword || ""}
						/>
						{errors.repeatPassword && <p>{errors.repeatPassword}</p>}
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
FormRegisterTraveler.propTypes = {
	history: PropTypes.object
};
export default FormRegisterTraveler;
