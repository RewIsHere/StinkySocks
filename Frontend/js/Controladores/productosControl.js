const getConexion = require('./database')


async function insertarProducto(producto) {
    try {
        const conn = await getConexion();
        producto.id = parseInt(producto.id);
        producto.precio = parseFloat(producto.precio);
        producto.stock = parseInt(producto.stock);
        const result = await conn.query('INSERT INTO PRODUCTOS (ID, MARCA, DESCRIPCION, PRECIO, STOCK) VALUES (?,?,?,?,?) ', [producto.id, producto.marca, producto.descripcion, producto.precio, producto.stock]);

        producto.id = result.insertId;
        return producto;
    } catch (error) {
        console.log(error);
        return {
            sucess: false,
            message: error
        }
    }
}

async function getProductos() {
    try {
        const conn = await getConexion();

        const myQuery = 'SELECT * FROM PRODUCTOS'

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


async function borrarProducto(id) {
    try {
        const conn = await getConexion();
        const myQuery = `DELETE FROM PRODUCTOS WHERE ID = ${id}`

        const result = await conn.query(myQuery)

        if (result.affectedRows > 0) {
            return {
                sucess: true,
                message: "Producto eliminado"
            }
        } else {
            return {
                sucess: false,
                message: "Este producto no existe"
            }
        }
    } catch (error) {
        return {
            sucess: false,
            message: error
        }
    }
}

async function actualizarProducto(id, marca, descripcion, precio, stock) {
    try {
        const conn = await getConexion();
        const myQuery = `UPDATE PRODUCTOS SET PRODUCTOS.MARCA = '${marca}', PRODUCTOS.DESCRIPCION = '${descripcion}', PRODUCTOS.PRECIO = '${precio}', PRODUCTOS.STOCK = '${stock}' WHERE PRODUCTOS.ID = ${id}`

        const result = await conn.query(myQuery)

        if (result.length) {
            return {
                sucess: true,
                message: "Contato atualizado com sucesso!"
            }
        } else {
            return {
                sucess: false,
                message: "Contato nao existe no banco de dados!"
            }
        }
    } catch (error) {
        return {
            sucess: false,
            message: error
        }
    }
}

async function buscarProductos(id) {
    const query = `SELECT * FROM PRODUCTOS WHERE ID LIKE '%${id}%'`
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
    insertarProducto,
    getProductos,
    borrarProducto,
    actualizarProducto,
    buscarProductos
}