import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Thumb from './thumb';
//import { formatPrice } from '../../../../services/util';
//import { addProduct } from '../../../../services/cart/actions';
import ecommerceAction from '../../../redux/ecommerce/actions';
import {addProduct} from '../../../redux/cart/actions'

const Product = ({ product, addProduct }) => {
  product.qtd = 1;
  var bool =  true;
  //let formattedPrice = formatPrice(product.price, 'USD');
  console.log(product);
  let productInstallment;

  if (!!product.installments) {
    const installmentPrice = product.price / product.qtd;

    productInstallment = (
      <div className="installment">
        <span>or {product.qtd} x</span>
        <b>
          {/* {product.currencyFormat} */}
          {installmentPrice}
        </b>
      </div>
    );
  }

  return (
    <div
      // className="shelf-item"
       onClick={() => addProduct(product)}
      // data-sku={product.sku}
    >
      {/* {bool && (
        <div className="shelf-stopper">Free shipping</div>
      )} */}
      <Thumb
        classes="shelf-item__thumb"
        alt={product.name}
      />
      <p className="shelf-item__title">{product.name}</p>
      <div className="shelf-item__price">
        <div className="val">
          <small>$</small> 
           <b>{product.price.substr(0, product.price.length - 3)}</b>
          <span>{product.price.substr(product.price.length - 3, 3)}</span>
        </div>
        {/* {productInstallment} */}
      </div>
      <div className="shelf-item__buy-btn">Adicionar</div>
    </div>
  );
};

// Product.propTypes = {
//   product: PropTypes.object.isRequired,
//   addProduct: PropTypes.func.isRequired
// };

export default connect(
  null,
  {addProduct}
)(Product);
