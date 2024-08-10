import { useState } from "react";

export const useFormInput = (initialValue = "") => {

	const [value, setValue] = useState(initialValue);

	const handleChange = async (e: any) => {

		const tempValue = await e.currentTarget.value;
		setValue(tempValue);
	}

	return {

		value,
		reset: (newValue: any) => setValue(newValue),
		onIonChange: handleChange,
		onKeyUp: handleChange
	};
}

export const validateForm = (fields: any) => {

	let errors: any = [];

	fields.forEach((field: any) => {

		if (field.required) {

			const fieldValue = field.input.state.value;

			if (fieldValue === "") {

				const error = {

					id: field.id,
					message: 'Please check your '+(field.id).split('_').join(" "),
				};

				errors.push(error);
			}
		}
	});

	return errors;
}
export const getValues = (fields: any) => {
	var values: any = {};
	fields.forEach((field: any) => {
		values[field.id] = field.input.state.value;
	});
	return values;
}