const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const loginEl = document.getElementById("login");

loginEl.addEventListener("click", (event) => {
	event.preventDefault();

	const loginData = {
		email: emailEl.value,
		password: passwordEl.value,
	};

	postData("/api/userActions/login", loginData)
		.then((response) => {
			console.log(response);
			if (response.ok) document.location.replace("/");
			else alert("Error Signing In");
		})
		.catch((err) => {
			console.log(`Post Failed:
    ${err}`);
		});
});
