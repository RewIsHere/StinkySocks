const xd = require('./js/Controladores/loginControl')
const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;

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

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const admin = document.getElementById('admin');
const container = document.getElementById('container');

const btnClose = document.getElementById('btnclose');


signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

admin.addEventListener('click', () => {
  location.replace("index2.html")
});


btnClose.addEventListener("click", () => {
  console.log('XD');
  ipc.send("closeApp");
});

// FUNCION PARA INICIAR SESION

async function iniciarSesion() {
  usuario = document.getElementById('login-username').value
  contra = document.getElementById('login-password').value
  if (usuario === '' || contra === '') {
    Toast.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algun campo esta vacio!'
    })
    return;
  }
  const result = await xd.verificarLogin(usuario, contra);
  if (result.sucess) {
    location.href = "inicio2.html";
  } else {
    contra.value = ''
    console.log(result);
    Toast.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Usuario o contraseña incorrecta'
    })
  }
}

//FIN


//FUNCION PARA REGISTRARSE
async function registrar() {
  nombre = document.getElementById('nombre').value
  apellidos = document.getElementById('apellidos').value
  usuario = document.getElementById('username').value
  contra = document.getElementById('password').value
  email = document.getElementById('email').value
  if (nombre === '' || apellidos === '' || usuario === '' || contra === '' || email === '') {
    Toast.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algun campo esta vacio!'
    })
    return;
  }
  const result = await xd.crearCuenta(nombre, apellidos, usuario, contra, email);
  if (result.sucess) {
    nombre.value = ''
    apellidos.value = ''
    usuario.value = ''
    contra.value = ''
    email.value = ''
    Toast.fire({
      icon: 'success',
      title: 'Cuenta creada',
      text: 'Se ha creado tu cuenta exitosamente',
      background: 'FFFF',
      width: 380
    })
  } else {
    usuario.value = ''

    console.log(result);
    Toast.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Este usuario ya existe'
    })
  }
}
//FIN