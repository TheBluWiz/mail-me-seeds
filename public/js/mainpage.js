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
  }
})