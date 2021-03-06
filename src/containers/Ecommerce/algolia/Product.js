  import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputNumber from '../../../components/uielements/InputNumber';
import Thumb from './thumb';
//import { formatPrice } from '../../../../services/util';
//import { addProduct } from '../../../../services/cart/actions';
import ecommerceAction from '../../../redux/ecommerce/actions';
// import { SortBy } from 'react-instantsearch/dom';
import {addProduct, changeState} from '../../../redux/cart/actions'
import { font } from 'styled-theme/dist';
// import { Button } from 'antd/lib/radio';
// import { notification } from '../../../components/index';
const { changeProductQuantity } = ecommerceAction;

// class Product extends Component{

  
//   render(){


    
//     return(
//       <React.Fragment>
//       <div>
//       <div class="shelf-item">
//         <Thumb class="shelf-item__thumb" alt={product.name} />
//       <div className="shelf-item__price">
//         <div className="val">
//           <small>$</small> 
//            <b>{product.price.substr(0, product.price.length - 3)}</b>
//           <span>{product.price.substr(product.price.length - 3, 3)}</span>
//         </div>
//         </div>
//         <div className="shelf-item__title">       
//         <b><p class="shelf-item__title__text"> {product.listid}</p></b>
//         </div>

//         {/* <div className="shelf-item__title">
//           <b><font color='#606D42'><p class="shelf-item__title__text" > {product.name}</p></font></b>
//         </div> */}
        
//         <div className="shelf-item__title">
//           <p class="shelf-item__title__text">{product.description}</p>
//         </div>
//         <div className="shelf-item__title">
//           <p class="shelf-item__title__text">Unit of Measure: {product.unitofmeasure}</p>
//         </div>

        
//         <div className="shelf-item__title">
//           <p class="shelf-item__title__text">Stock Quantity: {product.quantity}</p>
//         </div>
//         <div  onClick={() => addProduct(product)} class="shelf-item__buy-btn">Adicionar</div>

//         <div >
//         <p>Quantity: </p>
//         <br></br>

//         <td className="isoItemQuantity">
         
//          <InputNumber
//            min={1}
//            max={1000}
//            value={product.qtd}
//            step={1}
//            onChange={ochange}
//          />
//        </td>
//         <br></br>
//         <br></br>
//         </div>

//         <div>
//         <p>Square Feet: </p>
//         <br></br>

//         <td className="isoItemQuantity">
         
//          <InputNumber
//            min={1}
//            max={1000}
//            value={result1}
//            step={1}
//          />
//        </td>
//         <br></br>
//         <br></br>
//         </div>  
//       </div>
//     </div>

//     </React.Fragment>

//     )
//   }
// }
 


const Product = ({ product, addProduct, changeState }) => {
  
  var ProdQUantity; 
  var Unit;
  var result1;
    
  // let aux;
  // aux = 1;
  // var bool =  true;
  const funcProdQuantity = qtdProd => {
    ProdQUantity = qtdProd;
  }
  const funcUnit = qtdUnit => {
    Unit = qtdUnit;
  }

  const formula = () => {
    result1 = ProdQUantity * product.unitofmeasure; 
  }


  const ochange = numero =>{
    result1 = numero * product.unitofmeasure;
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
        <b><p class="shelf-item__title__text"> {product.listid}</p></b>
        </div>

        {/* <div className="shelf-item__title">
          <b><font color='#606D42'><p class="shelf-item__title__text" > {product.name}</p></font></b>
        </div> */}
        
        <div className="shelf-item__title">
          <p class="shelf-item__title__text">{product.description}</p>
        </div>
        <div className="shelf-item__title">
          <p class="shelf-item__title__text">Unit of Measure: {product.unitofmeasure}</p>
        </div>

        
        <div className="shelf-item__title">
          <p class="shelf-item__title__text">Stock Quantity: {product.quantity}</p>
        </div>
        <div  onClick={() => addProduct(product)} class="shelf-item__buy-btn">Adicionar</div>

        <div >
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

        <div>
        <p>Square Feet: </p>
        <br></br>

        <td className="isoItemQuantity">
         
         <InputNumber
           min={1}
           max={1000}
           value={result1}
           step={1}
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
