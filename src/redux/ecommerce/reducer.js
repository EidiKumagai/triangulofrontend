import { Map } from 'immutable';
import clone from 'clone';
import actions from './actions';
// import fake from './fake';
// import fakeinitdata from '../../containers/Ecommerce/cart/config';





// var fakeData = fakeinitdata;

//  if (fakeinitdata.productQuantity.length === 0) {
//    fakeData = fake;
//  }

const initState = new Map({
  view: 'gridView',
  viewTopbarCart: true,
  products: [],
  orders: [],
  adress:[],
  cat:[]
});


export default function ecommerceReducer(state = initState, action) {

  switch (action.type) {
      case actions.ADD_POST:
        return [...state, action.payload];
    case actions.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.rows
      };
      case actions.FETCH_CAT:
      return {
        ...state,
        cat: action.data
      };
      case actions.FETCH_ORDERS:
      return {
        ...state,
        orders: action.data
      };
      case actions.FETCH_ADRESS:
        return {
          ...state,
          adress: action.data
        };
      
      case actions.LOAD_CART:
        return {
          ...state,
          products: action.payload
        };
      case actions.ADD_PRODUCT:
        return {
          ...state,
          productToAdd: Object.assign({}, action.rows)
        };
      case actions.REMOVE_PRODUCT:
        return {
          ...state,
          productToRemove: Object.assign({}, action.rows)
        };
    case actions.CHANGE_VIEW:
      return state.set('view', action.view);
    case actions.VIEW_TOPBAR_CART:
      return {
        ...state,
        viewTopbarCart: action.payload
      };
    case actions.CHANGE_QUANTITY:
      return{
       ...state,
       productQuantity: action.productQuantity 
      };
      // localStorage.setItem(
      //   'cartProductQuantity',
      //   JSON.stringify(action.productQuantity)
      // );
      // return state.set('productQuantity', action.productQuantity);
    case actions.ADD_TO_CART:
      localStorage.setItem(
        'cartProductQuantity',
        JSON.stringify(action.productQuantity)
      );
      localStorage.setItem('cartProducts', JSON.stringify(action.products));
      return state
        .set('products', clone(action.products))
        .set('productQuantity', clone(action.productQuantity));
    default:
      return state;
  }
}
