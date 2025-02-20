import Services from "./service.manager.js";
import cartModel from "../daos/models/cart.model.js";

const cartDao = cartModel;

class CartServices extends Services {
    constructor() {
        super(cartDao);
    }

    createCart = async() => {
        try {
            const newCart = await this.dao.create({products: []});
            return newCart;
        } catch(error) {
            throw error            
        }
    };

    addProdToCart = async(cartId, prodId) => {
        try {
            return await this.dao.addProdToCart(cartId, prodId);
        } catch(error) {
            throw error            
        }
    };

    removeProdToCart = async(cartId, prodId) => {
        try {
            return await this.dao.removeProdToCart(cartId, prodId);
        } catch(error) {
            throw error            
        }
    };

    upDateProdQuantityToCart = async(cartId, prodId, quantity) => {
        try {
            return await this.dao.upDateProdQuantityToCart(cartId, prodId, quantity);
        } catch(error) {
            throw error            
        }
    };

    clearCart = async(cartId) => {
        try {
            return await this.dao.clearCart(cartId);
        } catch(error) {
            throw error            
        }
    };
};

export const cartServices = new CartServices();