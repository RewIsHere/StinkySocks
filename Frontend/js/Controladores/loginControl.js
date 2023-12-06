const getConexion = require('./database')

async function verificarLogin(usuario, contra) {
    try {
        const conn = await getConexion();
        let sql = `SELECT * FROM USUARIOS WHERE USUARIO = \'${usuario}\' AND CONTRASENA = \ '${contra}\'`;
        let result = await conn.query(sql);
        console.log(usuario, contra);
        if (result.length) {
            console.log('FUNCIONA');
            return {
                sucess: true,
                message: 'La sesion es correcta. Redirigiendo...'
            }
        } else {
            console.log('NO FUNCIONA');
            return {
                sucess: false,
                message: 'La sesion no es correcta'
            }
        }
    } catch (error) {
        return {
            sucess: false,
            message: error
        }
    }
}

async function crearCuenta(nombre, apellido, usuario, contra, email) {
    try {
        const conn = await getConexion();
        let sql = `SELECT * FROM USUARIOS WHERE USUARIO = \'${usuario}\' AND CONTRASENA = \ '${contra}\'`;
        let result = await conn.query(sql);
        if (result.length) {
            console.log('NO FUNCIONA');
            return {
                sucess: false,
                message: 'ESTA CUENTA YA EXISTE'
            }
        } else {
            console.log('FUNCIONA');
            let sql2 = `INSERT INTO USUARIOS SET NOMBRE = \'${nombre}\', APELLIDO = \'${apellido}\', USUARIO = \'${usuario}\', CONTRASENA = \'${contra}\', EMAIL = \'${email}\'`;
            await conn.query(sql2);
            return {
                sucess: true,
                message: 'CUENTA CREADA'
            }
        }
    } catch (error) {
        return {
            sucess: false,
            message: error
        }
    }
}

module.exports = {
    verificarLogin,
    crearCuenta
}