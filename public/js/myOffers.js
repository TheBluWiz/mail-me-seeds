const offersEl = document.getElementById("offers");
offersEl.addEventListener("click", (event) => {
	event.preventDefault();
	if (event.target.innerHTML === "Delete This Request") {
		let data = {
			offerID: event.target.dataset.offerid,
		};
		deleteData("/api/offerUpdates/offers", data);
		event.target.parentElement.parentElement.parentElement.remove();
	}
});
