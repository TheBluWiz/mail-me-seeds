const passwordEl = document.getElementById("password");
const confirmPasswordEl = document.getElementById("confirmPassword");
const resetBtnEl = document.getElementById("resetBtn");

resetBtnEl.addEventListener("click", (event) => {
  event.preventDefault();

  if (passwordEl.value !== confirmPasswordEl.value) {
    alert("Passwords don't match!!")
    passwordEl.value = ""
    confirmPasswordEl.value = ""
  }
  else {
    data = {
      resetLink: resetBtnEl.dataset.resetlink,
      password: passwordEl.value
    }
    console.log(data)
    updateData('/api/userActions/resetPassword', data)
    .then((response) => {
      if (response.ok) document.location.replace("user/")
      else alert("Try reset again later")
    })
    .catch((err) => {
      console.log(err)
    })
  }
})