const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const confirmPasswordEl = document.getElementById("confirmPassword");
const mailingAddressEl = document.getElementById("mailingAddress");
const signUpEl = document.getElementById("signUp");

const signUpData = {
	email: emailEl.value,
	password: passwordEl.value,
};

signUpEl.addEventListener("click", (event) => {
	event.preventDefault();
	if (passwordEl.value !== confirmPasswordEl.value) {
		alert("Passwords do not match");
		passwordEl.value = "";
		confirmPasswordEl.value = "";
	} else {
		signUpData.mailing = mailingAddressEl.value;
		postData("/api/userActions/signUp", signUpData)
			.then((response) => {
				if (response.ok) document.location.replace("/user/dashboard");
				else alert("Error Creating Account");
			})
			.catch((err) => {
				console.log(`Post Failed:\n\n${err}`);
			});
	}
});
