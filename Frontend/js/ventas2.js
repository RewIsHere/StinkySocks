const xd = require('./js/Controladores/ventasControl')

const Swal = require('sweetalert2');
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


async function renderizarVentas() {
    const result = await xd.getVentas();
    console.log('LOADING');
    if (result.sucess) {
        const ventas = result.message;

        const tablaVentas = document.getElementById('table_body')
        tablaVentas.innerHTML = ''

        console.log(result.message);
        ventas.forEach(producto => {
            tablaVentas.innerHTML += `
                  <tr id="contact-${producto.ID_VENTA}">
                  <th scope="row">${producto.ID_VENTA}</th>
                  <td>${producto.CANTIDAD}</td>
                  <td>${producto.ARTICULOS}</td>
                  <td>${producto.PRECIO_VENTA}</td>
                  <td>${producto.VENDIDO_POR}</td>
                  <td>${producto.FECHA}</td>
                  </tr>
          `
        });
        Toast.fire({
            icon: 'success',
            title: 'Productos cargados',
            text: 'Han cargado todos los productos correctamente',
            background: 'FFFF',
            width: 380
        })
    } else {
        Toast.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.message
        })
    }
}