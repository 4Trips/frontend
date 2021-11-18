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
	return errors;
}
