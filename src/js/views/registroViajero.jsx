import React, { useContext, useState } from "react";
import useFormRegTraveler from "../hooks/useFormRegTraveler.jsx";
import validate from "../registerTravelervalidations.jsx";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/formstyles.scss";

const FormRegisterTraveler = () => {
	const { values, errors, handleChange, handleSubmit, handleFileUpload } = useFormRegTraveler(signUp, validate); //Pasamos al hook useFormRegTraveler la función de validación por parámetros
	function signUp() {
		console.log("No errores, callback realizada");
	}
	const { store } = useContext(Context);
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<div className="card my-5">
						<form className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit} noValidate>
							<div className="text-center">
								<div className="text-center">
									{values.previewAvatar ? (
										<img
											className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
											src={values.previewAvatar || ""}
											thumbnail
										/>
									) : (
										<img
											src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
											className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
										/>
									)}
								</div>
								<div className="mb-3">
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
							<div className="mb-3">
								<label htmlFor="username">Nombre de usuario</label>
								<input
									id="username"
									name="username"
									type="text"
									className="form-control"
									placeholder="nombre de usuario"
									onChange={handleChange}
									value={values.username || ""}
								/>
								{errors.username && <p>{errors.username}</p>}
							</div>
							<div className="mb-3">
								<label htmlFor="email">Email</label>
								<input
									id="email"
									name="email"
									type="text"
									className="form-control"
									placeholder="email"
									onChange={handleChange}
									value={values.email || ""}
								/>
								{errors.email && <p>{errors.email}</p>}
							</div>
							<div className="mb-3">
								<label htmlFor="password">Contraseña</label>
								<input
									id="password"
									name="password"
									type="password"
									className="form-control"
									placeholder="contraseña"
									onChange={handleChange}
									value={values.password || ""}
								/>
								{errors.password && <p>{errors.password}</p>}
							</div>
							<div className="mb-3">
								<label htmlFor="repeatPassword">Repite la contraseña</label>
								<input
									id="repeatPassword"
									name="repeatPassword"
									type="password"
									className="form-control"
									placeholder="repite la contraseña"
									onChange={handleChange}
									value={values.repeatPassword || ""}
								/>
								{errors.repeatPassword && <p>{errors.repeatPassword}</p>}
							</div>
							{store.loading === false ? (
								<button type="submit" className="btn btn-outline-dark px-5 mb-5 w-100">
									Enviar
								</button>
							) : (
								<div className="text-center">
									<div className="spinner-border text-dark" role="status"></div>
								</div>
							)}
							{store.errorBack && <p>{store.errorBack}</p>}
						</form>
					</div>
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
