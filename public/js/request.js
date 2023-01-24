const offersContainerEl = document.getElementById("offersContainer");

offersContainerEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName === "BUTTON") {
    let data = {
      offerID: event.target.dataset.offerid
    }
    deleteData('/api/offerUpdates/request', data)
    event.target.parentElement.remove();
  }
})