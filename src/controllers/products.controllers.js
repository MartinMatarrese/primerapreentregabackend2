import productModel from "../daos/models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const {limit, page, filter, metFilter, ord} = req.query
        const pag = page !== undefined ? page : 1
        const lim = limit !== undefined ? limit : 10
        const query = metFilter !== undefined ? {[metFilter] : filter} : {}
        const onQuery = ord !== undefined ? {price: ord} : {}
        const prods = await productModel.paginate(query, {limit: lim, page: pag, sort: onQuery})
        res.status(200).send(prods)
    }catch(e){
        res.status(500).json({ error: `Error al constultar los productos: ${e.message}` });
    }
}
export const getProduct = async (req, res) => {
    try {
        const idProd = req.params.pid
        const prod = await productModel.findById(idProd)
        if(prod) {
            res.status(200).send(prod)
        } else {
            res.status(404).send("Producto no existe")
        }
    }catch(e){
        res.status(500).json({error: `El producto no existe: ${e.message}`});
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = req.body
        const respuesta = await productModel.create(product)
        res.status(201).send("Producto creado correctamente")
    }catch(e){
        res.status(500).json({ error: `Error al crear producto: ${e.message}` });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const idProd = req.params.pid
        const updateProduct = req.body
        const respuesta = await productModel.findByIdAndUpdate(idProd, updateProduct)
        res.status(200).send("Producto actualizado correctamente")
    }catch(e){
        res.status(500).json({ error: `Error al actualizar producto: ${e.message}` });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const idProd = req.params.pid
        const respuesta = await productModel.findByIdAndDelete(idProd)
        res.status(200).send("Producto eliminado correctamente")
    }catch(e){
        res.status(500).json({ error: `Error al eliminar producto: ${e.message}` });
    }
}