const shell = require("electron");

const alertMarcador = document.querySelector(".alert-marcador");
const formMarcador = document.querySelector(".form-marcador");
const urlMarcador = document.querySelector(".url-marcador");
const buttonMarcador = document.querySelector(".button-marcador");
const marcadores = document.querySelector(".marcadores");
const eliminarMarcador = document.querySelector(".eliminar-marcador-button");
let linkBookmark = document.querySelectorAll(".link-bookmark");
const parser = new DOMParser();

urlMarcador.addEventListener("keyup", () => {
  buttonMarcador.disabled = !urlMarcador.validity.valid;
});

formMarcador.addEventListener("submit", createMarcador);

eliminarMarcador.addEventListener("click", () => {
  localStorage.clear();
  marcadores.innerHTML = "";
});

function createMarcador(event) {
  event.preventDefault();
  const url = urlMarcador.value;
  fetch(url)
    .then((resp) => resp.text())
    .then((text) => parser.parseFromString(text, "text/html"))
    .then((text) => text.querySelector("title").innerHTML.trim())
    .then((text) => localStorage.setItem(url, JSON.stringify({ title: text, url: url })))
    .then((text) => {
      urlMarcador.value = "";
      listMarcadores();
    })
    .catch((error) => alertError(error, url));
}

function listMarcadores() {
  const bookmarks = Object.keys(localStorage).map((k) =>
    JSON.parse(localStorage.getItem(k))
  );
  const items = bookmarks.map((k) => geratorListItem(k)).join("");
  marcadores.innerHTML = `<ul class="list-group">${items}</ul>`;
  linkBookmark = document.querySelectorAll(".link-bookmark");
}

const geratorListItem = (parm) =>
  `<li class="list-group-item"><a href="${parm.url}" class="link-bookmark"><i class="fas fa-bookmark"></i><span>${parm.title}</span></a></li>`;

const alertError = (err, url) => {
  alertMarcador.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <span>url: ${url}, error: ${err}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
  setTimeout(() => {
    alertMarcador.innerHTML = "";
  }, 2000);
};

listMarcadores();

linkBookmark.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    shell.shell.openExternal(item.href);
  });
});
