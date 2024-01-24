
export const btnResetPassword = async () => {
	const email = await getEmailFromUser();

	if (email) {
		try {

			const response = await sendResetPasswordRequest(email);

			handleResetPasswordResponse(response);
		} catch (error) {
			handleResetPasswordError(error);
		}
	}
};

const getEmailFromUser = async () => {
	// eslint-disable-next-line no-undef
	const { value: email } = await Swal.fire({
		title: "Input email address",
		input: "email",
		inputLabel: "Your email address",
		inputPlaceholder: "Enter your email address",
		showCancelButton: true,
		confirmButtonText: "Submit",
		cancelButtonText: "Cancel",
	});

	return email;
};

const sendResetPasswordRequest = async (email) => {

	const response = await fetch("http://localhost:8080/api/user/resetpass", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email }),
	});

	if (!response.ok) {
		throw new Error("Reset password request failed");
	}

	return response.json();
};

const handleResetPasswordResponse = (data) => {
	// eslint-disable-next-line no-undef
	Swal.fire({
		title: "Success",
		text: data.message,
		icon: "success",
		confirmButtonText: "OK",
	});

};

const handleResetPasswordError = (error) => {
	console.error("Error during password reset:", error);
	// eslint-disable-next-line no-undef
	Swal.fire({
		title: "Error",
		text: "Error while trying to reset the password.",
		icon: "error",
		confirmButtonText: "OK",
	});
};
