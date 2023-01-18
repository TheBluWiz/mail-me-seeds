const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const loginEl = document.getElementById("login");

const loginData = {
  email: emailEl.value,
  password: passwordEl.value
}

loginEl.addEventListener('click', (event) => {
  event.preventDefault();
  postData('/api/login', loginData)
  .then((response) => {
    console.log(response)
      if (response.ok) document.location.replace('/')
      else alert("Error Signing In")
  })
  .catch((err) => {
    console.log(`Post Failed:
    ${err}`)
  })
})