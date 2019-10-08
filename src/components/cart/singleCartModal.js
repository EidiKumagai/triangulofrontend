import React, { Component } from 'react';
// import InputNumber from '../uielements/InputNumber'; 
import PropTypes from 'prop-types';
// import { notification } from '../index';
import TopbarCartWrapper from './singleCartModal.style';
// import topbarAddtoCart from '../topbar/topbarAddtoCart';
import {connect} from 'react-redux';
import { updateCart, changeProductQuantity } from '../../redux/total/actions' 
import {loadCart} from '../../redux/cart/actions';
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
 
     constructor(props){
       super(props);
       this.state={
        valor:1
      };
     
      this.handleChange =  this.handleChange.bind(this);

     }

    
     

    handleChange = (e) => {
      this.setState({valor: e.target.value});
    }
 
  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.changeQuantity(nextProps.newProduct.id,nextProps.newProduct.qtd);
    }
  }

  static propTypes = {
    product: PropTypes.object.isRequired,
    removeProduct: PropTypes.func.isRequired
  };
  
  changeQuantity(id, qtd) {
    const { produtos } = this.props;
    const newProductQuantity = [];
    produtos.forEach(product => {
      if (product.id !== id) {
        newProductQuantity.push(product);
      } else {
        newProductQuantity.push({
          id,
          qtd
        });
      }
    });
    this.props.changeProductQuantity(newProductQuantity);
  }

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



  // onChange = value => {
  //   this.sendProduct();
  //   let productAlreadyInCart = false;
  //     // const { produtos, updateCart } =  this.props;
  //     // if (!isNaN(value)) {
  //     //     if (value !== product.qtd) {
  //     //       produtos.forEach(cp => {
  //     //         if (cp.id === product.id) {
  //     //         cp.qtd = value;
  //     //         product.qtd = value;
  //     //         productAlreadyInCart = true;
  //     //         }
  //     //       });
  //     //       if (!productAlreadyInCart) {
  //     //         produtos.push(product);
  //     //         this.changeQuantity(product.id,product.qtd);
  //     //       }
  //     //       updateCart(produtos);
  //     //       } 
  //     // }
      
  //     // else
  //     // {
  //     //     notification('error', 'Please give valid number');
  //     // }
    
  // }
  
      
 

  toFloat(num){
    var pointNum = parseFloat(num);
    return pointNum
  }

  render() {
  let totalPrice;
  let aux;
   let quantity;
    const { produtos,removeProduct } = this.props;
    console.log(this.state);

    return produtos.map(product => {
      <div
          onClick={() => removeProduct(product)}
      />
     quantity = product.qtd;
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
                {/* <input type="number" onChange={this.handleChange } value={this.state.valor }   ></input> */}
              </td>
              <span className="isoItemQuantity">
              {quantity}
              </span>
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
    ...state.cart
  };
}
export default connect(mapStateToProps, {
  loadCart,
  changeProductQuantity,
  updateCart
})(Carrinho);

