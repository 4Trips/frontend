import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
///Componentes

const registerTraveler = props => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({
		username: "",
		email: "",
		password: "",
		repeatPassword: "",
		rol: "Traveler"
		//avatar: ""
	});

	const [submited, setSubmited] = useState(false);

	const handleChange = e => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		setSubmited(true);
		actions.registerTraveler(state);
	};

	return (
		<div className="container">
			<div className="row justify-content-md-center">
				<div className="col-12 col-md-6 ">
					<Form className="p-5" noValidate onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formBasicUser">
							<Form.Label>Nombre de usuario</Form.Label>
							<Form.Control
								type="text"
								placeholder="nombre de usuario"
								name="username"
								onChange={handleChange}
								value={state.username}
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
								value={state.email}
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
								value={state.password}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicRepeatPassword">
							<Form.Label>Repite la contraseña</Form.Label>
							<Form.Control
								type="password"
								placeholder="repite la contraseña"
								name="repeatPassword"
								onChange={handleChange}
								value={state.repeatPassword}
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
