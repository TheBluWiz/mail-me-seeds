const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const confirmPasswordEl = document.getElementById("confirmPassword");
const mailingAddressEl = document.getElementById("mailingAddress");
const signUpEl = document.getElementById("signUp");

signUpEl.addEventListener('click', (event) => {
  event.preventDefault();

  const signUpData = {
    username: usernameEl.value,
    email: emailEl.value,
    password: passwordEl.value
  }

  if (passwordEl.value !== confirmPasswordEl.value) {
    alert("Passwords do not match")
    passwordEl.value = ""
    confirmPasswordEl.value = ""
  }
  else {
    postData('/api/signUp', signUpData)
    .then((response) => {
      if (response.ok) document.location.replace('/user/mailing')
      else alert("Error Creating Account")
    })
    .catch((err) => {
      console.log(`Post Failed:\n\n${err}`)
    })
  }
})