const offersEl = document.getElementById("offers")

offersEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.innerHTML === "Seed Requested") return
  if (event.target.nodeName === "BUTTON") {
    let data = {
      seedID: event.target.dataset.offerid
    }
    event.target.innerHTML = "Seed Requested"
    postData('/api/offerUpdates/requestSeed', data)
    .then((response) => {
      if (response.ok) event.target.innerHTML = "Seed Requested"
      else {
        // Would like to make code additionally that checks if the offer belongs to the loggedIn user. Potentially add this code server side and differentiate in HTML.
        event.target.innerHTML = "Already Requested"
      }
    })
  }
})