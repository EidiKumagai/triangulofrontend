import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT, CHANGE_QUANTITY, CHANGE_STATE } from './actionTypes';

const initialState = {
  produtos: [],
  isadd: false,
  isrem:false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        produtos: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        isadd:true,
        productToAdd: Object.assign({}, action.payload),
      };
      case CHANGE_STATE:
      return {
        ...state,
        isadd:false
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        isadd:false,
        productToRemove: Object.assign({}, action.payload)
      };

      case CHANGE_QUANTITY:
      return {
        ...state,
        productQuantity: action.productQuantity 
      };
    default:
      return state;
  }
}
