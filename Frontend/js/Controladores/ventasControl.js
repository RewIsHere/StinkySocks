const getConexion = require('./database')


async function insentarVenta(venta) {
    try {
        const conn = await getConexion();
        venta.cantidad = parseInt(venta.cantidad);
        venta.precio_venta = parseFloat(venta.precio_venta);
        const result = await conn.query('INSERT INTO VENTAS (ID_VENTA, CANTIDAD, ARTICULOS, PRECIO_VENTA, VENDIDO_POR, FECHA) VALUES (?,?,?,?,?) ', [venta.cantidad, venta.articulos, venta.precio_venta, venta.vendido_por, venta.fecha]);

        return venta;
    } catch (error) {
        console.log(error);
        return {
            sucess: false,
            message: error
        }
    }
}

async function getVentas() {
    try {
        const conn = await getConexion();

        const myQuery = 'SELECT * FROM VENTAS'

        const result = await conn.query(myQuery)

        return {
            sucess: true,
            message: result
        }
    } catch (error) {
        return {
            sucess: false,
            message: error
        }
    }
}

async function buscarProductos(id) {
    const query = `SELECT * FROM PRODUCTOS WHERE ID = '${id}'`
    try {
        const connection = await getConexion()
        const response = await connection.query(query)
        return response
    } catch (error) {
        console.error(error.message)
        throw error
    }
}
module.exports = {
    insentarVenta,
    getVentas,
    buscarProductos
}