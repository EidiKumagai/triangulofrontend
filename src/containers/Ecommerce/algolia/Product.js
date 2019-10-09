import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputNumber from '../../../components/uielements/InputNumber';
import Thumb from './thumb';
//import { formatPrice } from '../../../../services/util';
//import { addProduct } from '../../../../services/cart/actions';
import ecommerceAction from '../../../redux/ecommerce/actions';
// import { SortBy } from 'react-instantsearch/dom';
import {addProduct, changeState} from '../../../redux/cart/actions'
// import { Button } from 'antd/lib/radio';
// import { notification } from '../../../components/index';
const { changeProductQuantity } = ecommerceAction;





const Product = ({ product, addProduct, changeState }) => {
  
  // let aux;
  // aux = 1;
  // var bool =  true;


  const ochange = numero =>{
    product.qtd = numero
  }

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
    <React.Fragment>
      <div>
      <div class="shelf-item">
        <Thumb class="shelf-item__thumb" alt={product.name} />
      <div className="shelf-item__price">
        <div className="val">
          <small>$</small> 
           <b>{product.price.substr(0, product.price.length - 3)}</b>
          <span>{product.price.substr(product.price.length - 3, 3)}</span>
        </div>
        </div>
        <div className="shelf-item__title">
          <p class="shelf-item__title__text">{product.name}</p>
        </div>
        <div className="shelf-item__title">
          <p class="shelf-item__title__text">Vendor: {product.vendor}</p>
        </div>
        <div className="shelf-item__title">
          <p class="shelf-item__title__text">Category: {product.category}</p>
        </div>

        
        <div className="shelf-item__title">
          <p class="shelf-item__title__text">Stock Quantity: {product.quantity}</p>
        </div>
        <div  onClick={() => addProduct(product)} class="shelf-item__buy-btn">Adicionar</div>

        <div>
        <p>Quantity: </p>
        <br></br>

        <td className="isoItemQuantity">
         
         <InputNumber
           min={1}
           max={1000}
           value={product.qtd}
           step={1}
           onChange={ochange}
         />
       </td>
        <br></br>
        <br></br>
        </div> 
        
      </div>
    </div>

    </React.Fragment>
    

  );
};

// Product.propTypes = {
//   product: PropTypes.object.isRequired,
//   addProduct: PropTypes.func.isRequired
// };

const mapStateToProps = state => ({
  ...state.Cart,
  ...state.Ecommerce,
  products: state.Ecommerce.products
});

export default connect(
  mapStateToProps,
  {addProduct,changeState,changeProductQuantity}
)(Product);
