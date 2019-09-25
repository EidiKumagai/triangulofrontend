import React, { Component } from 'react';
import { notification } from '../index';
import TopbarCartWrapper from './singleCartModal.style';
import topbarAddtoCart from '../topbar/topbarAddtoCart';
import {connect} from 'react-redux';
import {loadCart, removeProduct} from '../../redux/cart/actions';
import ecommerceAction from '../../redux/ecommerce/actions';

const { changeProductQuantity } = ecommerceAction;

class Carrinho extends Component {
  // onChange = value => {
  //   if (!isNaN(value)) {
  //     if (value !== this.props.quantity) {
  //       this.props.changeQuantity(this.props.id, value);
  //     }
  //   } else {
  //     notification('error', 'Please give valid number');
  //   }
  // };

  cancelQuantity(id) {
    const { produtos } = this.props;
    const newProductQuantity = [];
    produtos.forEach(product => {
      if (product.id !== id) {
        newProductQuantity.push(product);
      }
    });
    this.props.changeProductQuantity(newProductQuantity);
  }

  removeProduct = product => {
    const { cartProducts, updateCart } = this.props;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  };
  
  toFloat(num){
    var pointNum = parseFloat(num);
    return pointNum
  }

  render() {
    let totalPrice;
    let aux;
    const { produtos,removeProduct } = this.props;
    return produtos.map(product => {
      aux = this.toFloat(product.price);
      totalPrice += product.qtd * product.price ;
      return (
        <TopbarCartWrapper className="isoCartItems">
        <div className="isoItemImage">
        </div>
        <div className="isoCartDetails">
          <h3>
            <a href="#">
              {product.name}
            </a>
          </h3>
          <p className="isoItemPriceQuantity">
            <span>$</span>
            <span>
              {product.price}
            </span>
            <span className="itemMultiplier">X</span>
            <span className="isoItemQuantity">
              {product.qtd}
            </span>
          </p>
        </div>
        {/* <a className="isoItemRemove" onClick={() => removeProduct(product)}>
          <i className="ion-android-close" />
        </a> */}
      </TopbarCartWrapper>
      );
    });
   
  }
}

function mapStateToProps(state) {
  return {
    ...state.Ecommerce,
    ...state.cart
  };
}
export default connect(mapStateToProps, {
  changeProductQuantity,
  loadCart
})(Carrinho);

