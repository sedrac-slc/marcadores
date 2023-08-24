const alertMarcador = document.querySelector(".alert-marcador");
const formMarcador = document.querySelector(".form-marcador");
const urlMarcador = document.querySelector(".url-marcador");
const buttonMarcador = document.querySelector(".button-marcador");
const marcador = document.querySelector(".marcadores");
const eliminarMarcador = document.querySelector(".eliminar-marcador-button");
const parser = new DOMParser();

urlMarcador.addEventListener("keyup", () => {
  buttonMarcador.disabled = !urlMarcador.validity.valid;
});

formMarcador.addEventListener("submit", createMarcador);

function createMarcador(event) {
    event.preventDefault();
  console.log("oi");
}
