import React, { Component } from 'react';
import './style.css';
import TopbarCartWrapper from '../../../components/cart/singleCartModal.style';
import './instantSearch.css';
import Spinner from 'react-spinner-material';
import Button from '../../../components/uielements/button';
import axios from "axios";
import api from '../../../containers/Page/api';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
// import ProductList from './ProductList';
// import {useState} from 'react';
// import Modal from 'react-bootstrap/Modal';
import { OrderTable } from '../checkout/checkout.style';
import WithDirection from '../../../config/withDirection';
import ModalStyle, { ModalContent } from './modal.style';
import Modals from '../../../components/feedback/modal';
import IntlMessages from '../../../components/utility/intlMessages';
import ecommerceAction from '../../../redux/ecommerce/actions';

const { fetchorders } = ecommerceAction;
const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);





class ListOrders extends Component {
  
  state = {
    isLoading: false,
    show: false
  }; 
  
  success = (order)=> {
    const id = order.id;
    let list;
    api.get("https://apitriangulo.herokuapp.com/order/"+id).then(res =>{
     list = res.data;

     const produtos = list.products.map(product => {
      return (
        // <OrderTable className="isoOrderInfo" >
        //   <div className="isoOrderTable">
        //   <span className="tableHead">Products: </span>
        //   <br></br>
        //   <p>Name: {product.name}</p>
        //   <br></br>
        //   <p>Vendor: {product.vendor}</p>
        //   <br></br>
        //   <p>Product Quantity: {product.quantity}</p>
        //   <br></br>
        //   </div>
          
        // </OrderTable>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Vendor</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product.name}</td>
              <td>{product.vendor}</td>
              <td>${product.price}</td>
            </tr>
          </tbody>
          </table>
        
      )
    });
    Modals.success({
      title: list.title,
      content:produtos,
      okText: 'OK',
      cancelText: 'Cancel',
    });
    });
  }

  
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
 
  componentDidMount() {
    this.props.fetchorders();
  }


  
  
  render() {
    const marginStyle = { marginRight: '5px', marginBottom: '5px' };
    const { isLoading } = this.state;

    console.log(orders);
    const { orders } = this.props;
    if (orders === undefined) {
      return(
        
        <Spinner size={120} spinnerColor={"#606D42"} spinnerWidth={2} visible={true} />
        
      )
    }
      return orders.map(order => {

        
        return (
          
              <TopbarCartWrapper className="isoCartItems">
          <div className="isoItemImage pedidos">
          </div>
          <div className="isoCartDetails">
            <h3>
              <a href="#">
                {order.title}
              </a>
            </h3>
            <p className="isoItemPriceQuantity">
              <span>Preço Total $</span>
              <span>
                {order.price}
              </span>
            </p>

            <p className="isoItemPriceQuantity">
              <span>Criado em:  </span>
              <span>
                {order.created_at}
              </span>
            </p>
          </div>

          <Button onClick={() => this.success(order)} style={marginStyle}>
                  {<IntlMessages id="feedback.alert.successTitle" />}
          </Button>
          
   

          
        </TopbarCartWrapper>

          
        );
      });
    
    // return (
    //   <React.Fragment>
    //     {isLoading }
    //     <div className="shelf-container">
    //       {/* <ShelfHeader productsLength={products.length} /> */}
    //          {/* {orders} */}
    //     </div>

        
    //   </React.Fragment>
    // );  
  }
}


const mapStateToProps = state => ({
  orders: state.Ecommerce.orders
});

export default connect(
  mapStateToProps,
  { fetchorders }
)(ListOrders);
