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

function completar() {

    Toast.fire({
        icon: 'success',
        title: 'Pagado',
        text: 'Tu compra se ha realizado correctamente',
        background: 'FFFF',
        width: 380
    })
}