import React, { useState, useEffect, useContext } from "react";

export const Login = () => {
	return (
		<div className="container">
			<form>
				<div className="form-group row col-offset-2  col-offset-2">
					<label htmlFor="staticEmail" className="col-sm-2 col-form-label">
						Email
					</label>
					<div className="col-sm-10">
						<input type="email" className="form-control" id="staticEmail" placeholder="Email" />
					</div>
				</div>
				<div className="form-group row col-offset-2  col-offset-2">
					<label htmlFor="inputPassword" className="col-sm-2 col-form-label">
						Password
					</label>
					<div className="col-sm-10">
						<input type="password" className="form-control" id="inputPassword" placeholder="Password" />
					</div>
				</div>
				<div className="d-flex justify-content-center">
					<button type="button" className=" btn btn-primary ">
						Iniciar sesion
					</button>
				</div>
			</form>
		</div>
	);
};
