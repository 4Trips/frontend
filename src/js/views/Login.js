import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const LogIn = props => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({
		email: "",
		password: ""
	});

	const [loading, setLoading] = useState(false);
	useEffect(
		// hago que se cambie ejecuta el useEffect solamente cuando se hace un cambio en en state.email.length
		() => {},
		[state.email.length, state.password.length]
	);

	const [error, setError] = useState({
		email: "",
		password: ""
	});
	const [errFetch, setErrFetch] = useState({
		// aqui esta vinculado con el fetch del backend para si hay algun erro o el usuario no existe mandar un mensaje en el front
		status: false,
		msg: ""
	});
	const handelChange = e => {
		setState({ ...state, [e.target.name]: e.target.value });
		if (state.email != "") {
			setError({ ...error, email: "" });
		} else if (state.password != "") {
			setError({ ...error, password: "" });
		}
	};
	const handelSubmit = event => {
		event.preventDefault();
		console.log("en handle");
		setErrFetch({
			status: false,
			msg: ""
		});
		if (state.email == "" || state.password == "") {
			setError({ ...error, email: "Introduce tu email", password: "Introduce tu contraseña" });
			console.log("en handle22222");
		} else {
			actions.login(state, setErrFetch, props.history, setLoading);
			setLoading(true);
			console.log("en handle2");
		}
	};

	return (
		<div className="container" onChange={handelChange} onSubmit={handelSubmit}>
			<div className="row justify-content-md-center">
				<div className="col-12 col-md-6 ">
					<Form className="p-5">
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="email" name="email" />
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Contraseña</Form.Label>
							<Form.Control type="password" placeholder="contraseña" name="password" />
						</Form.Group>
						<div className=" text-center">
							<Button variant="dark" type="submit">
								Login
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};

LogIn.propTypes = {
	history: PropTypes.object
};
export default LogIn;
