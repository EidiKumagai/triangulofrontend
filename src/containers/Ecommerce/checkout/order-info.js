import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '../../../components/uielements/button';
import SingleOrderInfo from './single-order';
import { OrderTable } from './checkout.style';
import ecommerceAction from '../../../redux/ecommerce/actions';
import { error } from 'util';

const { createPost } = ecommerceAction;

let totalPrice;




class OrderInfo extends Component {

  constructor(props) {
    super(props);
    this.renderProducts = this.renderProducts.bind(this);
  }


  fazerpedido() {
    const { products, cartTotal } = this.props;
      var myJSON = {
        title: "Order",
        price: cartTotal.totalPrice,
        products: []
      }
      var myString = JSON.stringify(myJSON);
      let title = " order" 
    
      axios.post(`https://apitriangulo.herokuapp.com/order`,{ 
        title: title,
        price: cartTotal.totalPrice,
        products:products.map(product => {
          product.id
        }) 
      })
        .then(res => {
          if(res === error){
            alert("Something wrong, please try again");
          }else{
            alert("Order Successfully");
          }
          console.log(res);
          console.log(res.data);
        })
  }

  
  renderProducts() {
    const { productQuantity, products } = this.props;
    return products.map(product => {  
      return (
        <div className="isoSingleOrderInfo">
        <p>
          <span>{product.name}</span>
          <span>x</span>
          <span className="isoQuantity">{product.qtd}</span>
        </p>
        <span className="totalPrice">${product.price}</span>
      </div>
      );
    });
  }

  render() 
  {
    const {cartTotal} =  this.props;
    return (
      <OrderTable className="isoOrderInfo">
        <div className="isoOrderTable">
          <div className="isoOrderTableHead">
            <span className="tableHead">Produtos</span>
            <span className="tableHead">Total</span>
          </div>

          <div className="isoOrderTableBody">
            {this.renderProducts()}
          </div>
          <div className="isoOrderTableFooter">
            <span>Total</span>
            <span>
              ${cartTotal.totalPrice}
            </span>
          </div>
          {/* <input type="submit" onClick={ () =>this.fazerpedido()}></input> */}
          {/* <span onClick={() =>this.fazerpedido()}>Fazer pedido</span> */}
          <Button onClick={() => this.fazerpedido()} type="primary" className="isoOrderBtn">
            Comprar
          </Button>
        </div>
      </OrderTable>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.Ecommerce,
    products: state.cart.produtos,
    cartTotal: state.Total.data,
    orders: state.Ecommerce.orders
  };
}
export default connect(mapStateToProps, {createPost })(OrderInfo);
