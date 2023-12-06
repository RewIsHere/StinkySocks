function usuarioDAO() {

    var conexion = new database();

    this.encontrarLogin = function (usuario, contra, callback) {
        var c = conexion.conectado();
        c.query('SELECT * from USUARIOS WHERE USUARIO = ? AND CONTRASENA = ? ', [usuario, contra], function (err, row) {
            if (err) {
                console.log("[ERROR] " + err.message);
                callback(null);
            }
            else
                callback(row);
            c.end();
        });
    }

    this.crearCuenta = function (nombre, apellido, usuario, contra, email) {
        var c = conexion.conectado();
        c.query('INSERT INTO USUARIOS(NOMBRE, APELLIDO, USUARIO, CONTRASENA, EMAIL) VALUES ', nombre, apellido, usuario, contra, email,
            function (err, result) {
                if (err) {
                    console.log('[ERROR]: ' + err);
                } else
                    c.end();
            });
    }
}