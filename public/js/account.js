const updatePasswordEl = document.getElementById("updatePassword")

updatePasswordEl.addEventListener("click", (event) => {
  console.log("I clicked")
  data = {
    userID: event.target.dataset.userid
  }
  postData('/api/userActions/resetRedirect', data)
  .then((response) =>{
    if (response.ok) document.location.replace('/user/reset-message')
  })
})