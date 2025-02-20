import Services from "./service.manager.js";
import { CartControllers } from "../controllers/carts.controllers.js";

const cartDao = new CartControllers();

class CartServices extends Services {
    constructor() {
        super(cartDao);
    }

    createCart = async() => {
        try {
            return await this.dao.createCart();
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