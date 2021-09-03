import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
///Componentes

const registerTraveler = props => {
	const { store, actions } = useContext(Context);
	const [datos, setDatos] = useState({
		username: "",
		email: "",
		password: "",
		repeatPassword: "",
		avatar: ""
	});

	const [valied, setValied] = useState({ status: false, msg: "" });

	const [submited, setSubmited] = useState(false);

	const [noValied, setNoValied] = useState({
		status: false,
		msg: ""
	});

	const [exist, setExist] = useState({
		status: false,
		msg: ""
	});

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
				console.log("target unbdefind", e.target.files[0]);
				reader.readAsDataURL(e.target.files[0]); // inicio eel proceso para convertit en una url y pasamos el archivo orginal e.target.files[0]
			}
		} else {
			setDatos({ ...datos, [e.target.name]: e.target.value });
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
		if (datos.username != "" && datos.email != "" && datos.repeatPassword == datos.password) {
			//esto es para obtener la imagen en crudo y pasarla al back
			const file = document.querySelector("#file");
			actions.registerTraveler(datos, props, file.files[0], setNoValied, setValied, setExist);
			setSubmited(true);
		}
	};

	const divStyle = {
		display: "none"
	};

	return (
		<div className="container">
			<div className="row justify-content-md-center">
				<div className="col-12 col-md-6 ">
					<Form className="mb-5 mt-2 p-2" noValidate onSubmit={handleSubmit}>
						{valied.status == true ? (
							<div className="alert alert-success" role="alert">
								<p className="">{valied.msg}</p>
							</div>
						) : null}
						<div className="row justify-content-md-center">
							<div className="col-12 col-md-4 ">
								{datos.avatar ? (
									<Image src={datos.avatar} thumbnail roundedCircle />
								) : (
									<Image
										src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
										thumbnail
										roundedCircle
									/>
								)}
							</div>
						</div>
						<div className="row justify-content-md-center">
							<div className="col-12 col-md-6 ">
								<div className="d-grid gap-1 col-6 mx-auto">
									<Form.Group controlId="formFile" className="mb-3 mt-3">
										<Form.Label for="file" className="btn btn-outline-dark btn-sm">
											Sube una foto
										</Form.Label>
										<Form.Control type="file" name="avatar" id="file" style={divStyle} />
									</Form.Group>
								</div>
							</div>
						</div>

						<Form.Group className="mb-3" controlId="formBasicUser">
							<Form.Label>Nombre de usuario</Form.Label>
							<Form.Control
								type="text"
								placeholder="nombre de usuario"
								name="username"
								onChange={handleChange}
								value={datos.username}
							/>
							{submited && !datos.username ? <span className="">Escoge un nombre de usuario</span> : null}
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="email"
								name="email"
								onChange={handleChange}
								value={datos.email}
							/>
							{submited && !datos.email ? (
								<span className="">Introduce una dirección de correo electrónico válida</span>
							) : null}
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Contraseña</Form.Label>
							<Form.Control
								type="password"
								placeholder="contraseña"
								name="password"
								onChange={handleChange}
								value={datos.password}
							/>
							{submited && !datos.password ? (
								<span className="">La contraseña al menos debe ser de 6 caracteres</span>
							) : null}
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicRepeatPassword">
							<Form.Label>Repite la contraseña</Form.Label>
							<Form.Control
								type="password"
								placeholder="repite la contraseña"
								name="repeatPassword"
								onChange={handleChange}
								value={datos.repeatPassword}
							/>
							{submited && datos.repeatPassword != datos.password ? (
								<span className="">Las contraseñas no coinciden</span>
							) : null}
						</Form.Group>
						<div className="row justify-content-md-center">
							<Button variant="dark" type="submit">
								Registrar
							</Button>
						</div>
					</Form>
					{noValied.status == true ? (
						<div className="alert alert-danger" role="alert">
							{noValied.msg}
						</div>
					) : null}
					{exist.status == true ? (
						<div className="alert alert-danger" role="alert">
							{exist.msg}
						</div>
					) : null}
				</div>
			</div>
			<div className="row justify-content-md-center">
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
