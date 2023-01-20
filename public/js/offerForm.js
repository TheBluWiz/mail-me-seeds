const seedNameEl = document.getElementById("seedName");
const offerDescriptionEl = document.getElementById("offerDescription");
const postOfferEl = document.getElementById("postOffer");

postOfferEl.addEventListener("click", (event) => {
  event.preventDefault();

  data = {
    seedName: seedNameEl.value,
    offerDescription: offerDescriptionEl.value,
  };

  postData("/api/offerUpdates/newOffer", data).then((response) => {
    if (response.ok) document.location.replace("/offers/myoffers");
    else alert("Error Signing In");
  });
});
