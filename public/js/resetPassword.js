const emailEl = document.getElementById("email")
const resetBtnEl = document.getElementById("resetBtn")

resetBtnEl.addEventListener('click', (event) => {
  event.preventDefault();
  data = {
    email: emailEl.value
  }
  postData('/api/mailService/resetPassword', data)
  .then((response) => {
    console.log(response);
    if (response.ok) document.location.replace("/user/reset-message");
    else alert("Error Signing In");
  })
  .catch((err) => {
    console.log(`Post Failed:
  ${err}`);
  });
})