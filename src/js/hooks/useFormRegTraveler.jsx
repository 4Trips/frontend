import { objectOf } from "prop-types";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const useFormRegTraveler = (callback, validate) => {
	const [errors, setErrors] = useState({});
	const [values, setValues] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { store, actions } = useContext(Context);

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			callback(actions.registerTravelerAwait(values, errors, file));
		}
	}, [errors]);

	const handleSubmit = event => {
		event.preventDefault();
		setErrors(validate(values));
		setIsSubmitting(true);
	};
	const handleFileUpload = event => {
		const reader = new FileReader();
		const file = event.target.files[0];

		reader.onloadend = () => {
			//function setea value avatar como string base64.
			setValues({
				avatar: file,
				previewAvatar: reader.result
			});
			console.log("file", file);
		};
		reader.readAsDataURL(file); //lee el contenido del archivo de imagen y activa loadend después de que lo ha leído
	};
	const handleChange = event => {
		event.persist(); //así hacemos el primer event nulo cuando el segundo evento es ejecutado
		setValues(values => ({ ...values, [event.target.name]: event.target.value }));
	};

	return {
		handleFileUpload,
		handleChange,
		handleSubmit,
		values,
		errors
	};
};

export default useFormRegTraveler;
