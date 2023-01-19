const mailingEl = document.getElementById("mailing");
const updateBtn = document.getElementById("updateMailing")

updateBtn.addEventListener('click', (event) => {
  event.preventDefault;
  data = {
    mailing: mailingEl.value
  }
  updateData('/api/userActions/updateMailing', data)
  .then((response) => {
    console.log(response)
    if (response.ok) document.location.replace("/user/dashboard");
    else alert("Error Submitting Address");
  })
  .catch((err) => {
    console.log(`Put Failed:\n\n${err}`);
  });
})
