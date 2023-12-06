const fs = require('fs');
var mysql = require('promise-mysql');

let conexion = null;

async function getConexion() {
    try {
        if (!conexion) {
            conexion = await mysql.createConnection({
                host: "0zhwrpnkme8m.us-east-4.psdb.cloud",
                user: "cao6t3zy3sec",
                password: "pscale_pw_ImDVqs51pAzU67jHEu-H3gJB1Ca33Yqm_9nSToHsRFw",
                database: "prueba",
                ssl: {
                    ca: fs.readFileSync(__dirname + '/cacert.pem')
                }
            });
            console.log('Se ha realizado la conexion a MySQL exitosamente');
        }
        return conexion;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = getConexion;