import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const useFormRegTraveler = (callback, validate) => {
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { store, actions } = useContext(Context);

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			callback(actions.registerTraveler(values));
		}
	}, [errors]);

	const handleSubmit = event => {
		if (event) event.preventDefault();
		setErrors(validate(values));
		setIsSubmitting(true);
	};

	const handleChange = event => {
		event.persist(); //así hacemos el primer event nulo cuando el segundo evento es ejecutado
		setValues(values => ({ ...values, [event.target.name]: event.target.value }));
	};

	return {
		handleChange,
		handleSubmit,
		values,
		errors
	};
};

export default useFormRegTraveler;
