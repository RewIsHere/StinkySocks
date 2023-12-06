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

let editingStatus = false;

async function addProducto() {
  const produ_id = document.getElementById('producto_id');
  const produ_marca = document.getElementById('producto_marca');
  const produ_desc = document.getElementById('producto_desc');
  const produ_precio = document.getElementById('producto_precio');
  const produ_stock = document.getElementById('producto_stock');
  if (produ_id.value === '' || produ_marca.value === '' || produ_desc.value === '' || produ_precio.value === '' || produ_stock.value === '') {
    Toast.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algun campo esta vacio!'
    })
    return;
  }
  const nuevoProducto = {
    id: produ_id.value,
    marca: produ_marca.value,
    descripcion: produ_desc.value,
    precio: produ_precio.value,
    stock: produ_stock.value
  };

  if (!editingStatus) {
    const savedProduct = await xd.insertarProducto(nuevoProducto);
    console.log('INSERTADO');
  } else {
    /*const productUpdated = await main.updateProduct(editProductId, newProduct);

    // Resetea
    editingStatus = false;
    editProductId = "";
    */
  }

  produ_id.focus();
};
