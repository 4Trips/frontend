import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignUpPro = props => {
	const { store, actions } = useContext(Context);

	const [datos, setDatos] = useState({
		user_name: "",
		email: "",
		password: "",
		repeatPassword: "",
		phone: "",
		url: "",
		direction: "",
		location: "",
		vat_number: "",
		social_reason: "",
		avatar: ""
	});

	const [submited, setSubmited] = useState(false);
	const [valied, setValied] = useState({ status: false, msg: "" });
	const [exist, setExist] = useState({
		status: false,
		msg: ""
	});
	const [noValied, setNoValied] = useState({
		status: false,
		msg: ""
	});

	const handleChange = e => {
		if (e.target.name == "avatar") {
			const reader = new FileReader();
			reader.onload = event => {
				if (reader.readyState === 2) {
					setDatos({ ...datos, avatar: reader.result });
				}
			};
			if (e.target.files[0] != undefined) {
				reader.readAsDataURL(e.target.files[0]);
			}
		} else {
			setDatos({ ...datos, [e.target.name]: e.target.value });
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
		setSubmited(true);
		if (
			datos.user_name != "" &&
			datos.email != "" &&
			datos.password.length > 6 &&
			datos.password == datos.repeatPassword &&
			exist.status == false
		) {
			const file = document.querySelector("#file");
			actions.registerPro(datos, props, file.files[0], setValied, setExist, setNoValied);
		}
	};

	return (
		<div className="container" onChange={handleChange} onSubmit={handleSubmit}>
			<div className="row justify-content-md-center">
				<div className="col-12 col-md-6 ">
					<Form className="p-5">
						<Form.Group controlId="formFileLg" className="mb-3">
							<Form.Label for="file">
								<Button></Button>
							</Form.Label>
							<Form.Control type="file" className="invisible" id="file" name="avatar" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Nombre de usuario</Form.Label>
							<Form.Control type="text" placeholder="Nombre de usuario" name="user_name" />
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="email" name="email" />
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Contraseña</Form.Label>
							<Form.Control type="password" placeholder="contraseña" name="password" />
						</Form.Group>{" "}
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Repite tu contraseña</Form.Label>
							<Form.Control type="password" placeholder="Repite tu contraseña" name="repeatPassword" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Telefono</Form.Label>
							<Form.Control type="text" placeholder="Telefono" name="phone" />
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>URL de si pagina web</Form.Label>
							<Form.Control type="text" placeholder="www.misitioweb.com" name="url" />
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Dirección</Form.Label>
							<Form.Control type="text" placeholder="Dirección" name="direction" />
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Localidad</Form.Label>
							<Form.Control type="text" placeholder="Localidad" name="location" />
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>NIF (Opcional)</Form.Label>
							<Form.Control type="text" placeholder="NIF" name="vat_number" />
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Razón social (Opcional)</Form.Label>
							<Form.Control type="text" placeholder="Razón social" name="social_reason" />
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
						<div className=" text-center">
							<Button variant="dark" type="submit">
								Registrar
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};
SignUpPro.propTypes = {
	history: PropTypes.object
};

export default SignUpPro;
