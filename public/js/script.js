console.log("this is the client side javascript");

const urlForm = document.querySelector("form");
const url = document.querySelector("input");
const resultMessage = document.getElementById("resultMessage");

urlForm.addEventListener("submit", (e) => {
  e.preventDefault();

  resultMessage.textContent = "Loading...";

  const inputURL = url.value;
  fetch("/url_shortener?url=" + inputURL).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          resultMessage.textContent = data.error;
        } else {
          resultMessage.textContent = "Result : " + data.result_url;
        }
      });
    }
  );
});
