import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT, CHANGE_QUANTITY, CHANGE_STATE } from './actionTypes';
 

export const loadCart = produtos => ({
  type: LOAD_CART,
  payload: produtos
});

export const changeState = () =>({
  type: CHANGE_STATE  
});

export const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: product
});

export const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  payload: product
});

export const changeProductQuantity =  productQuantity => ({
    type: CHANGE_QUANTITY,
    payload: productQuantity
});
