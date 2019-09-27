import React, { Component } from 'react';
import './style.css'

import './instantSearch.css';

import PropTypes from 'prop-types';
import { changeState } from '../../../redux/cart/actions'
import { connect } from 'react-redux';
import ProductList from './ProductList';
import ecommerceAction from '../../../redux/ecommerce/actions';
import { notification } from '../../../components';
const { fetchProducts } = ecommerceAction;





class Shelf extends Component {

  state = {
    isLoading: false,
    isadd: false

  };

  setvar(estado) {
    estado = true
  }
  componentWillMount() {

  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {

    let aux = false;
    // aux = this.setvar(aux);
    const { products, cartTotal, isrem, isadd } = this.props;
    const { isLoading } = this.state;
    //const { isadd } = this.state;
    console.log(this.props)
    if (products === undefined) {
      return (
        <React.Fragment>

          {isLoading}
          <div className="shelf-container">
            {/* <ShelfHeader productsLength={products.length} /> */}
            {/* <ProductList products={products} />    */}
          </div>
        </React.Fragment>
      );
    } else {
      if (isadd == true) {
        aux = false
        notification("success", "Product added on the cart");
      }

      this.props.changeState();




      return (
        <React.Fragment>
          {isLoading}
          <div className="shelf-container">
            {/* <ShelfHeader productsLength={products.length} /> */}
            <ProductList products={products} />
          </div>
        </React.Fragment>
      );
    }


  }
}

const mapStateToProps = state => ({
  ...state.Cart,
  isadd: state.cart.isadd,
  isrem: state.cart.isrem,
  products: state.Ecommerce.products,
  cartTotal: state.Total.data,
});

export default connect(
  mapStateToProps,
  { fetchProducts, changeState }
)(Shelf);
