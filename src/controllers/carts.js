import cartModel from "../models/cart.js";

export const getCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findOne({_id: cartId})
        res.status(200).send(cart)
    } catch(e) {
        res.status(500).send(e)
    }
}

export const createCart = async (req, res) => {
    try {
        const respuesta = await cartModel.create({products: []})
        res.status(201).send(respuesta)
    } catch(e) {
        res.status(500).send(e)
    }
}

export const insiderProductCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const {quantity} = req.body
        const cart = await cartModel.findById(cartId)
        const indice = cart.products.findIndex(prod => prod.id_prod._id == productId)
        if(cart) {
            if(indice != -1) {
                cart.products[indice].quantity = quantity
            } else {
                cart.products.push({id_prod: productId, quantity: quantity})
            }
            const mensaje = await cartModel.findByIdAndUpdate(cartId, cart)
            res.status(200).send(mensaje)
        } else {
            res.status(404).send("El carrito no existe")
        }
    } catch(e) {
        res.status(500).send(e)
    }
}

export const updateProductsCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const {newProducts} = req.body
        const cart = await cartModel.findOne({_id: cartId})
       cart.products = newProducts
       cart.save()
       res.status(200).send(cart)
    } catch(e) {
        res.status(500).send(e)
    }
}

export const updateQuantityProductCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const {quantity} = req.body
        const cart = await cartModel.findOne(cartId)
        const indice = cart.products.findIndex(prod => prod.id_prod._id == productId) 
        if(indice != -1) { 
            cart.products[indice].quantity = quantity
        } else {
            res.status(404).send("producto no existe")
        }
    }catch(e) {
        console.log(e);
        res.status(500).send(e)        
    }
}

export const deleteProductCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const cart = await cartModel.findOne({_id: cartId})
        const indice = cart.products.findIndex(prod => prod.id_prod._id == productId)
        if(indice != -1) {
            cart.products.splice(indice, 1)
            cart.save()
            res.status(200).send(cart)
        } else {
            res.status(404).send("Producto no existe")
        }
    } catch(e) {
        res.status(500).send(e)
    }
}

export const deleteCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findOne({_id: cartId})
        cart.products = []
        cart.save()
        res.status(200).send(cart)
    } catch(e) {
        res.status(500).send(e)
    }
}
