const requestContainerEl = document.getElementById("requestContainer");

requestContainerEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName === "BUTTON") {
    const data = {
      requestUserID: event.target.dataset.userid,
      webLink: requestContainerEl.dataset.weblink,
    };

    // Add Post Data info!!
    postData("/api/offerUpdates/seedsMailed", data).then((response) => {
      console.log(response);
      event.target.innerHTML = "Sent"
    });
  }
});
