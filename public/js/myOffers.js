const offersEl = document.getElementById("offers");
offersEl.addEventListener("click", (event) => {
	event.preventDefault();
	if (event.target.innerHTML === "Delete This Offer") {
		let data = {
			offerID: event.target.dataset.offerid,
		};
		deleteData("/api/offerUpdates/offers", data);
		event.target.parentElement.parentElement.parentElement.remove();
	}
	if (event.target.innerHTML === "View Request") {
		document.location.replace(`/offers/checkRequests/${event.target.dataset.weblink}`)
	}
});
