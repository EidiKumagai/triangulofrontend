import React, { Component } from 'react';
import CurrencyFormat  from 'react-currency-format';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import IntlMessages from '../utility/intlMessages';
import Popover from '../uielements/popover';
import SingleCart from '../cart/singleCartModal';
import ecommerceAction from '../../redux/ecommerce/actions';
import {loadCart, removeProduct} from '../../redux/cart/actions'
import { updateCart, changeProductQuantity } from '../../redux/total/actions' 
import TopbarDropdownWrapper from './topbarDropdown.style';
// import CartProduct from '../cart/singleCartModal'
// import { notification } from '..';
 

const { changeViewTopbarCart } = ecommerceAction;


 let totalPrice;
class TopbarAddtoCart extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.cancelQuantity = this.cancelQuantity.bind(this);
  }

  
  hide() {
    this.props.changeViewTopbarCart(false);
  }
  handleVisibleChange() {
    this.props.changeViewTopbarCart(!this.props.viewTopbarCart);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }
  }
  

   addProduct = product => {
    const { cartProducts, updateCart } = this.props;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.qtd += product.qtd;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCart(cartProducts);
  };

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
  renderProducts() {
    
    // let aux;
    const { cartProducts, removeProduct } = this.props;
    console.log(cartProducts)

    totalPrice = 0;

    
    if (!cartProducts || cartProducts.length === 0) {
      return (
        <div className="isoNoItemMsg">
          <span>No item found</span>
        </div>
      );
    }

    return(
      <SingleCart removeProduct={removeProduct}/>
    )
    // return produtos.map(product => {
    //   return (
    //     <SingleCart removeProduct={removeProduct}
    //     changeQuantity={product.id,product.qtd}/>
    //   );
    // });
    
    
    
  }
  changeQuantity(id, qtd) {
    const { cartTotal } = this.props;
    const newProductQuantity = [];
    cartTotal.forEach(product => {
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
    const { cartProducts } = this.props;
    const newProductQuantity = [];
    cartProducts.forEach(product => {
      if (product.id !== id) {
        newProductQuantity.push(product);
      }
    });
    this.props.changeProductQuantity(newProductQuantity);
  }

  render() {
    const {
      url,
      viewTopbarCart,
      customizedTheme,
      cartProducts,
      cartTotal
    } = this.props;

    const content = (
      <TopbarDropdownWrapper className="topbarAddtoCart">
        <div className="isoDropdownHeader">
          <h3>
            <IntlMessages id="sidebar.cart" />
          </h3>
        </div>
        <div className="isoDropdownBody isoCartItemsWrapper">
          {this.renderProducts()}
          {this.changeQuantity}
        </div>

        {/* <div className="float-cart__shelf-container">
             {products} 
            {!products.length && (
              <div className="isoNoItemMsg">
                <br></br>
              <center><font color="gray" size="3">No item found</font></center>
              <br></br>
              </div>
            )}
          </div> */}
        <div className="isoDropdownFooterLinks">
          <Link to={`${url}/checkout`} onClick={this.hide}>
            <IntlMessages id="topbar.viewCart" />
          </Link>

          <h3>
            <IntlMessages id="topbar.totalPrice" />:

            
            <span><CurrencyFormat value={cartTotal.totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></span>
          </h3>
        </div>
      </TopbarDropdownWrapper>
    );
      return (
        <Popover
          content={content}
          trigger="click"
          visible={viewTopbarCart}
          onVisibleChange={this.handleVisibleChange}
          placement="bottomLeft"
        >
          <div className="isoIconWrapper">
            <i
              className="ion-android-cart"
              style={{ color: customizedTheme.textColor }}
            />
            
            {cartProducts.length === 0 ? (
              ''
            ) : (
              <span>{cartProducts.length}</span>

            )}
          </div>
        </Popover>
      );
    
  }
}
function mapStateToProps(state) {
  return {
    ...state.Ecommerce,
    ...state.cart,
    customizedTheme: state.ThemeSwitcher.toJS().topbarTheme,
    cartProducts: state.cart.produtos,
    newProduct: state.cart.productToAdd,
    cartTotal: state.Total.data
  };
}
export default connect(mapStateToProps, {
  changeViewTopbarCart,
  changeProductQuantity,
  loadCart,
  removeProduct,
  updateCart

})(TopbarAddtoCart);
