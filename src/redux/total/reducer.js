import { UPDATE_CART, CHANGE_QUANTITY } from './actionTypes';

const initialState = {
  data: {
    productQuantity: 0,
    installments: 0,
    totalPrice: 0,
    currencyId: 'USD',
    currencyFormat: '$'
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      return {
        ...state,
        data: action.payload
      };
    case CHANGE_QUANTITY:
        return{
         ...state,
         productQuantity: action.productQuantity 
        };
    default:
      return state;
  }
}
