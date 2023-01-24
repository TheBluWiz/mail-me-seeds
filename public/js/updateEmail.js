const newEmailEl = document.getElementById("newEmail");
const confirmEmailEl = document.getElementById("confirmEmail");
const updateEmailBtnEl = document.getElementById("updateEmailBtn");

updateEmailBtnEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (newEmailEl.value === "") return;
  if (newEmailEl.value === confirmEmailEl.value) {
    data = {
      email: newEmailEl.value,
    };
    const response = postData("/api/userActions/updateEmail", data);
    document.location.replace('/user/dashboard')
  } else {
    alert("Emails Don't Match");
    newEmailEl.value = "";
    confirmEmailEl.value = "";
  }
});
