export default function validate(values) {
	let errors = {};
	if (!values.username) {
		errors.username = "Tienes que escoger un nombre de usuario";
	} else if (values.username.length > 15) {
		errors.username = "El nombre de usuario tiene que tener 15 caracteres o menos";
	}
	if (!values.email) {
		errors.email = "Tienes que facilitar una dirección de email";
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = "Dirección de correo electrónico errónea";
	}
	if (!values.password) {
		errors.password = "Tienes que escoger una contraseña";
	} else if (values.password.length < 6) {
		errors.password = "La contraseña debe tener 6 o mas caracteres";
	}
	if (!values.repeatPassword) {
		errors.repeatPassword = "Tienes que repetir la contraseña";
	} else if (values.password != values.repeatPassword) {
		errors.repeatPassword = "Las contraseñas deben coincidir";
	}
	if (!values.destination) {
		errors.destination = "Tienes que escoger un destino";
	}
	if (!values.first_day) {
		errors.first_day = "Tienes que asignar una fecha de inicio";
	}
	if (!values.last_day) {
		errors.last_day = "Tienes que asignar una fecha final";
	}
	if (!values.description) {
		errors.last_day = "Tienes que escribir una descripcion";
	} else if (values.description.length < 30) {
		errors.description = "Al menos 30 caracteres";
	}
	return errors;
}
