const emailEl = document.getElementById("email");
const updateEmailBtnEl = document.getElementById("updateEmailBtn");

updateEmailBtnEl.addEventListener("click", (event) => {
  event.preventDefault();
  data = {
    email: emailEl.value
  }
  postData('/api/userActions/updateEmail', data).then((response) => {
    if (response.ok) document.location.replace('/user/dashboard')
  })
})