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
                          <button style="-webkit-app-region: no-drag" type="button" class="btn btn-warning m-1" onclick="actualizarProd(${producto.ID},'${producto.MARCA}','${producto.DESCRIPCION}', '${producto.PRECIO}', '${producto.STOCK}')" data-bs-toggle="modal" data-bs-target="#modal-form-update">Editar</button>
                          <button style="-webkit-app-region: no-drag" type="button" class="btn btn-danger m-1" onclick="borrarProd('contact-${producto.ID}', ${producto.ID})">Eliminar</button>
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

//==============================FUNCAO PARA DELETAR CONTATO========================
async function borrarProd(trId, id) {
  const authorization = confirm("Tem certeza que deseja deletar o contato?");

  if (authorization) {

    console.log('LOADING');

    const result = await xd.borrarProducto(id)

    if (result.sucess === true) {
      document.getElementById(trId).remove()
      Toast.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: 'Se ha eliminado el producto correctamente',
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
}

//===========================FUNCAO PARA ATUALIZAR O CONTATO=========================
function actualizarProd(id, marca, descripcion, precio, stock) {
  const produ_id = document.getElementById('input-txt-id-update')
  const produ_marca = document.getElementById('input-txt-marca-update')
  const produ_desc = document.getElementById('input-txt-descripcion-update')
  const produ_precio = document.getElementById('input-txt-precio-update')
  const produ_stock = document.getElementById('input-txt-stock-update')

  produ_id.value = id
  produ_marca.value = marca
  produ_desc.value = descripcion
  produ_precio.value = precio
  produ_stock.value = stock
}


const formUpdate = document.getElementById('form-update');
const modalFormUpdate = document.getElementById('modal-form-update')
formUpdate.addEventListener('submit', async (event) => {
  event.preventDefault()
  //fecha o modal
  const modal = bootstrap.Modal.getInstance(modalFormUpdate)
  modal.hide()

  //adiciona o loading
  console.log('LOADING');

  const produ_id = document.getElementById('input-txt-id-update')
  const produ_marca = document.getElementById('input-txt-marca-update')
  const produ_desc = document.getElementById('input-txt-descripcion-update')
  const produ_precio = document.getElementById('input-txt-precio-update')
  const produ_stock = document.getElementById('input-txt-stock-update')

  const id = produ_id.value;
  const marca = produ_marca.value;
  const descripcion = produ_desc.value;
  const precio = produ_precio.value;
  const stock = produ_stock.value;

  produ_id.value = ''
  produ_marca.value = ''
  produ_desc.value = ''
  produ_precio.value = ''
  produ_stock.value = ''

  const result = await xd.actualizarProducto(id, marca, descripcion, precio, stock);

  if (result.sucess) {
    Toast.fire({
      icon: 'success',
      title: 'Cuenta creada',
      text: 'Se ha actualizado correctamente el producto',
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

  await renderizarProductos()
})

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

async function init() {
  await renderizarProductos()
}

init()