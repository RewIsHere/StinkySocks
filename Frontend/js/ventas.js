
const btnAgregar = document.getElementById('btnAgregar');

btnAgregar.addEventListener("click", () => {
    comprar()
});


function comprar() {
    console.log('LOADING');

    const tablaVentas = document.getElementById('table_body')

    tablaVentas.innerHTML += `
                  <tr id="contact-${1}">
                  <th scope="row">${1}</th>
                  <td>${1}</td>
                  <td>${33.0}</td>
                  </tr>
          `
}

function pagar() {
    window.location.assign("pagos.html")
}

function efectivo() {
    window.location.assign("comprobante.html")
}
