import { UPDATE_CART, CHANGE_QUANTITY } from './actionTypes';

function util(prod){
  var aux1, aux2;
  aux1 = prod.toString().replace(",",".");
  aux2 = parseFloat(aux1);
  return aux2
}

export const changeProductQuantity = productQuantity => {
  return {
    type: CHANGE_QUANTITY,
    productQuantity
  };
}


export const updateCart = cartProducts => dispatch => {
  let productQuantity = cartProducts.reduce((sum, p) => {
    
    sum += p.price;
    return sum;
  }, 0);

  let totalPrice = cartProducts.reduce((sum, p) => {
    var conv;
    conv = util(p.price);
    conv.toFixed(2);
    sum += conv * p.qtd;
    return sum;
  }, 0);

  // let installments = cartProducts.reduce((greater, p) => {
  //   greater = p.installments > greater ? p.installments : greater;
  //   return greater;
  // }, 0);

  let cartTotal = {
    productQuantity,
    totalPrice,
    currencyId: 'USD',
    currencyFormat: '$'
  };

  dispatch({
    type: UPDATE_CART,
    payload: cartTotal
  });
};
