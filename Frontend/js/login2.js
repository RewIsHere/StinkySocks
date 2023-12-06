const empleado = document.getElementById('empleado');
const btnClose = document.getElementById('btnclose');

empleado.addEventListener('click', () => {
	window.location.assign("index.html")
});

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


btnClose.addEventListener("click", () => {
	console.log('XD');
	ipc.send("closeApp");
});


function login2() {
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


	if (usuario == 'admin', contra == '12345678') {
		location.href = "inicio.html";
	}
	else {
		Toast.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Usuario o contraseña incorrecta'
		})
	}
}