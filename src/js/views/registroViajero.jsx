import React, { useContext } from "react";
import useFormRegTraveler from "../hooks/useFormRegTraveler.jsx";
import validate from "../registerTravelervalidations.jsx";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

const FormRegisterTraveler = () => {
	const { values, errors, handleChange, handleSubmit, handleFileUpload } = useFormRegTraveler(signUp, validate); //Pasamos al hook useFormRegTraveler la función de validación por parámetros
	function signUp() {
		console.log("No errores, callback realizada");
	}
	const { store } = useContext(Context);
	return (
		<div className="container fluid">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<form className="mb-5 mt-2 p-2" onSubmit={handleSubmit} noValidate>
						<div className="row justify-content-center">
							<div className="mb-5 mt-2 p-2">
								{values.avatar ? (
									<img className="mb-5 mt-2 p-2" src={values.avatar || ""} />
								) : (
									<img
										src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
										className="mb-5 mt-2 p-2"
									/>
								)}
							</div>
							<div className="mb-3 mt-3">
								<label htmlFor="file" className="btn btn-outline-dark btn-sm">
									Sube una foto
								</label>
								<input
									name="avatar"
									type="file"
									accept="image/*"
									hidden
									id="file"
									onChange={handleFileUpload}
								/>
							</div>
						</div>
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
						{store.errorsBackEnd && <p>{store.errorsBackEnd} </p>}
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
