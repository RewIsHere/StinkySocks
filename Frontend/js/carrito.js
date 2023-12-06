function llenarTablaAlCargar() {




    eel.mostrarProductos();
    eel.expose(llenarTabla)
    function llenarTabla(datosProductoArray) {
  
    
      document.getElementById('table_body').innerHTML = ''
      datosProductoArray.forEach(function (productoData) {
  
  
        markup = `<tr >
            <th scope="row">${productoData.ID}</th>
            <td >${productoData.Marca}</td>
            <td >${productoData.Descripcion}</td>
            <td >${productoData.Precio}</td>
            <td >${productoData.Stock}</td>
            <td class="d-flex justify-content-around">
                <button class="svg__button" id="${productoData.ID}" onclick="editarProducto(this.id)"><svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path
                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg></button>
                <button onclick="borrarProducto(this.id)" id="${productoData.ID}" class="svg__button"><svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg></button>
            </td>
        </tr>`
  
        $("#myTable tbody").prepend(markup);
  
      })
    }
  
  }
  
  // Auto click show button
  
  window.onload = () => {
  
    let button = document.getElementById('showData')
    button.click();
  
  }
  
  
  
  
  // Function for adding member
  function addProducto() {
  
    let producto_id = document.getElementById('producto_id').value;
    let producto_marca = document.getElementById('producto_marca').value;
    let producto_desc = document.getElementById('producto_desc').value;
    let producto_precio = document.getElementById('producto_precio').value;
    let producto_stock = document.getElementById('producto_stock').value;
  
    if (producto_id == '', producto_marca == '', producto_desc == '', producto_precio == '', producto_stock == '') {
      msgAlerta('Algun campo esta vacio', 'danger');
      return false;
    }
    else {
  
      let productoData = {
        producto_id: producto_id,
        producto_marca: producto_marca,
        producto_desc: producto_desc,
        producto_precio: producto_precio,
        producto_stock: producto_stock
      }
  
  
      eel.insertarProducto(productoData)
  
  
      eel.expose(llenarTabla)
      function llenarTabla(datosProductoArray) {
  
        datosProductoArray.forEach(function (productoData) {
  
  
          markup = `<tr>
            <th scope="row">${productoData.ID}</th>
            <td >${productoData.Marca}</td>
            <td >${productoData.Descripcion}</td>
            <td >${productoData.Precio}</td>
            <td >${productoData.Stock}</td>
            <td class="d-flex justify-content-around">
                <button class="svg__button" id="${productoData.ID}" onclick="editarProducto(this.id)"><svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path
                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg></button>
                <button onclick="borrarProducto(this.id)" id="${productoData.ID}" class="svg__button"><svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg></button>
            </td>
        </tr>`
  
          $("#myTable tbody").prepend(markup);
  
        })
  
  
        document.getElementById('producto_id').value = ''
        document.getElementById('producto_marca').value = ''
        document.getElementById('producto_desc').value = ''
        document.getElementById('producto_precio').value = ''
  
  
  
      }
  
      msgAlerta('Producto añadido correctamente', 'success')
  
    }
  }
  
  
  // Show msg function 
  
  function msgAlerta(msg, Bclass) {
    document.getElementById('msgAlerta').innerHTML = ` <h4 class="text-${Bclass}">${msg}</h4>`
  
    setTimeout(function () {
      document.getElementById('msgAlerta').innerHTML = ``
    }, 2500)
  }
  
  // Delete a member
  
  function borrarProducto(id) {
  
    eel.borrarProducto(id)
    eel.mostrarProductos()
    msgAlerta('Producto eliminado correcamente', 'success')
  
  }
  
  
  // Edit member info
  
  function editarProducto(id) {
    eel.editarProducto()
  
    eel.expose(llenarCampos)
    function llenarCampos(datosProductoArray) {
  
      datosProductoArray.forEach((producto) => {
  
        if (producto.ID == id) {
          let editarEsteProducto = producto
  
          let producto_id = document.getElementById('producto_id');
          let producto_marca = document.getElementById('producto_marca');
          let producto_desc = document.getElementById('producto_desc');
          let producto_precio = document.getElementById('producto_precio');
          let producto_stock = document.getElementById('producto_stock');
  
          producto_id.value = ''
          producto_marca.value = ''
          producto_desc.value = ''
          producto_precio.value = ''
          producto_stock.value = ''
  
  
          let producto_id_main_div = document.getElementById('producto_id_div')
          producto_id_main_div.innerHTML = `<input class="form-control" type="number" id="producto_id"
          placeholder="ID" value="${editarEsteProducto.ID}" required disabled>`
          // app_id.value = memberToEdit.AppID
          producto_marca.value = editarEsteProducto.Marca
          producto_desc.value = editarEsteProducto.Descripcion
          producto_precio.value = editarEsteProducto.Precio
          producto_stock.value = editarEsteProducto.Stock
    
          let producto_boton = document.getElementById('producto-boton')
          producto_boton.innerHTML = `<button class="add__producto__boton"  onclick="editarEsteProducto(this.id)"><svg
          xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
          <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z">
          </path>
      </svg>
      Editar Producto
  </div></button>`
        }
  
  
  
  
      })
    }
  }
  
  
  
  // Fro editMember
  function editarEsteProducto(editarEsteProducto) {
  
    let producto_id = document.getElementById('producto_id').value;
    let producto_marca = document.getElementById('producto_marca').value;
    let producto_desc = document.getElementById('producto_desc').value;
    let producto_precio = document.getElementById('producto_precio').value;
    let producto_stock = document.getElementById('producto_stock').value;  
  
   if (producto_id == '', producto_marca == '', producto_desc == '', producto_precio == '', producto_stock == '') {
      msgAlerta('Algun campo esta vacio', 'danger');
      return false;
    }
    else {
  
      let productoData = {
        producto_id: producto_id,
        producto_marca: producto_marca,
        producto_desc: producto_desc,
        producto_precio: producto_precio,
        producto_stock: producto_stock
      }
  
      eel.editarEsteProducto(productoData)
  
      let producto_boton = document.getElementById('producto-boton')
      producto_boton.innerHTML = `<button class="add__producto__boton" onclick="addProducto()"><svg
          xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
          <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z">
          </path>
      </svg>
      Añadir Producto
  </div></button>`
  
      let app_id_main_div = document.getElementById('producto_id_div')
      app_id_main_div.innerHTML = ` <input class="form-control" type="number" id="producto_id"
      placeholder="ID" required>`
  
  
  
      msgAlerta('Se han actualizado los datos correcamente', 'success')
  
    }
  
  
  
  
  }