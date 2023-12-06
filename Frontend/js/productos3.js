const xd = require('./js/Controladores/productosControl')

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

const buscarbtn = document.getElementById('buscar-btn');

buscarbtn.addEventListener('click', () => {
  buscarProd()
});

async function renderizarProductos() {
  const result = await xd.getProductos();
  console.log('LOADING');
  if (result.sucess) {
    const productos = result.message;

    const tablaProductos = document.getElementById('table_body')
    tablaProductos.innerHTML = ''

    console.log(result.message);
    productos.forEach(producto => {
      tablaProductos.innerHTML += `
                  <tr id="contact-${producto.ID}">
                  <th scope="row">${producto.ID}</th>
                  <td>${producto.MARCA}</td>
                  <td>${producto.DESCRIPCION}</td>
                  <td>${producto.PRECIO}</td>
                  <td>${producto.STOCK}</td>
                  <td>
                      <div class="d-grid gap-2 d-md-block">
                          <button type="button" class="btn btn-warning m-1" onclick="actualizarProd(${producto.ID},'${producto.MARCA}','${producto.DESCRIPCION}', '${producto.PRECIO}', '${producto.STOCK}')" data-bs-toggle="modal" data-bs-target="#modal-form-update">Editar</button>
                          <button type="button" class="btn btn-danger m-1" onclick="borrarProd('contact-${producto.ID}', ${producto.ID})">Eliminar</button>
                      </div>
                  </td>
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

async function buscarProd() {
  const produ_id = document.getElementById('producto_id')
  const result = await xd.buscarProductos(produ_id.value);
  console.log('LOADING');
  if (result) {

    const tablaProductos = document.getElementById('table_body')
    tablaProductos.innerHTML = ''

    console.log(result.message);
    result.forEach(producto => {
      tablaProductos.innerHTML += `
                  <tr id="contact-${producto.ID}">
                  <th scope="row">${producto.ID}</th>
                  <td>${producto.MARCA}</td>
                  <td>${producto.DESCRIPCION}</td>
                  <td>${producto.PRECIO}</td>
                  <td>${producto.STOCK}</td>
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

async function init() {
  await renderizarProductos()
}

init()