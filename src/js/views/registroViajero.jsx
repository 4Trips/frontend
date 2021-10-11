import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import Avatar from "../../img/default_avatar.png";
import Image from "react-bootstrap/Image";
import { useFormik } from "formik";
///Componentes
const validate = values => {
	const errors = {};
	if (!values.username) {
		errors.username = "Obligatorio";
	} else if (values.username.length > 15) {
		errors.firstName = "Debe tener 15 caracteres o menos";
	}
	if (!values.email) {
		errors.email = "Obligatorio";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Dirección de correo electrónico errónea";
	}
	if (!values.password) {
		errors.password = "Obligatorio";
	} else if (values.password.length < 6) {
		errors.password = "La contraseña debe tener al menos 6 caracteres";
	}
	if (!values.repeatPassword) {
		errors.repeatPassword = "Obligatorio";
	} else if (values.password != values.repeatPassword) {
		errors.repeatPassword = "Las contraseñas deben coincidir";
	}
	return errors;
};
const registerTraveler = () => {
	const { store, actions } = useContext(Context);
	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
			repeatPassword: "",
			avatar: ""
		},
		validate,
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
		}
	});
	const [exist, setExist] = useState({
		status: false,
		msg: ""
	});
	const [values, setValues] = React.useState({});

	const handleChange = event => {
		setValues(prevValues => ({
			...prevValues,
			[event.target.name]: event.target.value
		}));
	};

	const handleSubmit = event => {
		event.preventDefault();
		const file = document.querySelector("#file");
		actions.registerTraveler(datos, file.files[0], setExist);
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
											name="avatar"
											id="file"
											style={divStyle}
											onChange={e => {
												const fileReader = new FileReader();
												fileReader.onload = () => {
													if (fileReader.readyState === 2) {
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
							onChange={handleChange}
							value={formik.values.username}
						/>
						{formik.errors.username ? <div>{formik.errors.username}</div> : null}
						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							type="text"
							placeholder="email"
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
						{formik.errors.email ? <div>{formik.errors.email}</div> : null}
						<label htmlFor="password">Contraseña</label>
						<input
							id="password"
							name="password"
							type="text"
							placeholder="contraseña"
							onChange={formik.handleChange}
							value={formik.values.password}
						/>
						{formik.errors.password ? <div>{formik.errors.password}</div> : null}
						<label htmlFor="repeatPassword">Repite la contraseña</label>
						<input
							id="repeatPassword"
							name="repeatPassword"
							type="text"
							placeholder="repite la contraseña"
							onChange={formik.handleChange}
							value={formik.values.repeatPassword}
						/>
						{formik.errors.repeatPassword ? <div>{formik.errors.repeatPassword}</div> : null}
						<button type="submit">Enviar</button>
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
