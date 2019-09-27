import React, { Component } from 'react';
import InputNumber from '../uielements/InputNumber';
import PropTypes from 'prop-types';
import { notification } from '../index';
import TopbarCartWrapper from './singleCartModal.style';
import topbarAddtoCart from '../topbar/topbarAddtoCart';
import {connect} from 'react-redux';
import {loadCart, removeProduct, changeProductQuantity} from '../../redux/cart/actions';
// import ecommerceAction from '../../redux/ecommerce/actions';

// const { changeProductQuantity } = ecommerceAction;

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

  static propTypes = {
    product: PropTypes.object.isRequired,
    removeProduct: PropTypes.func.isRequired
  };
  

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
  onChange = value => {
    const { produtos} =  this.props;
    produtos.map(p => {
      if (!isNaN(value)) {
        if (value !== p.qtd) {
          this.props.changeProductQuantity(p.id, value);
        }
      } else {
        notification('error', 'Please give valid number');
      }
    });
  };
  
  toFloat(num){
    var pointNum = parseFloat(num);
    return pointNum
  }

  render() {
    var quantity;
    let totalPrice;
    let aux;
    const { produtos,removeProduct } = this.props;
    return produtos.map(product => {
      <div
          onClick={() => removeProduct(product)}
      />
      quantity = 1;
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
              <td className="isoItemQuantity">
                <InputNumber
                  min={1}
                  max={1000}
                  value={quantity}
                  step={1}
                  onChange={this.onChange}
                />
              </td>
            {/* <span className="isoItemQuantity">
              {}
            </span> */}
          </p>
        </div>
        <a className="isoItemRemove" onClick={() => removeProduct(product)}>
          <i className="ion-android-close" />
        </a>
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
  loadCart,
  changeProductQuantity
})(Carrinho);

