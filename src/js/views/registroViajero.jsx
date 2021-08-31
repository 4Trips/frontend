import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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

	const [submited, setSubmited] = useState(false);

	const [valied, setValied] = useState({ status: false, msg: "" });

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

	return (
		<div className="container">
			<div className="row justify-content-md-center">
				<div className="col-12 col-md-6 ">
					<Form className="p-5" noValidate onSubmit={handleSubmit}>
						<input type="file" name="avatar" className="hidenButton" id="file" />
						<Form.Group className="mb-3" controlId="formBasicUser">
							<Form.Label>Nombre de usuario</Form.Label>
							<Form.Control
								type="text"
								placeholder="nombre de usuario"
								name="username"
								onChange={handleChange}
								value={datos.username}
							/>
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
						</Form.Group>
						<Button variant="dark" type="submit">
							Registrar
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};
registerTraveler.propTypes = {
	history: PropTypes.object
};
export default registerTraveler;
