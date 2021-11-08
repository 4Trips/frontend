import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import Avatar from "../../img/default_avatar.png";
import Image from "react-bootstrap/Image";

///Componentes
const registerTraveler = props => {
	// uso useRef para probar que es el primer render
	const firstRender = useRef(true);
	// variable de estado para activar/desactivar button submit. Parte de desactivado en el primer render
	const [disable, setDisabled] = useState(true);
	// variable de estado para mostrar errores al usuario
	const [errors, setErrors] = useState([]);
	//variable para mostrar errores del back
	const [exist, setExist] = useState({
		status: false,
		msg: ""
	});
	//accedo al store
	const { store, actions } = useContext(Context);
	// seteo valores iniciales
	const [datos, setDatos] = useState({
		username: "",
		email: "",
		password: "",
		repeatPassword: "",
		avatar: ""
	});
	// corremos las validaciones cuando cambia la variable datos
	useEffect(() => {
		// para saltar la validación en el primer render
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
		// aquí activamos/desactivamos el button llamando a la funcion de validacion que devuelve true/false
		setDisabled(formValidation());
	}, [datos.username, datos.email, datos.password, datos.repeatPassword]);
	const formValidation = () => {
		let newErrors = {};
		if (!username) {
			newErrors.username = "Obligatorio";
		} else if (username.length > 15) {
			newErrors.username("Debe tener 15 caracteres o menos");
		}
		if (!email) {
			newErrors.email("Obligatorio");
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
			newErrors.email = "Dirección de correo electrónico errónea";
		}
		if (!password) {
			newErrors.password = "Obligatorio";
		} else if (password.length < 6) {
			newErrors.password = "La contraseña debe tener al menos 6 caracteres";
		}
		if (!repeatPassword) {
			newErrors.repeatPassword = "Obligatorio";
		} else if (password != repeatPassword) {
			newErrors.repeatPassword = "Las contraseñas deben coincidir";
		}
		setErrors(newErrors);
	};
	const handleSubmit = event => {
		event.preventDefault();
		const file = document.querySelector("#file");
		actions.registerTraveler(datos, setExist);
	};
	const divStyle = {
		display: "none"
	};
	const [avatarPreview, setAvatarPreview] = useState("../../img/default_avatar.png");
	return (
		<div className="container fluid">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<form className="mb-5 mt-2 p-2" onSubmit={handleSubmit}>
						<div className="row justify-content-center">
							<Image src={avatarPreview || user?.avatar}></Image>
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
											onChange={e => {
												const fileReader = new FileReader();
												fileReader.onload = () => {
													if (fileReader.readyState === 2) {
														setFieldValue("avatar", fileReader.result);
														setAvatarPreview(fileReader.result);
													}
												};
												fileReader.readAsDataURL(e.target.files[0]);
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<label htmlFor="username">Nombre de usuario</label>
						<input
							id="username"
							name="username"
							type="text"
							placeholder="nombre de usuario"
							onChange={e => setDatos(e.target.value)}
							value={datos.username}
						/>

						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							type="text"
							placeholder="email"
							onChange={e => setDatos(e.target.value)}
							value={datos.email}
						/>

						<label htmlFor="password">Contraseña</label>
						<input
							id="password"
							name="password"
							type="password"
							placeholder="contraseña"
							onChange={e => setDatos(e.target.value)}
							value={datos.password}
						/>

						<label htmlFor="repeatPassword">Repite la contraseña</label>
						<input
							id="repeatPassword"
							name="repeatPassword"
							type="password"
							placeholder="repite la contraseña"
							onChange={e => setDatos(e.target.value)}
							value={datos.repeatPassword}
						/>

						{errors && <p>{errors}</p>}
						<button type="submit" disabled={disable}>
							Enviar
						</button>
					</form>
					{exist.status == true ? (
						<div className="alert alert-danger" role="alert">
							{exist.msg}
						</div>
					) : null}
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
registerTraveler.propTypes = {
	history: PropTypes.object
};
export default registerTraveler;
